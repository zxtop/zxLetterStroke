import {Sprite,Container,Texture} from 'pixi.js';
export default class emitter{
    constructor(imgUrl,data){
        this.image = new Texture.fromImage(imgUrl);
        this.data = data;
        let containers  = new Container();
        containers.name = 'emitterContainer';
        let emitter = new PIXI.particles.Emitter(
            containers,
            [this.image],
            this.data
        );
        let elapsed = Date.now();
        let update = function(){
            requestAnimationFrame(update);

            let now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;
        };
        emitter.emit = true;
        update();
        return containers
    }
}