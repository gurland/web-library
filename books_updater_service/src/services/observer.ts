const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fse = require('fs-extra');

import {
    Parser
} from "./parser";

export class Observer extends EventEmitter {
    constructor() {
        super();
    }

    watchFolder(folder: string | string[]) {
        try {
            console.log(
                `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`
            );

            var watcher = chokidar.watch(folder, {
                persistent: true
            });

            watcher.on('add', async (filePath: string) => {
                console.log(
                    `[${new Date().toLocaleString()}] ${filePath} has been added.`
                );

                let filename = filePath.split('\\').pop()?.split('/').pop();
                let root = "../../../";

                // TODO: add ability to work with archived books (*.zip | *.fb2.zip)
                // if (filePath.includes('.zip'))
                if (filePath.includes('.fb2')) {
                    let parser = new Parser(String(root + filePath))

                    console.log(
                        `[${new Date().toLocaleString()}] >Title: ${parser.getTitle()}.`,
                        `\n[${new Date().toLocaleString()}] >Author name: ${parser.getAuthor()}.`,
                        `\n[${new Date().toLocaleString()}] >Genres: ${parser.getGenres()}.`,
                    );

                    // test
                    parser.getCover();

                    await fse.copy(filePath, `./res/${filename}`, {
                        overwrite: true
                    });

                    console.log(
                        `[${new Date().toLocaleString()}] ${filePath} has been saved to ${filename}.`
                    );
                }

                await fse.unlink(filePath);
                console.log(
                    `[${new Date().toLocaleString()}] ${filePath} has been removed.`
                );
            });
        } catch (error) {
            console.log(error);
        }
    }
}