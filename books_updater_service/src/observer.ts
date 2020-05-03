const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fse = require('fs-extra');
const AdmZip = require('adm-zip');

import { logger } from "./logger";
import { config } from "./config";
import { DbManager } from "./db.manager";
import { FB2Parser } from "./parser";

export class Observer extends EventEmitter {
    
    private static db: DbManager;

    constructor() {
        super();
        Observer.db = new DbManager(config.mongoCredentials.uri);
    }

    watchDir(folder: string | string[]) {
        try {
            logger.log("info", `Watching for folder changes on: ${folder}`);

            var watcher = chokidar.watch(folder, {
                persistent: true
            });

            watcher.on('add', async (filePath: string) => {
                if (!filePath.includes(".gitignore")) {
                    logger.log("info", `${filePath} has been added.`);

                    if (filePath.endsWith('.fb2') || filePath.endsWith('.zip')) {
                        let parser = new FB2Parser("./" + filePath);
                        let book = await parser.parse();

                        if (book) {
                            let book_new = await Observer.db.add(book);

                            if (book_new) {
                                if (filePath.endsWith(".fb2")) {
                                    let zip = new AdmZip();
                                    zip.addLocalFile("./" + filePath);
                                    zip.writeZip(`./res/${book_new._id}.zip`);
                                }
                            
                                if (filePath.endsWith(".zip")) {
                                    await fse.copy(filePath, `./res/${book_new._id}.zip`, {
                                        overwrite: true
                                    });
                                }
                                logger.log("info", `${filePath} has been saved to ${book_new._id}.zip`);
                            }
                        }
                    }

                    await fse.unlink(filePath);
                    logger.log("info", `${filePath} has been removed.`);
                }
            });
        } catch (error) {
            logger.error(error);
        }
    }
}