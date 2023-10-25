import { ConfigService } from '@nestjs/config';
import { networkInterfaces as getNetworkInterfaces, NetworkInterfaceInfo } from 'os';

export function buildServerUrl(configService: ConfigService): string {
    const { secured, address, host, port } = {
        secured: configService.get<boolean>('server.useSSL'),
        address: configService.get<string>('server.address'),
        host: configService.get<string>('server.host'),
        port: configService.get<number>('server.port'),
    };
    return `http${secured ? 's' : ''}://${address ? address : `${determinePrivateIpAddress(host)}:${port}`}/`;
}

function determinePrivateIpAddress(host: string): string {
    if (host !== '0.0.0.0') return host;

    const networkInterfaces: Record<string, NetworkInterfaceInfo[]> = getNetworkInterfaces();

    return (
        Object.entries(networkInterfaces)
            .filter(([key]) => !key.match(/Loopback|vEthernet/gi))
            .flat()
            .filter((entry) => Array.isArray(entry))
            .flat()
            .filter((nInterface: NetworkInterfaceInfo) => nInterface.family === 'IPv4' && !nInterface.internal)
            .at(0) as NetworkInterfaceInfo
    ).address;
}
