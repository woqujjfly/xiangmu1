define(["require", "exports", "../../Plugs/WinBase/global", "../../Plugs/Module/layer/layer"], function (require, exports, global_1, layer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new class FileController {
        uploadBase64(base64, callback) {
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
                        callback && callback(base64, global_1.globalAppInfo.FileUrl + data.Path);
                    }
                    else {
                        layer.msg('插入图片失败,' + data.ErrMsg);
                    }
                },
                error: function (err) {
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
        insertAtCursor(jsDom, html) {
            if (jsDom != document.activeElement) {
                jsDom.innerHTML = jsDom.innerHTML + html;
                return;
            }
            var sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement("span");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
        }
        pasteFile(e, el) {
            let self = this;
            el.focus();
            var cbd = e.clipboardData;
            var ua = window.navigator.userAgent;
            if (!(e.clipboardData && e.clipboardData.items)) {
                return;
            }
            if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === 'string' && cbd.items[1].kind === 'file' && cbd.types && cbd.types.length === 2 && cbd.types[0] === 'text/plain' &&
                cbd.types[1] === 'Files' && ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
                return;
            }
            for (var i = 0; i < cbd.items.length; i++) {
                var item = cbd.items[i];
                if (item.kind == 'file') {
                    var blob = item.getAsFile();
                    if (blob.size === 0) {
                        return;
                    }
                    else {
                        var selection = document.getSelection();
                        if (selection && selection.rangeCount > 0) {
                            var img = document.createElement('img');
                            let rangeObj = selection.getRangeAt(0);
                            self.blobToDataURL(blob, function (base64) {
                                img.src = base64;
                            });
                            rangeObj.deleteContents();
                            rangeObj.insertNode(img);
                            rangeObj.collapse(false);
                        }
                    }
                }
            }
        }
        upload(vue, src, callback, type) {
            console.log(type);
            let tp = type ? 'file' : 'fileImg';
            $.ajax({
                type: 'POST',
                url: global_1.globalAppInfo.UploadUrl + 'Uploads',
                data: JSON.stringify({ type: tp, src: src }),
                contentType: "application/json;charset=utf-8",
                processData: false,
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
                success: (response) => {
                    if (response.ErrCode == 0) {
                        let message = document.getElementById('message');
                        callback && callback(src, global_1.globalAppInfo.FileUrl + response.Path);
                        type == 2 && vue.send(response.Path, type);
                        message.focus();
                    }
                    else {
                        layer.msg('插入图片失败,' + response.ErrMsg);
                    }
                },
                error(err) {
                    layer.msg('插入图片失败,服务器错误.');
                }
            });
        }
    };
});
