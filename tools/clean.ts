import { rm } from 'fs/promises';

const directories = ['.angular/', '.nx/', '.vite/', 'dist/', 'node_modules/', 'reports/'];

async function clean() {
    await Promise.all(directories.map((directoryName) => rm(directoryName, { force: true, recursive: true })));
}

clean();
