import AdmZip from "adm-zip";
import path from "path";
const fs = require('fs');
const iconv = require('iconv-lite');

export class BookReader {
    private _path: string;
    private _fileName: string;
    private _toEncoding: string;
    private _content?: string;

    constructor(dirName: string, fileName: string, toEncoding: string = 'UTF-8') {
        this._path = `${dirName}/${fileName}`;
        this._fileName = fileName;
        this._toEncoding = toEncoding
    }

    public read() {
        const content = this.readFile();
        if (content) {
            this._content = this.decode(content);
        }
    }

    public get content() {
        return this._content
    }

    public get fileName() {
        return this._fileName
    }

    private decode(content: Buffer) {
        try {
            const fromEncoding = this.getContentEncoding(content);
            const decoded = iconv.decode(content, fromEncoding)
            const str = iconv.encode(decoded, this._toEncoding).toString();
            return str.replace(fromEncoding, this._toEncoding);
        } catch (e) {
            return undefined;
        }
    }

    private readFile(): Buffer | undefined {
        try {
            if (this._path.endsWith(".zip")) {
                const zip = new AdmZip(path.resolve(this._path));
                const zipEntries = zip.getEntries();
                const firstEntry = zipEntries[0];
                this._fileName = firstEntry.name;
                return firstEntry.getData();
            } else {
                return fs.readFileSync(path.resolve(this._path));
            }
        } catch (e) {
            return undefined;
        }
    }

    private getContentEncoding(content: Buffer) {
        const temp = content.toString();
        const encoding: string = temp.slice(0,
            temp.indexOf("\n")
        ).match(/encoding=[\"\']([^\"]*)[\"\']/)![1];
        return encoding;
    }
}