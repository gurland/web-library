import {
    callbackify
} from "util";

const fs = require('fs');
const path = require('path');
const DOMParser = require('xmldom').DOMParser
const Iconv = require('iconv').Iconv;

export class Parser {

    private filename: string;
    private file: string;
    private xmlDoc: Document;

    constructor(filename: string) {
        this.filename = String(filename.split('\\').pop()?.split('/').pop());
        this.file = this.loadFile(filename);
        let parser = new DOMParser({
            locator: {},
            errorHandler: {
                warning: function (w: any) {
                    //console.warn(w);      // 'best' wrong warinings suppressor
                },
                error: callbackify,         // ???
                fatalError: callbackify     // ???
            }
        });
        this.xmlDoc = parser.parseFromString(this.file, "text/xml");
    }

    public getTitle() {
        return this.xmlDoc.getElementsByTagName("book-title")[0].childNodes[0].nodeValue;
    }

    public getGenres() {
        let genres: string[] = [];

        Array.from(this.xmlDoc.getElementsByTagName("genre")).forEach(element => {
            genres.push(String(element.childNodes[0].nodeValue));
        });

        return genres;
    }

    public getAuthor() {
        return this.xmlDoc.getElementsByTagName("first-name")[0].childNodes[0].nodeValue +
            ' ' +
            this.xmlDoc.getElementsByTagName("last-name")[0].childNodes[0].nodeValue;
    }

    public getCover() {
        let coverpage = this.xmlDoc.getElementsByTagName("coverpage")[0];
        let img_href = coverpage.getElementsByTagName("image")[0].getAttribute("l:href")?.substr(1);

        if (img_href == "") {
            img_href = coverpage.getElementsByTagName("image")[0].getAttribute("xlink:href")?.substr(1);
        }
        let img = this.xmlDoc.getElementById(String(img_href))?.childNodes[0].nodeValue;

        if (img != undefined) {
            fs.writeFileSync(`res/img/${this.filename.split('.')[0]}.jpeg`, Buffer.from(String(img), "base64"));
        }
    }

    private decode(content: Buffer) {
        let iconv = new Iconv('windows-1251', 'utf8');
        var buf = iconv.convert(content);
        return buf.toString('utf8');
    }

    private loadFile(filename: string) {
        let file = path.join(__dirname, filename);
        return this.decode(fs.readFileSync(file));
    }
}