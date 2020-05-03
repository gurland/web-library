export const config = {
    mongoCredentials: {
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/books"
    }
}