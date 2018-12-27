define(["require", "exports", "../../Plugs/WinBase/global", "../../Plugs/Module/layer/layer"], function (require, exports, global_1, layer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uploads;
    exports.default = uploads = new class Upload {
        uploaddivimg(dom, base64) {
            $.ajax({
                type: 'POST',
                url: global_1.globalAppInfo.UploadUrl + 'Uploads/base64',
                data: {
                    base64: base64
                },
                xhr: function () {
                    let myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            let loaded = e.loaded;
                            let total = e.total;
                            let percent = Math.floor(100 * loaded / total) + '%';
                            console.log(percent);
                        }, false);
                    }
                    return myXhr;
                },
                success: (data) => {
                    if (data.ErrCode == 0) {
                        dom.src = global_1.globalAppInfo.FileUrl + data.Path;
                    }
                    else {
                        dom.src = '../../static/images/err.png';
                        layer.msg('插入图片失败,' + data.ErrMsg);
                    }
                },
                error: function (err) {
                    dom.src = '../../static/images/err.png';
                    layer.msg('插入图片失败,服务器错误.');
                }
            });
        }
        blobToDataURL(blob, callback) {
            var a = new FileReader();
            a.onload = function (e) {
                callback(e.target.result);
            };
            a.readAsDataURL(blob);
        }
        pasteFile(e) {
        }
    };
});
