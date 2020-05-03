import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import Books, { Book } from './book.model';
import { logger } from './logger';

export class DbManager {
    constructor(uri: string) {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        mongoose.connection
            .on("connection", () => {
                logger.log("info", "DB connection established!");
            })
            .on("error", (err) => {
                logger.log("error", err)
            });
    }

    public async add(book: Book) {
        try {
            return await Books.create({
                _id: uuidv4(),
                title: book.title,
                author: book.author,
                genres: book.genres,
                src_lang: book.src_lang,
                lang: book.lang,
                cover: book.cover,
                isbn: book.isbn,
                avg_rating: book.avg_rating,
                view_count: book.view_count
            });
        } catch (err) {
            if (err && err.message.includes("E11000")) {
                logger.log("warn", `Book with title "${book.title}" already exists in db.`);
            } else if (err) {
                logger.log("error", err.message);
            }
        }
    }
}