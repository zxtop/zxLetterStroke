'use strict';
var errorArr = [];
var device;
var urlData = "https://nrcpapi.xueersi.com/";
var loadcomplete = 'loadfail';
function dataAssembling(obj) {
    var msgObject = {};
    msgObject.type = obj.type || '';
    msgObject.msg = obj.msg || '';
    msgObject.url = obj.url || '';
    msgObject.line = obj.line || '';
    return msgObject;
}
document.addEventListener('readystatechange', completeLoading);
function completeLoading() {
    if (document.readyState == "complete") {
        console.log("æ¥å¿å è½½1.0.0");
        var browserRedirect = function browserRedirect() {
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
        };
        browserRedirect();
        //æ¥å¿å¤ç
        loadcomplete = 'loadsuccess';

        var arrayProto = Array.prototype;
        var arrayMethods = Object.create(arrayProto);
        var sendStatus = true;
        /*
        * dataAssemblingå½æ° åæ°æ¥æ¶æ ¼å¼Object
        * type:éè¯¯ç±»å
        * msg:éè¯¯ä¿¡æ¯
        * url:éè¯¯é¾æ¥
        * line:éè¯¯è¡æ°
        *
        * */

        /*
        * window.addEventListener('unhandledrejection') çå¬promiseç³»åbug  ç±»ä¼¼é³é¢èµæºå è½½å¤±è´¥  å¼æ­¥rejectå¼å¸¸
        * window.addEventListener('error') çå¬èµæºå è½½ä¸æå ç±»ä¼¼å¾çé¾æ¥404  ç½ç»éè¯¯
        * window.onerror ç³»ç»è¿è¡éè¯¯ å½±åjsè¿è¡
        * window.console.error æ§å¶å°éè¯¯
        * */

        window.addEventListener('unhandledrejection', function (e) {
            
            errorArr.unshift(dataAssembling({
                msg: e.reason,
                type: 'promiseERROR',
                url:window.location.href
            }));
        });
        window.addEventListener('error', function (e) {}, true);
        window.onerror = function (msg, url, line) {
            errorArr.unshift(dataAssembling({
                msg: msg,
                url: window.location.href,
                line: line,
                type: 'runningERROR'
            }));
        };
        var consoleError = window.console.error;
        window.console.error = function () {
            errorArr.unshift(dataAssembling({
                msg: arguments[0],
                type: 'consoleERROR',
                url:window.location.href
            }));
            consoleError && consoleError.apply(window, arguments);
        };
        //logtype:oncount
        $.ajax({
            type: "post",
            url: urlData,
            contentType: "application/json",
            data: '{"logtype":"oncount","loadcomplete":"' + loadcomplete + '","device":"' + device + '","url":"'+window.location.href+'"}',
            beforeSend: function beforeSend() {},
            success: function success(data) {
                alert("æ¥å¿è¾åº:è¯¾ä»¶è¿è¡è®¾å¤æ¥å¿");
            },
            error: function error() {}
        });
        //logtype:onerror
        var newArrProto = [];
        ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
            var original = arrayMethods[method];
            newArrProto[method] = function mutator() {
                original.apply(this, arguments);
                if (errorArr.length > 0 && method === 'pop') {
                     //åå°console.logè¾åº
                    $.ajax({
                        type: "post",
                        url: urlData,
                        contentType: "application/json",
                        data: '{"logtype":"onerror","loadcomplete":"' + loadcomplete + '","device":"' + device + '","type":"' + errorArr[errorArr.length - 1].type + '","msg":"'+errorArr[errorArr.length - 1].msg+'","url":"'+errorArr[errorArr.length - 1].url+'","line":"'+errorArr[errorArr.length - 1].line+'"}',

                        beforeSend: function beforeSend() {
                            sendStatus = false;
                        },
                        success: function success(data) {
                            console.log("æ¥å¿è¾åº:è¯¾ä»¶è¿è¡éè¯¯æ¥å¿");
                            sendStatus = true;
                            if (errorArr.length > 1) {
                                errorArr.pop();
                            }
                        },
                        error: function error() {}
                    });
                } else if (method === 'unshift' && sendStatus === true) {
                    if (errorArr.length === 1) {
                        console.log(loadcomplete, device); //åå°console.logè¾åº
                        $.ajax({
                            type: "post",
                            url: urlData,
                            contentType: "application/json",
                            data: '{"logtype":"onerror","loadcomplete":"' + loadcomplete + '","device":"' + device + '","type":"' + errorArr[errorArr.length - 1].type + '","msg":"'+errorArr[errorArr.length - 1].msg+'","url":"'+errorArr[errorArr.length - 1].url+'","line":"'+errorArr[errorArr.length - 1].line+'"}',
                            beforeSend: function beforeSend() {
                                sendStatus = false;
                            },
                            success: function success(data) {
                                console.log("load-deviceæ¥å¿è¾åº:è¯¾ä»¶è¿è¡è®¾å¤ãå è½½å®æç¶æ");
                                sendStatus = true;
                                errorArr.pop();
                            },
                            error: function error(data) {}
                        });
                    }
                }
                return original;
            };
        });
        errorArr.__proto__ = newArrProto;
        $('img').each(function (index, item) {
            var newImg = new Image();
            newImg.src = item.src;
            //æ£æµå¾çsrcä¸­ä¸­æå­ç¬¦
            if (/.*[\u4e00-\u9fa5]+.*/.test(newImg.src)) {
                console.log("è¯¾ä»¶ä¸­æä¸­æåç§°çç´ æ");
                newImg.onerror = function (e) {
                    errorArr.unshift(dataAssembling({
                        msg: 'è¯¥å¾çurlä¸­æä¸­æå­ç¬¦ï¼è¯·ä½¿ç¨è±æå­ç¬¦',
                        url: window.location.href,
                        type: 'resourceNameERROR'
                    }));
                };
            }
            newImg.onerror = function (e) {
                errorArr.unshift(dataAssembling({
                    msg: 'Resource not loaded error 404',
                    url: window.location.href,
                    type: 'resourceLoadERROR'
                }));
            };
        });
    }
}