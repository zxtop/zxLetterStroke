let fontSize = [];
let letterSpacing = [];
let lineHeight = [];
let enterAnimate = [
    {
        name: '从上落下',
        label: 'bounceInDown'
    },
    {
        name: '从下弹起',
        label: 'bounceInUp'
    },
    {
        name: '从小变大',
        label: 'zoomIn'
    },
    {
        name: '渐隐渐现',
        label: 'fadeIn'
    }
];
let rightAnimate = [
    {
        name: '对号标记',
        label: 'checkMark'
    },
    {
        name: '星星四射',
        label: 'star'
    }
];
let wrongAnimate = [
    {
        name: '左右晃动',
        label: 'leftAndRight'
    },
    {
        name: '上下弹动',
        label: 'upAndDown'
    }
];
for (let i = 10; i <= 80; i++) {
    if (i % 2 === 0 && i !== 0) {
        fontSize.push({
            label: `${i}px`,
            value: i
        });
        letterSpacing.push({
            label: `${i}px`,
            value: i
        });
        lineHeight.push({
            label: `${i}px`,
            value: i
        })
    }
}
export {
    fontSize,
    enterAnimate,
    lineHeight,
    letterSpacing,
    rightAnimate,
    wrongAnimate
}