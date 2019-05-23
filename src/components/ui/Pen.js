class Pen{
    constructor(){
        this.open = true;
    }
    go(index,pathCs){
        if(index!==0){
            for(let i = 0,len=pathCs.length;i<len;i++){
               
                pathCs[i].alpha = 1;
                if(i==index){
                    break;
                }
            }
        }else{
            pathCs[0].alpha = 1;
        }
    }

    back(index,pathCs,startC,path){
        startC.x = path[0].x;
        startC.y = path[0].y;
        for(index;index===0;index--){
            pathCs[index].alpha = 0;
        }
        // if(this.open){
        //     this.open = false;
           
        //     let s = setInterval(()=>{
        //         pathCs[index].alpha = 0;
        //         startC.x = path[index].x;
        //         startC.y = path[index].y;
        //         if(index === 0){ 
        //             this.open = true;
        //             clearInterval(s);
        //         }
        //         index--;
        //     },1);

        // }
    }

    fullPen(pathCs){
        for(let i = 0,len=pathCs.length;i<len;i++){
               
            pathCs[i].alpha = 1;
            
        }
    }

    clearPen(pathCs){
        for(let i = 0,len=pathCs.length;i<len;i++){
               
            pathCs[i].alpha = 0;
           
        }
    }


}

export default Pen;