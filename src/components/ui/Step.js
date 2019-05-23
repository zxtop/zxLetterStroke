import Pen from "./Pen";
class Step{
    constructor(path,parent){
        this.path = path;
        this.parent = parent;
        this.pen = new Pen();
        this.threshold= 80;
        this.isStart = false;
        this.isEnd = false;
        this.LastPointIndex = 0;
        this.short = 20;

        this.lastIndex = 0;
        this.isUp = false;

        this.container = new PIXI.Container();
        this.parent.addChild(this.container);

        this.createStartCircle(this.path[0].x,this.path[0].y);
        this.createPathCircles();

    }

    // get _threshold(){
    //     return this.threshold;
    // }
    // set _threshold(value){
    //     this.threshold = value;
    // }

    createStartCircle(x,y){ //添加笔刷
        this.startC = new PIXI.Sprite.fromImage(res['brush'].url);
        this.startC.anchor.set(0.3);
        this.startC.x = x;
        this.startC.y = y;
        this.parent.addChild(this.startC);
    }

    createPathCircles(){ //画圆圈
        this.path.forEach((v)=>{
            let c  = new PIXI.Graphics();
            c.beginFill(0xfbb03b);
            c.drawCircle(v.x,v.y,50);
            c.endFill();
            c.alpha = 0;
            this.container.addChild(c);
        })
    }

    goStep(t_point){

        if(question.sources[store.state.pageNum].letters.text == 'B'){

            this.threshold = 150;

        }
        this.startC.x = this.path[0].x;
        this.startC.y = this.path[0].y;

        if(!this.checkStart(t_point)){
            return;
        }

        let np_info = this.getNearestPointInPath(t_point);
        console.log(np_info);

        if(np_info){
            this.updateLastPoint(np_info.index); //获取当前路径下标
        }
       
        let lastP_d = this.getDistanceP2P(t_point,this.path[this.lastIndex]);
        

        if(this.checkEnd()){
            // this.pen.fullPen(this.container.children);
            return;
        }

        if(this.isInTouchArea(lastP_d)){
           
            this.pen.go(this.lastIndex,this.container.children);
            this.startC.x = this.path[this.lastIndex].x;
            this.startC.y = this.path[this.lastIndex].y;
        }else{
        
            this.goBack();
        }

    }
    goBack(){
        if(!this.isEnd){
            this.isStart = false;
            this.pen.back(this.lastIndex,this.container.children,this.startC,this.path);

            this.lastIndex = 0;
            if(this.lastIndex == 0){
                this.pen.clearPen(this.container.children);
            }
            // else{
            //     if(this.lastIndex == this.path.length-1){

            //         this.pen.fullPen(this.container.children);
            //     }
            // }
        }
    }

    isInTouchArea(d){
        return d<this.threshold;
    }
    checkEnd(){
        if(this.lastIndex ===  this.path.length-1){
          
                this.isEnd = true;
                // this.startC.alpha = 0;
                this.startC.x = this.path[this.lastIndex].x;
                this.startC.y = this.path[this.lastIndex].y;
                 //填满路径
                this.pen.fullPen(this.container.children);
           
        }
        return this.isEnd;
    }
    updateLastPoint(index){
        if(index > this.lastIndex){
            this.lastIndex = index;
        }
    }
    getNearestPointInPath(t_point){
        let min_d = 99999,d = 0,min_i = 0,min_p;
     
        for(let i=this.lastIndex,len=this.path.length;i<len;i++){
            
            d = this.getDistanceP2P(t_point,this.path[i]);
            console.log(i,"============");
            console.log(this.lastIndex);

            if(d<min_d){

                // min_d = d;
                // min_p = this.path[i];
                // min_i = i;

                if(i<(this.short+this.LastPointIndex)){
                    min_d = d;
                    min_p = this.path[i];
                    min_i = i;
                    this.LastPointIndex = i;
                }else{
                    return {p:min_p,d:min_d,index:min_i};
                }       
            }
        

        }
        return {p:min_p,d:min_d,index:min_i};
    }
    getDistanceP2P(p1,p2){ //取两点之间的距离
        let xdiff = p1.x - p2.x;
        let ydiff = p1.y - p2.y;
        return Math.pow((xdiff*xdiff+ydiff*ydiff),0.5);
    }
    checkStart(t_point){
        console.log(this.path)
        let d = this.getDistanceP2P(t_point,this.path[0]);
        // console.log(d,this.threshold)
        if(d < this.threshold){
            console.log('sss')
            this.isStart = true;
        }
        console.log(this.isStart);
        return this.isStart;
    }
}
export default Step;