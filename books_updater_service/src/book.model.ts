import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBook extends Document {
    title: string;
    author: Array<string>;
    genres: Array<string>;
    src_lang: string;
    lang: string;
    isbn: string;
    cover: Buffer;
    avg_rating: number;
    view_count: number;
}

export interface Book {
    title: IBook["title"];
    author: IBook["author"];
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
        default: uuidv4()
    },
    title: {
        type: String,
        unique: [ true, "Title must be unique"],
        required: true
    },
    author: {
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