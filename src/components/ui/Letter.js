const Bezier = require('bezier-js');
import { getAnimation, getSound, load, createSprite,  getTexture} from '../../loader';
import Step from './Step';
import { Question } from 'xes-answer';

class Letter{
    constructor(steps,stepsPNum,glueStepsConfig,parent){
        this.steps = steps;
        this.stepsPNum = stepsPNum;
        this.glueStepsConfig = glueStepsConfig;
        this.glueSteps = [];

        this.stepCount = -1;
        this.currentStep = null;
        this.currentStepLength = 0;
        this.currentStepPointIndex = 0;

        this.parent = parent;
        this.isDone = false;

        this.hintHand = new PIXI.Sprite.fromImage(res['hand'].url);
        this.hintHand.alpha = 0;
        this.doneAnimate = getAnimation('animation_main');

        this.normalSteps = [];
        this.TOTimer = null;
        this.noHandleTime = 5;
        this.isUp = false;

        this.init();
    }

    init(){

        app.ticker.add(()=>{
            this.currentStepPointIndex++;
            if(this.currentStepPointIndex >= this.currentStepLength){
                this.hintHand.alpha = 0; 
            }else{
                this.hintHand.alpha = 1;
                this.hintHand.x = this.currentStep.path[this.currentStepPointIndex].x;
                this.hintHand.y = this.currentStep.path[this.currentStepPointIndex].y;
            }
        });

        this.doneAnimate.position.set(1920/2, 1080/2);
        if(this.glueStepsConfig.length>0){
            this.makeGlueStep();
        }else{
            this.makeNormalStep();
        }
        this.nextStep();
    }

    nextStep(){
        this.stepCount++;
        if(this.glueStepsConfig.length>0){
            if(this.stepCount === this.glueStepsConfig.length){
                this.isDone = true;
                this.showDoneAnimate(); //播放完成动画
              
                return;
            }
            
            this.currentStep = this.glueSteps[this.stepCount];
            if(this.currentStep){
                this.currentStep.startC.alpha = 1; //显示笔刷
                this.startHintTimer();
                
            }
            return;
        }

        if(this.stepCount === this.steps.length){
            this.isDone = true;
            this.showDoneAnimate(); //播放完成动画
 
            return;
        }

        
            this.currentStep = this.normalSteps[this.stepCount];

            if(this.currentStep){
                this.currentStep.startC.alpha = 1;
                this.startHintTimer();
            }else{
                return;
            }
        
    }

    makeNormalStep(){
        this.steps.forEach((v,i)=>{
            let curve = new Bezier(...v);
            let LUT = curve.getLUT(this.stepsPNum[i]);
            // console.log(LUT);
            let step = new Step(LUT,this.parent);
            step.startC.alpha = 0;
            this.normalSteps.push(step);
            
        })
    }


    makeGlueStep(){
        this.glueStepsConfig.forEach((v,i)=>{
            
            if(v instanceof Array){
                let LUTs = [];
                v.forEach((v1,i1)=>{
                    let curve = new Bezier(...this.steps[v1]);
                    let LUT = curve.getLUT(this.stepsPNum[v1]);
                    // console.log(LUT);
                    LUTs.push(...LUT);
                })
                // console.log(LUTs)
                let step = new Step(LUTs,this.parent,this.res);
                step.startC.alpha = 0;
                this.glueSteps.push(step);
            }else{
                let curve = new Bezier(...this.steps[v]);
                let LUT = curve.getLUT(this.stepsPNum[v]);
                let step = new Step(LUT,this.parent,this.res);
                step.startC.alpha = 0;
                this.glueSteps.push(step);
            }
        })
    }


    go(t_point){
        if(this.isDone) return;
        clearInterval(this.TOTimer);     //清除动画指示
        this.currentStep.goStep(t_point);
    }

    back(){
      if(this.currentStep){

        this.currentStep.goBack();
        
        if(!this.currentStep.isEnd){
          this.startHintTimer();

        }else{
            console.log(this.isUp);
            if(this.isUp){
  
                this.currentStep.startC.alpha = 0;
                this.nextStep();
                this.isUp = false;
            }
        }
      }

      
    }
    showDoneAnimate(){
       
        this.doneAnimate.state.setAnimation(0, 'shou', true);
        this.parent.addChild(this.doneAnimate);
        clearInterval(this.TOTimer);     //清除动画指示
        // app.ticker = null;

    }

    startHintTimer(){ //定时器，每3s执行一次
        clearInterval(this.TOTimer);     //清除动画指示

        this.TOTimer = setInterval(()=>{
            this.showHint();
        },this.noHandleTime*1000)
    }

    showHint(){
        this.parent.addChild(this.hintHand);
        this.currentStepPointIndex = 0;
        this.currentStepLength = this.currentStep.path.length - 1;
        
    }


}
export default Letter;