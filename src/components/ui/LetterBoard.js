import {Application,Container,Graphics,Sprite, Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../../loader';
import {TweenLite,TimeLine,TweenMax, TimelineMax, Power1} from 'gsap';
import {AnswerInfo,Loading,Question} from 'xes-answer';
import { Store} from 'vuex';
import STEMTITLE from 'xes-subtitle';
import GAME from "xes-game";

import Letter from './Letter';

class LetterBoard{

    constructor(){
        this.pixiStage = null;
        this.gameScene = null; //盒子
       
        this.currentLetterIndex = -1; //当前字母下标
        this.letters = null;  //letters 对象
        this.currentLetter = null;  //当前letters对象
        this.lettersQueue = ["A","a","B","b","C","c","D","d"]; 
        this.lettersRes = ['letterA','letter-a','letterB','letter-b','letterC','letter-c','letterD','letter-d'];
        this.doneRes = ['doneA','done-a','doneB','done-b','doneC','done-c','doneD','done-d'];
        this.container = null;
        this.isDone = false;

        this.lettersId = [
            {
                label:"A",
                num : 0
            },
            {
                label:"a",
                num : 1
            },
            {
                label:"B",
                num : 2
            },
            {
                label:"b",
                num : 3
            },
            {
                label:"C",
                num : 4
            },
            {
                label:"c",
                num : 5
            },
            {
                label:"D",
                num : 6
            },
            {
                label:"d",
                num : 7
            }
        ]
    }
 
    exec(){
        let _that = this;
        this.init(store.state.pageNum);
        stage.on("pointerdown",(e)=>{
            _that.isMove = true;
        })
        
        stage.on("pointermove",(e)=>{

            if(_that.isMove){

                _that.go(e.data.global);

                if(e.data.global.y > 1080 || e.data.global.x > 1920 || e.data.global.x < 0 || e.data.global.y < 0){
                    e.data.global.y = 1070;
                    e.data.global.x = 10;
                    _that.isMove = false;
                    _that.currentLetter.isUp = true;
                    _that.back();
                }

            }

        })
        stage.on("pointerup",(e)=>{

            _that.isMove = false;
            _that.currentLetter.isUp = true;
            _that.back();

        })
    }

    init(pageNum){

        this.pixiStage = stage.children[pageNum];
        console.log("开始初始化第"+pageNum+"页内容");

        this.gameScene = new PIXI.Container();
        this.pixiStage.addChild(this.gameScene);

       
        this.container = new PIXI.Container();
        this.gameScene.addChild(this.container);

        this.letters = {
            "A":{
                steps: [[939,265, 836,563, 736,857],[998,269, 1093,571, 1183,849],[846,691, 966,691, 1075,691]],
                stepPNum: [40,40,20],
            },
            "B":{
                steps: [[808,258,808,527,808,840],[810,264,1259,178,1158,586,900,534],[834,537,1280,505,1227,907,868,835]],
                stepPNum: [60,80,60],
                glueStepConfig:[0,[1,2]]
            },
            "C":{
                steps: [[1140,323,889,120,685,433,776,672],[774,662,803,796,1016,918,1152,737]],
                stepPNum: [60,80],
                glueStepConfig:[[0,1]]

            },
            "D":{
                steps: [[781,257, 777,546, 775,810],[789,257,1417,156,1257,1028,773,816]],
                stepPNum: [60,60]
            },
            "J":{
                steps: [[916,117,916,117,916,117.1],[920,247,920,713,920,928,763,765]],
                stepPNum: [2,100]
            },
            "a":{
                steps: [[1070,350,620,268,735,919,1042,732],[1116,358,1116,567,1116,780]],
                stepPNum: [50,30]
            },
            "b":{
                steps: [[813,237,811,511,809,790],[856,543,1255,292,1242,1009,833,814]],
                stepPNum: [40,80]
            },
            "c":{
                steps: [[1076,378,894,222,774,459,809,582],[809,582,843,772,1012,806,1086,690]],
                stepPNum: [60,80],
                glueStepConfig:[[0,1]]
            },
            "d":{
                steps: [[1063,523,656,374,751,1010,1057,802],[1126,233,1126,566,1126,838]],
                stepPNum: [80]
            }

        }

        this.start();
        
    }
    start(){
        this.nextLetter();
    }

    nextLetter(){

        this.currentLetterIndex++;

        this.lettersId.map((item,index)=>{
            if(item.label == question.sources[store.state.pageNum].letters.text){
                this.currentLetterIndex = item.num;
                
            }
        })
        
        if(this.currentLetterIndex > this.lettersQueue.length){
            this.isDone = true;
            return;
        }
        this.nextLetterBg(); //下一个的背景(指示背景)

        //初始化letter
        let letter = this.letters[this.lettersQueue[this.currentLetterIndex]];
        this.currentLetter = new Letter(letter.steps,letter.stepPNum,letter.glueStepConfig?letter.glueStepConfig:[],this.container);

    }

    nextLetterBg(){

        this.letterSprite = new PIXI.Sprite.fromImage(res[this.lettersRes[this.currentLetterIndex]].url);
        this.letterSprite.anchor.set(0.5,0.5);
        this.letterSprite.x = app.view.width/2;
        this.letterSprite.y = app.view.height/2;
        this.container.addChild(this.letterSprite);

    }

    go(t_point){

        if(this.isDone) return;
        if(this.currentLetter.isDone) return;
        this.currentLetter.go(t_point); 

    }

    back(){

        this.currentLetter.back();
        
        if(this.currentLetter.isDone){

            if(this.currentLetter.normalSteps.length > 0){
                this.currentLetter.normalSteps.forEach(v=>{
                    v.container.alpha = 0;
                });
            }
            if(this.currentLetter.glueSteps.length>0){
                this.currentLetter.glueSteps.forEach(v=>{
                    v.container.alpha = 0;
                });
            }

            this.letterSprite.texture = res[this.doneRes[this.currentLetterIndex]].texture;

            console.log(this.currentLetter.currentStep);

            if(this.currentLetter.currentStep){
                
                if(question.sources[store.state.pageNum].audio.show){ //播放成功声音
                    res[question.sources[store.state.pageNum].audio.audio_name].sound.play();
                }else{
                    return;
                }


                setTimeout(()=>{
                    // console.log(app.ticker);
                    // console.log(this.currentLetter)
                    this.currentLetter.hintHand.alpha = 0;
                    app.ticker = null;
                    
                    let answer = new AnswerInfo();
                    answer.init({type: 0, useranswer:"", answer:"", id:0, rightnum:1, wrongnum:0});
                    store.dispatch('pushToPostArr', answer);
                    store.dispatch('postAnswer');
                },3000)

            }
            
        }

    }


    clean(){
        this.container.children.forEach((v,i)=>{
            v.destroy(); 
        })
        this.container.removeChildren();
    }
}
export {LetterBoard}