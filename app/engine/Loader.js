import * as PIXI from 'pixi.js';

export default class Loader{

    static async loadTexture(name, file) {
        return await Loader.loadTextureWithoutBackup(name, file).catch(Loader.loadBackupTexture);
    }

    static async loadBackupTexture() {
        return await Loader.loadTextureWithoutBackup('backupTexture', 'res/backup.png');
    }

    static loadTextureWithoutBackup(name, file) {
        return new Promise((resolve, reject) => {
            PIXI.loader.add(name, file).load((loader) => {
                let loaded = loader.resources[name].data.complete;
                if (loaded) {
                    resolve(loader.resources[name].texture);
                } else {
                    reject(new Error(`File not found "${file}"`));
                }
            });
        });
    }

};