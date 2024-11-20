import fs from 'node:fs';

const __ROOT__ = process.platform === 'win32' ? process.cwd() : process.env.PWD;
export function existsIcon(filename: string): boolean {
    return fs.existsSync(`${__ROOT__}/public/assets/icon/${filename}.png`);
}

export function readDirectory(path: string): Array<fs.Dirent> {
    return fs.readdirSync(`${__ROOT__}${path}`, {
        withFileTypes: true,
        encoding: "utf-8"
    });
}

export function read(path: string): string {
    return fs.readFileSync(`${__ROOT__}${path}`, {
        encoding: 'utf-8'
    });
}

export function write(path: string, content: string) {
    fs.writeFileSync(`${__ROOT__}${path}`, content, {
        encoding: 'utf-8'
    });
}

export function remove(path: string) {
    fs.rmSync(`${__ROOT__}${path}`, {
        force: true
    });
}
