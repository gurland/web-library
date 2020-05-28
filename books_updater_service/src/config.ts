export const config = {
    mongoCredentials: {
        uri: process.env.MONGO_URI || "mongodb://root:test@localhost:27777/books?authSource=books"
    },
    observerOptions: {
        chunk_size: process.env.CHUNK_SIZE || 50,
        timeout: process.env.TIMEOUT || 2000,
        upload_dir: process.env.UPLOAD_DIR || `/srv/upload`,
        output_dir: process.env.OUTPUT_DIR || `/srv/books`,
    }
}