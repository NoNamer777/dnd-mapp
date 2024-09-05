import { networkInterfaces as getNetworkInterfaces, NetworkInterfaceInfo } from 'os';

const hiddenPorts = [80, 443];

export let backEndServerAddress: string;

export function buildServerUrl(host: string, port: number, useSsl: boolean, address?: string) {
    let backEndUrl = 'http';

    if (useSsl) {
        backEndUrl += 's';
    }
    backEndUrl += '://';

    if (address) {
        backEndUrl += address;
    } else {
        backEndUrl += determinePrivateIpAddress(host);
    }
    if (!hiddenPorts.includes(port)) {
        backEndUrl += `:${port}`;
    }
    backEndServerAddress = backEndUrl;
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
