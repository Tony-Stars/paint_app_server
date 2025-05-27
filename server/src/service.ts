import fs from 'fs';
import path from 'path';

const _dir = path.win32.parse('C:\\institut\\penzgtu\\paint-online\\server\\');
const _dirname = path.resolve(_dir.dir, _dir.name);

export class Service {
    saveImage(sequence: string, version: string, data: string): void {
        const image = data.replace(`data:image/png;base64,`, '');
        fs.writeFileSync(path.resolve(_dirname, 'files', sequence, `${version}.jpg`), image, 'base64')
    }

    readImage(sequence: string, version: string): string | null {
        const filePath = path.resolve(_dirname, 'files', sequence, `${version}.jpg`);
        const exists = fs.existsSync(filePath);
        if (exists) {
            const file = fs.readFileSync(filePath)
            const data = `data:image/png;base64,` + file.toString('base64')
            return data;
        }

        return null;
    }

    getSequence(id: string): { id: string; versions: any[] } {
        const dirPath = path.resolve(_dirname, 'files', id);
        const exists = fs.existsSync(dirPath);
        if (exists) {
            const files = fs.readdirSync(dirPath);
            const versions = files.map((f) => f.substring(0, f.indexOf('.')));
            return { id, versions }
        }

        return { id, versions: [] }
    }

    addSequence(id: string): { id: string } {
        const dirPath = path.resolve(_dirname, 'files', id);
        const exists = fs.existsSync(dirPath);
        if (!exists) {
            fs.mkdirSync(dirPath)
            return { id: id };
        }

        return { id: id };

    }

    putSequence(sequence: string, version: string, data: string): void {
        const image = data.replace(`data:image/png;base64,`, '');
        const filepath = path.resolve(_dirname, 'files', sequence, `${version}.jpg`);
        fs.writeFileSync(filepath, image, 'base64')
    }
}
