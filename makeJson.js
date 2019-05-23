let fs = require('fs')
let Path = require('path')
let imagePath = './static/images/'
let canLoad = ['png', 'jpg', 'json']

function getName (path = '') {
  return new Promise((resolve, reject) => {
    let temp = []
    fs.readdir(Path.resolve(imagePath + path), (e, v) => {
      let hasDir = false;
      let dirNum = 0;
      let myArr = [];
      function callBack(arr){
        dirNum--;
        myArr.push.apply(myArr,arr);
        if(dirNum===0){
          resolve([...temp, ...myArr]);
        }
      }
      v.map(val => {
        if (val.split('.').length < 2) {

          if (val !== 'stuffes') {
            dirNum++;
            hasDir = true;
            getName(val + '/').then((arr) => {
              callBack(arr);
            })
          }
        } else {
          if (canLoad.includes(val.split('.')[1]) && temp.filter(v => {
              v = JSON.parse(v)
              return v.name === val.split('.')[0]
            }).length === 0) {

            temp.push(JSON.stringify({
              path: './static/images/' + path + val,
              key: val.split('.')[0],
              edit:false
            }))
          }

        }
      })
      if (hasDir === false) {
        resolve(temp)
      }
    })
  })
}

getName().then((arr) => {
  if (fs.existsSync(imagePath + '/resource.json')) {
    fs.unlinkSync(imagePath + '/resource.json')
  }
  fs.appendFile(imagePath + '/resource.json', '[' + arr + ']', (e, v) => {
    console.log(e)
  })
})



