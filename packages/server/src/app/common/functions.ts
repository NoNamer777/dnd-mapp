import { ConfigService } from '@nestjs/config';
import { networkInterfaces } from 'os';

export function buildServerUrl(configService: ConfigService): string[] {
    const { secured, host, port } = {
        secured: !!configService.get('server.ssl'),
        host: configService.get<string>('server.host'),
        port: configService.get<number>('server.port'),
    };
    return determineIpAddress(host).map((host) => `http${secured ? 's' : ''}://${host}:${port}/`);
}

function determineIpAddress(host: string): string[] {
    if (host !== '0.0.0.0') return [host];

    const nets = networkInterfaces();
    const results: Record<string, string[]> = {};

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 addresses
            if (net.family !== 'IPv4') {
                continue;
            }
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
    return Object.values(results).flat();
}
