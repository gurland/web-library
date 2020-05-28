import * as fs from "fs";
import path from "path";

import Books, { Book } from "./book.model";
import { config } from "./config";
import { FB2Parser } from "./parser";
import { logger } from "./logger";
import { BookReader } from "./bookReader";

import mongoose from 'mongoose';
import AdmZip from "adm-zip";

export class Observer {
    public static timeout = Number(config.observerOptions.timeout);
    public static chunk_size = Number(config.observerOptions.chunk_size);

    constructor() {
        mongoose.connect(config.mongoCredentials.uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 1000,
            autoIndex: false
        });
    }

    private getFileSize(path: string) {
        try {
            return fs.statSync(path).size
        } catch (e) {
            return 0
        }
    }

    private isSupportedFileExtension(fileName: string) {
        return !fileName.includes(".git") && fileName.endsWith('.fb2') || fileName.endsWith('.zip')
    }

    private hasSupportedFilelSize(filePath: string) {
        return Boolean(this.getFileSize(path.resolve(filePath)) / 1000000.0 <= 12.0)
    }

    private getBookFileNames(dirName: string) {
        try {
            const files = fs.readdirSync(path.resolve(dirName));
            const filtered = files.filter((path: string) => this.isSupportedFileExtension(path) && this.hasSupportedFilelSize(`${dirName}/${path}`));
            return filtered;
        } catch (e) {
            return [];
        }
    }

    private async insertBooks(books: Book[]) {
        try {
            await Books.collection.insertMany(books);
            logger.info(`Insertion complete! ${books.length} books`);
        } catch (e) {
            logger.info(`Insertion failed!`);
        }
    }

    public async Observe(dirName: string): Promise<any> {
        try {
            const fbooks: string[] = this.getBookFileNames(dirName);

            let books: Book[] = [];
            let counter = 0;

            if (fbooks.length > 0)
                logger.info(`Found ${fbooks.length} new books.`)

            for await (const fileName of fbooks) {
                counter++;

                let bookReader = new BookReader(dirName, fileName, 'UTF-8');
                bookReader.read();
                logger.debug(`Loaded ${fileName}`)

                if (!bookReader.content) {
                    continue;
                }

                let parser = new FB2Parser(bookReader.content);
                const book = await parser.parse();
                logger.debug(`Parsed ${fileName}`)

                if (!book) {
                    continue;
                }
                books.push(book)

                const zip = new AdmZip();
                zip.addFile(`${fileName.slice(0, -4)}.fb2`, Buffer.from(bookReader.content));
                zip.writeZip(path.resolve(`${config.observerOptions.output_dir}/${book._id}.zip`));
                fs.unlinkSync(path.resolve(`${config.observerOptions.upload_dir}/${fileName}`));

                logger.debug(`Saved ${fileName} to ${book._id}.zip`)

                if (counter % Observer.chunk_size === 0 || fbooks.length === counter) {
                    await this.insertBooks(books)
                    books = [];
                }
            }

            if (books.length == 0)
                logger.info("No new books.");

        } catch (err) {
            logger.error(err);
        }
    }
}