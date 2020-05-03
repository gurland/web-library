import { promises as fse } from "fs-extra";
import { Saxophone } from "saxophone-ts";
import { Book } from "./book.model";
import { logger } from "./logger";

const detectCharEncoding = require('detect-character-encoding');
const AdmZip = require('adm-zip');
const Iconv  = require('iconv').Iconv;

export class FB2Parser {
    private filepath: string;

    constructor(path: string) {
        this.filepath = path;
    }

    public async parse(): Promise<Book | undefined> {
        try {
            let file = await this.readFile();

            const saxParser = new Saxophone();
            let book: Book = {
                title: "",
                author: new Array<string>(),
                genres: new Array<string>(),
                src_lang: "",
                lang: "",
                isbn: "",
                cover: Buffer.from(""),
                avg_rating: 0,
                view_count: 0
            };

            let isTitleInfo: boolean       = false;
            let isBookTitle: boolean       = false;
            let isAuthor:boolean           = false;
            let isAuthorFirstName: boolean = false;
            let isAuthorLastName: boolean  = false;
            let isGenres: boolean          = false;
            let isSrcLang: boolean         = false;
            let isLang: boolean            = false;
            let isCoverpage: boolean       = false;
            let isBinary: boolean          = false;
            let isISBN: boolean            = false;

            let tempName: string;
            let coverpage_href: string;

            saxParser
                .on("tagOpen", (tag: any) => {
                    if (tag.name === "title-info") {
                        isTitleInfo = true;  
                    }
                    if (tag.name === "book-title") {
                        isBookTitle = true;  
                    }
                    if (tag.name === "author") {
                        isAuthor = true;  
                    }
                    if (tag.name === "first-name") {
                        isAuthorFirstName = true;  
                    }
                    if (tag.name === "last-name") {
                        isAuthorLastName = true;  
                    }
                    if (tag.name === "genre") {
                        isGenres = true;  
                    }
                    if (tag.name === "src-lang") {
                        isSrcLang = true;  
                    }
                    if (tag.name === "lang") {
                        isLang = true;  
                    }
                    if (tag.name === "coverpage") {
                        isCoverpage = true;  
                    }
                    if (tag.name === "image" && isCoverpage) { 
                        coverpage_href = tag.attrs.match(/"#([^"]*)"/)[1];
                    }
                    if (tag.name === "binary" && tag.attrs.match(coverpage_href)) { 
                        isBinary = true;  
                    }
                    if (tag.name === "isbn") { 
                        isISBN = true;  
                    }
                })
                .on("tagClose", (tag: any) => {
                    if (tag.name === "title-info") { 
                        isTitleInfo = false; 
                    }
                    if (tag.name === "book-title") { 
                        isBookTitle = false; 
                    }
                    if (tag.name === "author") { 
                        isAuthor = false; 
                    }
                    if (tag.name === "first-name") { 
                        isAuthorFirstName = false; 
                    }
                    if (tag.name === "last-name") { 
                        isAuthorLastName  = false; 
                    }
                    if (tag.name === "genre") { 
                        isGenres = false; 
                    }
                    if (tag.name === "src-lang") { 
                        isSrcLang = false; 
                    }
                    if (tag.name === "lang") { 
                        isLang = false; 
                    }
                    if (tag.name === "coverpage") { 
                        isCoverpage = false; 
                    }
                    if (tag.name === "binary") { 
                        isBinary = false; 
                    }
                    if (tag.name === "isbn") { 
                        isISBN = false; 
                    }
                })
                .on("text", (text: any) => {
                    if (isTitleInfo) {
                        if (isBookTitle) { 
                            book.title = text.contents;
                        }
                        if (isAuthorFirstName && isAuthor) {
                            tempName = text.contents;
                        }
                        if (isAuthorLastName && isAuthor) {
                            book.author.push(tempName + " " + text.contents);
                        }
                        if (isGenres) {
                            book.genres.push(text.contents);
                        }
                        if (isSrcLang) {
                            book.src_lang = text.contents;
                        }
                        if (isLang) {
                            book.lang = text.contents;
                        }
                    }
                    if (isBinary) {
                        let img = Buffer.from(String(text.contents), "base64");
                        if ((img.length / 1e+6) < 4) {
                            book.cover = Buffer.from(img);
                        }
                    }
                    if (isISBN) {
                        book.isbn = text.contents;
                    }
                });

                saxParser.parse(file);

                return new Promise<Book>((resolve, reject) => {
                    resolve(book);
                });
        } catch (err) {
            logger.log("error", `${err}`);
        }
    }

    private decode(content: Buffer, fromEncoding: string, toEncoding: string) {
        let iconv = new Iconv(fromEncoding, toEncoding);
        let buf = iconv.convert(content);
        return buf.toString("utf8");
    }

    private async readFile() {
        let path: string = this.filepath;
        let data: Buffer;

        if (path.endsWith(".zip")) {
            let zip = new AdmZip(path);
            let zipEntries = zip.getEntries();

            data = await zipEntries[0].getData(); 
        } else {
            data = await fse.readFile(this.filepath);
        }

        const charsetMatch = detectCharEncoding(data);
        return this.decode(data, charsetMatch.encoding, "utf8");
    }
}