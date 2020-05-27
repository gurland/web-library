export const config = {
    mongoCredentials: {
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/books"
    },
    observerOptions: {
        chunk_size: process.env.CHUNK_SIZE || 10,
        timeout: process.env.TIMEOUT || 1000,
        upload_dir: process.env.UPLOAD_DIR || "/srv/upload",
        output_dir: process.env.OUTPUT_DIR || "/srv/books",
    }
}