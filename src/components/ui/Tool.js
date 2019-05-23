
const Bezier = require('bezier-js');

class Tool{
    constructor(parent){
        this.b2 = new Bezier(304,267,434,458,208,709);
        this.b2_1 = new Bezier(1008,530, 1092,530, 1192,530);
        // this.b2_1 = new Bezier(884,805,1066,886,1156,725);

        this.b3 = new Bezier(1076,378,894,222,774,459,809,582);
        // this.b3 = new Bezier(879,721,1014,808,1092,682);

        this.b3_1 = new Bezier(1241,699,1604,714,1590,981,1237,964);

        // this.b4 = new Bezier(1227,201,1565,219,1576,609,1576,630,1264,614);


        this.parent = parent;

        this.b2Points = [];
        this.b2_1Points = [];

        this.b3Points = [];
        this.b3_1Points = [];

        this.b2CPs = [];
        this.b2_1CPs = [];

        this.b3CPs = [];
        this.b3_1CPs = [];

        // this.b4Points = [];
        // this.b4CPs = [];

    }

    draw(){


        // this.b4.getLUT(40).forEach((v)=>{
        //     let circle = new PIXI.Graphics();
        //     circle.beginFill(0xffffff);
        //     circle.drawCircle(0,0,10);
        //     circle.endFill();
        //     circle.x = v.x;
        //     circle.y = v.y;
        //     this.b4Points.push(circle);
        //     this.parent.addChild(circle);
        //   });
    
        // this.b4.points.forEach((v)=>{
        //     let circle = new PIXI.Graphics();
        //     circle.beginFill(0x66FF66);
        //     circle.drawCircle(0,0,10);
        //     circle.endFill();
        //     circle.x = v.x;
        //     circle.y = v.y;
        //     circle.interactive = true;
        //     circle.buttonMode = true;
        //     this.b4CPs.push(circle);
        //     this.parent.addChild(circle);
        // });


        this.b2.getLUT(40).forEach((v)=>{
        let circle = new PIXI.Graphics();
        circle.beginFill(0xffffff);
        circle.drawCircle(0,0,10);
        circle.endFill();
        circle.x = v.x;
        circle.y = v.y;
        this.b2Points.push(circle);
        this.parent.addChild(circle);
      });

        this.b2.points.forEach((v)=>{
            let circle = new PIXI.Graphics();
            circle.beginFill(0x66FF66);
            circle.drawCircle(0,0,10);
            circle.endFill();
            circle.x = v.x;
            circle.y = v.y;
            circle.interactive = true;
            circle.buttonMode = true;
            this.b2CPs.push(circle);
            this.parent.addChild(circle);
        });

        this.b2_1.getLUT(40).forEach((v)=>{
            let circle = new PIXI.Graphics();
            circle.beginFill(0xffffff);
            circle.drawCircle(0,0,10);
            circle.endFill();
            circle.x = v.x;
            circle.y = v.y;
            this.b2_1Points.push(circle);
            this.parent.addChild(circle);
          });
    
        this.b2_1.points.forEach((v)=>{
            let circle = new PIXI.Graphics();
            circle.beginFill(0x66FF66);
            circle.drawCircle(0,0,10);
            circle.endFill();
            circle.x = v.x;
            circle.y = v.y;
            circle.interactive = true;
            circle.buttonMode = true;
            this.b2_1CPs.push(circle);
            this.parent.addChild(circle);
        });

        this.b3.getLUT(40).forEach((v)=>{
        let circle = new PIXI.Graphics();
        circle.beginFill(0xffffff);
        circle.drawCircle(0,0,10);
        circle.endFill();
        circle.x = v.x;
        circle.y = v.y;
        this.b3Points.push(circle);
        this.parent.addChild(circle);
      });
    
      this.b3.points.forEach((v)=>{
        let circle = new PIXI.Graphics();
        circle.beginFill(0x66FF66);
        circle.drawCircle(0,0,10);
        circle.endFill();
        circle.x = v.x;
        circle.y = v.y;
        circle.interactive = true;
        circle.buttonMode = true;
        this.b3CPs.push(circle);
        this.parent.addChild(circle);
    });

    this.b3_1.getLUT(40).forEach((v)=>{
        let circle = new PIXI.Graphics();
        circle.beginFill(0xffffff);
        circle.drawCircle(0,0,10);
        circle.endFill();
        circle.x = v.x;
        circle.y = v.y;
        this.b3_1Points.push(circle);
        this.parent.addChild(circle);
      });
    
      this.b3_1.points.forEach((v)=>{
        let circle = new PIXI.Graphics();
        circle.beginFill(0x66FF66);
        circle.drawCircle(0,0,10);
        circle.endFill();
        circle.x = v.x;
        circle.y = v.y;
        circle.interactive = true;
        circle.buttonMode = true;
        this.b3_1CPs.push(circle);
        this.parent.addChild(circle);
    });

    }

    bindEvents(){
        let self = this;
        // this.b4CPs.forEach((v,i)=>{
        //     v.on("pointerdown",function(){
        //         v.isMove = true;
        //     })
        //     v.on("pointermove",function(e){
        //         if(v.isMove){
        //             v.x = self.b4.points[i].x = e.data.global.x;
        //             v.y = self.b4.points[i].y = e.data.global.y;
        //             self.update();
        //         }
        //     })
        //     v.on("pointerup",function(e){
        //         v.isMove = false;
        //         console.log(self.b4.points)
        //     })
        // }) 


        this.b2CPs.forEach((v,i)=>{
            v.on("pointerdown",function(){
                v.isMove = true;
            })
            v.on("pointermove",function(e){
                if(v.isMove){
                    v.x = self.b2.points[i].x = e.data.global.x;
                    v.y = self.b2.points[i].y = e.data.global.y;
                    self.update();
                }
            })
            v.on("pointerup",function(e){
                v.isMove = false;
                console.log(self.b2.points)
            })
        }) 

        this.b2_1CPs.forEach((v,i)=>{
            v.on("pointerdown",function(){
                v.isMove = true;
            })
            v.on("pointermove",function(e){
                if(v.isMove){
                    v.x = self.b2_1.points[i].x = e.data.global.x;
                    v.y = self.b2_1.points[i].y = e.data.global.y;
                    self.update();
                }
            })
            v.on("pointerup",function(e){
                v.isMove = false;
                console.log(self.b2_1.points)
            })
        }) 
        
        this.b3CPs.forEach((v,i)=>{
            v.on("pointerdown",function(){
                v.isMove = true;
            })
            v.on("pointermove",function(e){
                if(v.isMove){
                    v.x = self.b3.points[i].x = e.data.global.x;
                    v.y = self.b3.points[i].y = e.data.global.y;
                    self.update();
                }
            })
            v.on("pointerup",function(e){
                v.isMove = false;
                console.log(self.b3.points)
            })
        })

        this.b3_1CPs.forEach((v,i)=>{
            v.on("pointerdown",function(){
                v.isMove = true;
            })
            v.on("pointermove",function(e){
                if(v.isMove){
                    v.x = self.b3_1.points[i].x = e.data.global.x;
                    v.y = self.b3_1.points[i].y = e.data.global.y;
                    self.update();
                }
            })
            v.on("pointerup",function(e){
                v.isMove = false;
                console.log(self.b3_1.points)
            })
        })

    }

    update(){
        // this.b4.update();
        // this.b4.getLUT(40).forEach((v,i)=>{
        //     this.b4Points[i].x = v.x;
        //     this.b4Points[i].y = v.y;
        //   });

        //   this.b4.update();
        //   this.b4.getLUT(40).forEach((v,i)=>{
        //       this.b4Points[i].x = v.x;
        //       this.b4Points[i].y = v.y;
        //     });

        this.b2_1.update();
        this.b2_1.getLUT(40).forEach((v,i)=>{
            this.b2_1Points[i].x = v.x;
            this.b2_1Points[i].y = v.y;
          });

        this.b3.update();
        this.b3.getLUT(40).forEach((v,i)=>{
        this.b3Points[i].x = v.x;
        this.b3Points[i].y = v.y;
        });

        this.b3_1.update();
        this.b3_1.getLUT(40).forEach((v,i)=>{
        this.b3_1Points[i].x = v.x;
        this.b3_1Points[i].y = v.y;
        });
    }


}

export default Tool;