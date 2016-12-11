import autobind from 'autobind-decorator';
import * as PIXI from 'pixi.js';

export default class Engine {

    constructor(width, height) {
        this.renderer = this.initRenderer(width, height);
        this.canvas = this.initCanvas();
        this.stage;
    }

    async test() {

        let texture = await this.loadTexture('ninja', 'res/test_sprite.png');

        let ninja = new PIXI.Sprite(texture);

        this.stage = new PIXI.Container();

        ninja.position.x = 100;
        ninja.position.y = 100;

        this.stage.addChild(ninja);

        this.loop();

    }

    initCanvas() {
        return this.renderer.view;
    }

    initRenderer(width, height) {
        return new PIXI.WebGLRenderer(width, height);
    }


    async loadTexture(name, file) {
        return await this._loadTexture(name, file).catch(this.loadBackupTexture);
    }

    @autobind
    async loadBackupTexture() {
        return await this._loadTexture('backupTexture', 'res/backup.png');
    }

    _loadTexture(name, file) {
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

    @autobind
    loop() {
        window.requestAnimationFrame(this.loop);

        if (typeof this.stage !== 'undefined') {
            this.renderer.render(this.stage);
        } else {
            console.err('Stage is not defined in Engine:main.js');
        }
    }

}