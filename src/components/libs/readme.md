`import AnimateClass from './animate'` 

```
new AnimateClass(container,{//需要动画的元素  必填
    time:0.5,               //动画时间 默认0.6  可不配置
    type:'fadeOut',         //动画名字 默认zoomIn 可不配置
    delay:0,                //延时 默认 0 可不配置
    onComplete:()=>{       
         //动画执行后回调 如非必须 可不配置
    }
});
```

### 可选效果 

* bounceInDown //从上往下
* bounceOutDown //出场效果
* bounceInUp //从下往上
* zoomIn // 从小变大
* fadeIn // 透明度从0-1
* fadeOut //透明度从1-0
* leftAndRight 左右弹动
* upAndDown 上下弹动