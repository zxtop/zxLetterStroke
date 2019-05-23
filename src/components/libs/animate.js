import {TweenLite, TweenMax} from 'gsap';

class Animate {
    //定义构造方法
    constructor(obj, options = {}) {
        this.obj = obj;
        this.time = options.time ? options.time : 0.6;
        this.delay = options.delay ? options.delay : 0;
        this.onComplete = options.onComplete ? options.onComplete : '';
        this.type = options.type || 'zoomIn';
        this.setAnimation('', this.onComplete);
    }
    setAnimation(type, callback) {
        switch (this.type) {
            case 'bounceInDown':
                let animateSlideDown = new TimelineMax();
                this.obj.alpha = 0;
                animateSlideDown.to(this.obj, 0.1, {
                    delay:this.delay,
                    y: this.obj.y-3000
                });
                animateSlideDown.to(this.obj, this.time*0.6, {
                    y: this.obj.y+25,
                    alpha:1,
                });
                animateSlideDown.to(this.obj, this.time*0.15, {
                    y: this.obj.y-10
                });
                animateSlideDown.to(this.obj, this.time*0.15, {
                    y: this.obj.y+5
                });
                animateSlideDown.to(this.obj, this.time*0.1, {
                    y: this.obj.y,
                    onComplete:()=>{
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'bounceOutDown':

                let animateSlideOutDown = new TimelineMax();
                animateSlideOutDown.to(this.obj, this.time*0.2, {
                    delay:this.delay,
                    ease:'Quad',
                    y: this.obj.y+10
                });
                animateSlideOutDown.to(this.obj, this.time*0.25, {
                    y: this.obj.y-20,
                    ease:'Quad',
                });
                animateSlideOutDown.to(this.obj, this.time*0.45, {
                    y:this.obj.y+2000,
                    ease:'Quad',
                    alpha:0,
                    onComplete:()=>{
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'bounceInUp':
                let animateBounceInUp = new TimelineMax();
                this.obj.alpha = 0;
                animateBounceInUp.to(this.obj, this.time*0.1, {
                    delay:this.delay,
                    y: this.obj.y+3000
                });
                animateBounceInUp.to(this.obj, this.time*0.6, {
                    y: this.obj.y-20,
                    alpha:1,
                });
                animateBounceInUp.to(this.obj, this.time*0.15, {
                    y: this.obj.y+10
                });
                animateBounceInUp.to(this.obj, this.time*0.15, {
                    y: this.obj.y-5
                });
                animateBounceInUp.to(this.obj, this.time*0.1, {
                    y: this.obj.y,
                    onComplete:()=>{
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'zoomIn':
                this.obj.alpha = 1;
                this.obj.scale.set(0.5);
                TweenMax.to(this.obj.scale, this.time*0.5, {
                    x:1,
                    y:1,
                    delay:this.delay,
                    onComplete: () => {
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'fadeIn':
                this.obj.alpha = 0;
                TweenMax.to(this.obj, this.time, {
                    alpha: 1,
                    delay: this.delay,
                    onComplete: () => {
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'fadeOut':
                this.obj.alpha = 1;
                TweenMax.to(this.obj, this.time, {
                    alpha: 0,
                    delay: this.delay,
                    onComplete: () => {
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'leftAndRight':
                let animateLeftAndRight = new TimelineMax();
                animateLeftAndRight.to(this.obj, 0.05, {
                    x: this.obj.x-10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.1, {
                    x: this.obj.x+10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.1, {
                    x: this.obj.x-10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.1, {
                    x: this.obj.x+10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.1, {
                    x: this.obj.x-10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.1, {
                    x: this.obj.x+10,
                    ease:'linear'
                });
                animateLeftAndRight.to(this.obj, 0.05, {
                    x: this.obj.x,
                    ease:'linear',
                    onComplete:()=>{
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            case 'upAndDown':
                let animateUpAndDown = new TimelineMax();
                animateUpAndDown.to(this.obj, 0.05, {
                    y: this.obj.y-10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.1, {
                    y: this.obj.y+10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.1, {
                    y: this.obj.y-10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.1, {
                    y: this.obj.y+10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.1, {
                    y: this.obj.y-10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.1, {
                    y: this.obj.y+10,
                    ease:'linear'
                });
                animateUpAndDown.to(this.obj, 0.05, {
                    y: this.obj.y,
                    ease:'linear',
                    onComplete:()=>{
                        if (this.onComplete) {
                            callback()
                        }
                    }
                });
                break;
            default:
                break
        }
    }
}
export default Animate