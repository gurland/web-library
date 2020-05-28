import mongoose, { Schema, Document } from 'mongoose';
import * as uuid from 'uuid';

export interface IBook extends Document {
    _id: string;
    title: string;
    authors: Array<string>;
    genres: Array<string>;
    src_lang: string;
    lang: string;
    isbn: string;
    cover: Buffer;
    avg_rating: number;
    view_count: number;
}

export interface Book {
    _id: IBook["_id"];
    title: IBook["title"];
    authors: IBook["authors"];
    genres: IBook["genres"];
    src_lang: IBook["src_lang"];
    lang: IBook["lang"];
    isbn: IBook["isbn"];
    cover: IBook["cover"];
    avg_rating: IBook["avg_rating"];
    view_count: IBook["view_count"];
}

const BookSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    src_lang: {
        type: String
    },
    lang: {
        type: String,
        required: true
    },
    isbn: {
        type: String
    },
    cover: {
        type: Buffer
    },
    avg_rating: {
        type: Number
    },
    view_count: {
        type: Number
    }
}, { versionKey: false });

export default mongoose.model<IBook>("Books", BookSchema);