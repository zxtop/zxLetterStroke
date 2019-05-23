<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo"/>
    </div>
</template>
<script>
    import {Application, Container, Graphics,Sprite,ParticleContainer} from 'pixi.js';
    import {getAnimation, load, reateSprite} from '../loader';
    import $store from '../store/index.js';
    import START from "xes-start";
    import STEMTITLE from 'xes-subtitle';
    import GAME from "xes-game";
    import {AnswerInfo,Loading,Question} from 'xes-answer';

	import {LetterBoard} from './ui/LetterBoard.js';
	import Tool from './ui/Tool.js';
    const pixiSound = require('pixi-sound');
    export default {
        name: "start",
        data() {
            return {
                isShow: false,
                number:0
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: 1080,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            }
        },
        components: {
         
        },
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = '10.8rem';
            window.stage = app.stage;
            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                console.log(res);
                window.question = res.question.data;
                store.state.question = res.question.data
                store.state.testNum = question.sources.length;
                //干掉Loading
                let loading = document.getElementsByClassName('page-loading')[0];
                loading.style.display = 'none';
                //创建答题接口实例
                let answer = new AnswerInfo();
                //loading接口
                Loading();
                //初始化每题的答题数据
                answer.answerDefault({type:0,useranswer:''})
                //每小题的答题数据，该题加载完成前调用此方法
                Question({id:'0',currentTotalOption:'1'});

                //游戏页
                // let game = new GAME(question.sources[0].bgImage, question.sources[0].stemImg, res);
                // let stemTitle = new STEMTITLE(question.sources[0].subTitle, res);
                let start = new START(question.one.start, res);
                let self = this;

				let Letterboard = new LetterBoard();
				
				// game.addChild(stemTitle);
				

                // if(!window.question.one.start.show){
                //     stage.addChild(game);
				// 	Letterboard.exec();
    
                // }else{
                //     stage.addChild(start);
                //     start.button(()=>{
                //         stage.removeChild(start);
                //         stage.addChild(game);
				// 		Letterboard.exec();
                //     });
                // }

				if(!window.question.one.start.show){

                    let game = new GAME(question.sources[0].bgImage, question.sources[0].stemImg, res);
                    let stemTitle = new STEMTITLE(question.sources[0].subTitle, res);
					game.addChild(stemTitle);
					
                    stage.addChild(game);
					Letterboard.exec();

					let tool_r = new PIXI.Graphics();
					tool_r.drawRect(0,0,app.view.width,app.view.height);
					tool_r.alpha = 0.2;
					let tool_bg = new PIXI.Container();
					tool_bg.addChild(tool_r);
					let tool = new Tool(tool_bg);
					tool.draw();
					tool.bindEvents();
					// stage.addChild(tool_bg);

					
                }else{
                    stage.addChild(start);
                    start.button(()=>{
                        stage.removeChild(start);
                        let game = new GAME(question.sources[0].bgImage, question.sources[0].stemImg, res);
                        let stemTitle = new STEMTITLE(question.sources[0].subTitle, res);
                        game.addChild(stemTitle);
                        stage.addChild(game);
                        stage.setChildIndex(game,0);
						Letterboard.exec();
						
						
						let tool_r = new PIXI.Graphics();
						tool_r.drawRect(0,0,app.view.width,app.view.height);
						tool_r.alpha = 0.2;
						let tool_bg = new PIXI.Container();
						tool_bg.addChild(tool_r);
						let tool = new Tool(tool_bg);
						tool.draw();
						tool.bindEvents();
						// stage.addChild(tool_bg);

                    });
                }





                //如何渲染精灵序列图
                // let sheetName = start.startBg.sprite.name;//配置文件sprit.name
                // let frame = res[sheetName].spritesheet;
                // let frameArray = [];
                // for (let i in frame.textures) {
                //     frameArray.push(frame.textures[i]);
                // }
                // console.log(frameArray);
                // this.movieClip = new PIXI.extras.AnimatedSprite(frameArray);
                // this.movieClip.x = start.startBg.sprite.x;
                // this.movieClip.y = start.startBg.sprite.y;
                // this.movieClip.loop = start.startBg.sprite.loop;
                // this.movieClip.scale.set(start.startBg.sprite.scale);
                // this.movieClip.animationSpeed = 1;//播放速度，默认是1
                // this.movieClip.play();
                // this.startCon.addChild(this.movieClip);
                //example code
                //  answer = new AnswerInfo();
                //  answer.init({type: 0, useranswer:"A", answer:"B", id:0, rightnum: 0, wrongnum: 1});
                //  store.dispatch('pushToPostArr', answer);
                //  store.dispatch('postAnswer');
            })
        }
    }
</script>
<style>

    .canvas {
        width: 19.2rem;
        height: 10.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -9.6rem;
        margin-top: -5.4rem;
    }
    .logo {
        position: absolute;
        z-index: 999;
        left: .5rem;
        bottom: .3rem;
        width: 1.9rem;
    }
    .option-list{
        display: none;
        position: absolute;
        left: 0rem;
        /* top: 7.1rem; */
        width: 17.2rem;
		padding-left: 1rem;
		padding-right: 1rem;
        padding-top: 0px;
		padding-bottom:0px;
        margin: 0px;
        list-style: none;
        text-align: center;
    }
  
    .sen-list{
        display: block;
        padding: 0px;
		padding-left: .25rem;
		padding-right: .25rem;
        margin: 0px;
        /* border: 1px solid red; */
        position: absolute;
        left: 0rem;
        top: 0rem;
        list-style:none;
        text-align: center;
    }
    

.item-word{display:inline-block;
padding:0 .1rem;

transform:scale3d(0,0,0);
letter-spacing:.01rem
}
.ok{transform:scaleX(1)}
.oked{transform: scale3d(0,0,0)!important}
.item-word{cursor:pointer;transition:transform .2s ease-in-out,background-color .2s ease-in-out}




.shake{animation:shakeUp .3s both ease-in}
@keyframes shakeUp{0%{transform:translateX(10px)}
10%{transform:translateX(0)}
20%{transform:translateX(-10px)}
40%{transform:translateX(10px)}
60%{transform:translateX(-10px)}
80%{transform:translateX(10px)}
to{transform:translateX(0)}}

.down{animation:downUp .3s both ease-in}
@keyframes downUp{0%{transform:translateY(10px)}
10%{transform:translateY(0)}
20%{transform:translateY(-10px)}
40%{transform:translateY(10px)}
60%{transform:translateY(-10px)}
80%{transform:translateY(10px)}
to{transform:translateY(0)}}

/*从下向上动画*/
	.answerShowDown{
		animation: bounceInDown 1s both ease-in;
		-webkit-animation: bounceInDown 1s both ease-in;
		-moz-animation: bounceInDown 1s both ease-in;
	}
	/*从小变大动画*/
	.answerShowZoom{
		-webkit-animation: zoomIn .7s both ease-in;
		animation: zoomIn .7s both  ease-in;
		-moz--animation:zoomIn .7s both  ease-in;
	}
	/*从上向下动画*/
	.answerShowUp{
		animation: bounceInUp 1.2s both ease-in;
		-webkit-animation: bounceInUp 1.2s both ease-in;
		-moz-animation: bounceInUp 1.2s both ease-in;
	}
	/*渐隐渐现*/
	.answerShowhide{
		animation: fadeIn .5s both ease-in;
		-webkit-animation: fadeIn .5s both ease-in;
		-moz-animation:fadeIn .5s both ease-in;
		-o-animation:fadeIn .5s both ease-in;
	}
  @keyframes bounceInDown {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0,500px,0);
			transform: translate3d(0,500px,0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0,-25px,0);
			transform: translate3d(0,-25px,0)
		}

		75% {
			opacity: 1;
			-webkit-transform: translate3d(0,10px,0);
			transform: translate3d(0,10px,0)
		}

		90% {
			opacity: 1;
			-webkit-transform: translate3d(0,-5px,0);
			transform: translate3d(0,-5px,0)
		}

		100% {
			opacity: 1;
			-webkit-transform: none;
			transform: none
		}
	}
	@-webkit-keyframes bounceInDown {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0,500px,0);
			transform: translate3d(0,500px,0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0,-25px,0);
			transform: translate3d(0,-25px,0)
		}

		75% {
			opacity: 1;
			-webkit-transform: translate3d(0,10px,0);
			transform: translate3d(0,10px,0)
		}

		90% {
			opacity: 1;
			-webkit-transform: translate3d(0,-5px,0);
			transform: translate3d(0,-5px,0)
		}

		100% {
			opacity: 1;
			-webkit-transform: none;
			transform: none
		}
	}
	@-webkit-keyframes bounceInUp {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}
		0% {
			opacity: 0;
			transform: translate3d(0,-500px,0);
			-webkit-transform: translate3d(0,-500px,0);
			-moz-transform: translate3d(0,-500px,0);
		}
		60% {
			opacity: 0.5;
			transform: translate3d(0,10px,0);
			-webkit-transform: translate3d(0,10px,0);
			-moz-transform: translate3d(0,10px,0);
		}
		75% {
			opacity: 1;
			transform: translate3d(0,-5px,0);
			-webkit-transform: translate3d(0,-5px,0);
			-moz-transform: translate3d(0,-5px,0);
		}
		90% {
			opacity: 1;
			transform: translate3d(0,5px,0);
			-webkit-transform: translate3d(0,5px,0);
			-moz-transform: translate3d(0,5px,0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0,0px,0);
			-webkit-transform: translate3d(0,0px,0);
			-moz-transform: translate3d(0,0px,0);
		}
	}
	@keyframes bounceInUp {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}
		0% {
			opacity: 0;
			transform: translate3d(0,-500px,0);
			-webkit-transform: translate3d(0,-500px,0);
			-moz-transform: translate3d(0,-500px,0);
		}
		60% {
			opacity: 0.5;
			transform: translate3d(0,10px,0);
			-webkit-transform: translate3d(0,10px,0);
			-moz-transform: translate3d(0,10px,0);
		}
		75% {
			opacity: 1;
			transform: translate3d(0,-5px,0);
			-webkit-transform: translate3d(0,-5px,0);
			-moz-transform: translate3d(0,-5px,0);
		}
		90% {
			opacity: 1;
			transform: translate3d(0,5px,0);
			-webkit-transform: translate3d(0,5px,0);
			-moz-transform: translate3d(0,5px,0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0,0px,0);
			-webkit-transform: translate3d(0,0px,0);
			-moz-transform: translate3d(0,0px,0);
		}
	}
  @-webkit-keyframes zoomIn{

		0%{
			opacity: 0;
			transform:scale(0.2);
		}
		50%{
			transform:scale(1.1)
		}
		100%{
			opacity: 1;
			transform:scale(1)
		}
	}
	@keyframes zoomIn{
		0%{
			opacity: 0;
			transform:scale(0.2);
		}

		50%{
			transform:scale(1.1)
		}
		100%{
			opacity: 1;
			transform:scale(1);
		}
	}
	@keyframes fadeIn {
		0% {opacity: 0.25;}
		40% {opacity: 0.5;}
		100% {opacity: 1;}
	}
	@-webkit-keyframes fadeIn {
		0% {opacity: 0.25;}
		40% {opacity: 0.5;}
		100% {opacity: 1;}
	}





</style>