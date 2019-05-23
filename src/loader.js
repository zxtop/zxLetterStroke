import {Container,Sprite,Graphics} from 'pixi.js';
const PIXI_SPINE = require('pixi-spine');
let loader = PIXI.loader;
export function load() {
    if(!window.res){
        console.info(1);
        return new Promise((resolve, reject) => {
            loader.add('question','static/content.json');
            loader.add('resources','static/resource.json');
            loader.load(() => {
                let content = PIXI.loader.resources["resources"].data;
                content.forEach(value => {
                    loader.add(value.key, value.path);
                    if(value.key.indexOf('image')>-1){

                        var newImg = new Image();
                        newImg.src = value.path;
                        newImg.onerror = function(e){
                            console.log(e);
                            errorArr.unshift(dataAssembling({
                                msg:'Resource not loaded error',
                                url:e.target.src,
                                type:'resourceLoadERROR'
                            }));
                        }
                    }else if(value.key.indexOf('audio')>-1){
                        var newAudio = new Audio();
                        newAudio.src = value.path;
                        newAudio.onerror = function(e){
                            errorArr.unshift(dataAssembling({
                                msg:'Resource not loaded error',
                                url:value.path,
                                type:'resourceLoadERROR'
                            }));
                        }
                    }
                });
                loader.load((l,r) =>{
                    window.res = r;
                    resolve(r)
                });
                loader.onError.add((e) => {
                    console.log("loader加载错误");
                });
                loader.onProgress.add((e) => {
                    // console.log("loader加载进程中");
                    document.getElementsByClassName('runner')[0].style.width = e.progress*6.8/100+'rem'
                });
                loader.onComplete.add((e) => {
                    // console.log("loader加载完成");
                });
            });
        })
    }
    else{
        return new Promise((resolve, reject) => {
            console.info(2);
            resolve(window.res)
        })
    }
}
export function getAnimation(animationStr) {
  return new PIXI.spine.Spine(res[animationStr].spineData)
}

export function getSound(resourceStr) {
  return res[resourceStr].data;
}

export function createSprite(texture) {
  console.log(new Sprite(texture));
  return new Sprite(texture);
}

export function getOptionTexture(resourceJsonStr,texture) {
  return res[resourceJsonStr].textures[texture];
}
export function getTexture(resourceStr) {
  return res[resourceStr].texture;
}
