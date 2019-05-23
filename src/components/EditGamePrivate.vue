<template>
    <div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option')" ref="optionTitle"></i>
            <span @click="tabShow(index,'option')">
            自定义配置项
        </span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option">
            <!--checkbox-->
             <el-checkbox style="width:100%;margin-top:20px" v-model="item.audio.show" size="small">音频文件</el-checkbox>
             <!--音频上传-->
             <div class="upload" style="margin-top:5px">
                <!-- <span class="file-title">音频文件</span> -->
                    <div class="animate-box">
                        <span v-text="item.audio.audio_name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAudio(index,'audio',$event)">
                        </div>
                    </div>
            </div>

            <!-- 测试用 -->
         
            
            <el-input placeholder="测试的字母" v-model="item.letters.text" size="medium">
                    <template slot="prepend">要查看的字母（大写或小写）：</template>
            </el-input>
            <span style="color:#fff">A,a,B,b,C,c,D,d</span>

        </div>
    </div>
</template>
<script>
    export default {
        name: "EditGamePrivate",
        data() {
            return {
                label: '1',
                testData:{
                    switch:true,
                    animateName:'animateName',
                    audioName:'audioName',
                    spriteName:'spriteName',
                    input:111,
                    select:16,
                    checked:true,
                    fontSize: [
                        {
                            label: '16px',
                            value: 16
                        },
                        {
                            label: '18px',
                            value: 18
                        },
                        {
                            label: '20px',
                            value: 20
                        },
                        {
                            label: '22px',
                            value: 22
                        },
                        {
                            label: '24px',
                            value: 24
                        },
                        {
                            label: '26px',
                            value: 26
                        },
                        {
                            label: '30px',
                            value: 30
                        },
                        {
                            label: '40px',
                            value: 40
                        },
                        {
                            label: '50px',
                            value: 50
                        }
                    ]
                }
            }
        },
        props: [
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        mounted() {
            // 加载播放精灵序列图伪代码
            // let sheetName = start.startBtn.sprite.name;
            // let frame = res[sheetName].spritesheet;
            // let frameArray = [];
            // let movieClip = null;
            // for (let i in frame.textures) {
            //     frameArray.push(frame.textures[i]);
            // }
            // console.log(frameArray);
            // movieClip = new PIXI.extras.AnimatedSprite(frameArray);
            // movieClip.x = start.startBtn.sprite.x;
            // movieClip.y = start.startBtn.sprite.y;
            // movieClip.loop = start.startBtn.sprite.loop;
            // movieClip.scale.set(start.startBtn.sprite.scale);
            // movieClip.animationSpeed = 1;
            // movieClip.play();
            // this.startCon.addChild(movieClip);
        },
        methods: {
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                if (name !== 'one') {
                    let nameTab = this.tabShowStatus[index].child[name];
                    if (nameTab) {
                        this.tabShowStatus[index].child[name] = false;
                        title.className = 'el-icon-arrow-right'
                    } else {
                        
                        this.tabShowStatus[index].child[name] = true;
                        title.className = 'el-icon-arrow-down'
                    }
                    console.log(nameTab,"nameTab");
                }
            },
            updateResourceData(){
                /*
                * 上传图片后请求资源列表
                * 获取图片链接显示图片
                * */
                this.$emit('updateResourceData')
            },
            uploadImage(index, name, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                    this.gameData[index][name].image.image_name = res.resourceName;
                    this.updateResourceData();
                })
            },
            uploadAudio(index,name,e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name].audio_name = res.resourceName;
                }
                )
            },
            uploadAnimation(index, name, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name].animate.animate_name = res.resourceName;
                })
            },
            uploadSprite(index,name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    //this.gameData[index][name].sprite.name = res.resourceName;
                })
            },
            //删除接口
            changeArr(type, index) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[0]));
                    resetArr(arr);
                    this.gameData.push(arr);
                    this.tabShowStatus.push({
                        show: false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                }
                else if (type === 'copy') {
                    this.gameData.push(JSON.parse(JSON.stringify(this.gameData[index])));
                    this.tabShowStatus.push({
                        show: false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                }
                else if (type === 'del') {
                    if(this.gameData.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData.splice(index, 1);
                            this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
        }
    }
</script>
<style scoped lang="scss">
.edit .el-input-group{
    width:100%
}
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        padding-bottom: 10px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-animate-title{
            margin-bottom: 15px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 5px 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
</style>