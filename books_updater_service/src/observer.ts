import { FB2Parser } from "./parser";
import Books, { Book } from "./book.model";
import { config } from "./config";
import { logger } from "./logger";
import mongoose from 'mongoose';

import * as fs from "fs";
import JSZip   from "jszip";

export class Observer
{
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

    public async Observe(dirName: string): Promise<any>
    {
        try {
            let files = fs.readdirSync(dirName);
            
            let fbooks: string[] = [];
            files.forEach((f: string) => {
                // take every *.fb2 or *.zip, exclude .git*, everything else delete
                // file with size smaller than 4mb
                if ((f.indexOf(".fb2") >= 0 || f.indexOf(".zip") >=0) && 
                     !f.includes(".git")    && fs.statSync(`${dirName}/${f}`)["size"] / 1000000.0 <= 4.0) {
                        fbooks.push(f);
                        logger.debug(`Pushed ${f}`);
                    }
            });

            let books: Book[] = [];
            for (let i = 0, j = fbooks.length; i < j; i += Observer.chunk_size) {
                logger.debug("Started new chunk..");
                let chunk = fbooks.slice(i, i + Observer.chunk_size);

                chunk.forEach((f: string) => {
                    let parser = new FB2Parser(`${dirName}/${f}`);
                    
                    logger.debug(`Start parsing ${f}`);
                    let book = parser.parse();
                    logger.info(`Parsed ${book?.title}`);

                    if (book) {
                        books.push(book);
                        logger.info(`Added ${book.title}`);
                        logger.debug(`Pushed id: ${book._id}`);

                        let zip = new JSZip().file(`${f.slice(0, -4)}.fb2`, Buffer.from(parser.reencodeBook(`${dirName}/${f}`)));

                            zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
                            .pipe(fs.createWriteStream(`res/${book._id}.zip`))
                            .on('finish', () => {
                                logger.debug(`Archine written.`);
                            });

                            logger.info(`${book._id}.zip has been written`);
                    }

                    fs.unlinkSync(`${dirName}/${f}`);
                    logger.debug("Ended chunk");
                });

                logger.debug("Started inserting...");
                await Books.collection.insertMany(books)
                    .then(
                        b => {
                            logger.info("Insertion complete!");
                            // logger.debug(`Inserted id: ${b.insertedIds[0]}`);
                        }
                    );

                books = [];
            }

            if (books.length == 0)
                logger.info("No new books.");

        } catch (err) {
            logger.error(err);
        }
    }
}