var errorArr = [];
var urlData="https://logstashnrcpb.xueersi.com:5001";
/*var urlData="http://localhost:8085/getdata";*/
var loadcomplete = 'loadfail';
function dataAssembling(obj){
    let msgObject = {};
    msgObject.type = obj.type||'';
    msgObject.msg = obj.msg||'';
    msgObject.url = obj.url||'';
    msgObject.line = obj.line||'';
    var msgStr = 'type:'+msgObject.type+';msg:'+msgObject.msg+';url:'+msgObject.url+';line:'+msgObject.line;
    return msgStr;
}
document.addEventListener('readystatechange',completeLoading)
function completeLoading() {
    if (document.readyState == "complete") {
        //日志处理
        loadcomplete = 'loadsuccess';
        function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                device = "phone";
            } else {
                device = "pc";
            }
        }
        var arrayProto = Array.prototype;
        var arrayMethods = Object.create(arrayProto);
        var sendStatus = true;
        /*
        * dataAssembling函数 参数接收格式Object
        * type:错误类型
        * msg:错误信息
        * url:错误链接
        * line:错误行数
        *
        * */

        /*
        * window.addEventListener('unhandledrejection') 监听promise系列bug  类似音频资源加载失败  异步reject异常
        * window.addEventListener('error') 监听资源加载不成功 类似图片链接404  网络错误
        * window.onerror 系统运行错误 影响js运行
        * window.console.error 控制台错误
        * */

        window.addEventListener('unhandledrejection', function(e)
        {
            console.log(e);
            errorArr.unshift(dataAssembling({
                msg:e.reason,
                type:'promiseERROR'
            }));
        });
        window.addEventListener('error', function(e)
        {

        }, true);
        window.onerror = function(msg,url,line)
        {
            errorArr.unshift(dataAssembling({
                msg:msg,
                url:url,
                line:line,
                type:'runningERROR'
            }));
        };
        var consoleError = window.console.error;
        window.console.error = function () {
            errorArr.unshift(dataAssembling({
                msg:arguments[0],
                type:'consoleERROR'
            }));
            consoleError && consoleError.apply(window, arguments);
        };
        browserRedirect();
        var newArrProto = [];
        [
            'push',
            'pop',
            'shift',
            'unshift',
            'splice',
            'sort',
            'reverse'
        ].forEach(method => {
            var original = arrayMethods[method];
            newArrProto[method] = function mutator() {
                original.apply(this, arguments);
                if(errorArr.length>0 && method === 'pop'){
                    console.log(loadcomplete,device,errorArr);    //前台console.log输出
                    $.ajax({
                        type : "post",
                        url : urlData,
                        contentType : "application/json",
                        data :'{"loadcomplete":"'+loadcomplete+'","device":"'+device+'","errormsg":"'+errorArr[errorArr.length-1]+'"}',

                        beforeSend:function(){
                            sendStatus = false;
                        },
                        success:function (data) {
                            sendStatus = true;
                            if(errorArr.length>1)
                            {
                                errorArr.pop();
                            }
                        },
                        error:function () {

                        }
                    });
                }else if(method === 'unshift' && sendStatus === true){
                    if(errorArr.length === 1)
                    {
                        console.log(loadcomplete,device,errorArr);    //前台console.log输出
                        $.ajax({
                            type : "post",
                            url : urlData,
                            contentType : "application/json",
                            data :'{"loadcomplete":"'+loadcomplete+'","device":"'+device+'","errormsg":"'+errorArr[errorArr.length-1]+'"}',
                            beforeSend:function(){
                                sendStatus = false;
                            },
                            success:function (data) {
                                sendStatus = true;
                                errorArr.pop();
                            },
                            error:function (data) {

                            }
                        });
                    }
                }
                return original;
            }
        });
        errorArr.__proto__ = newArrProto;
       /* $('img').each(function(index,item){
            var newImg = new Image();
            newImg.src = item.src;
            newImg.onerror = function(e){
                errorArr.unshift(dataAssembling({
                    msg:'Resource not loaded error',
                    url:e.target.src,
                    type:'resourceLoadERROR'
                }));
            }
        })*/
    }
}