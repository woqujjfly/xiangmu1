import { globalAppInfo } from '../../Plugs/WinBase/global';
import * as layer from "../../Plugs/Module/layer/layer";
export default new class FileController {
	/**上传base64 */
	uploadBase64(base64: string, callback: (base64: string, url: string) => void) {
		// let formData = new FormData();
		// formData.append('fileImg', blob);
		$.ajax({
			type: 'POST',
			url: globalAppInfo.UploadUrl + 'Uploads/base64',
			data: {
				base64: base64
			},
			xhr: function () {
				let myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					myXhr.upload.addEventListener(
						'progress',
						function (e: any) {
							let loaded = e.loaded; //已经上传大小情况
							let total = e.total; //附件总大小
							let percent = Math.floor(100 * loaded / total) + '%'; //已经上传的百分比
							console.log(percent);
						},
						false
					);
				}
				return myXhr;
			},
			success: (data: any) => {
				if (data.ErrCode == 0) {
					//obj.Msg = obj.Msg.replace(base64, globalAppInfo.FileUrl + data.Path)
					callback && callback(base64, globalAppInfo.FileUrl + data.Path)
				} else {
					layer.msg('插入图片失败,' + data.ErrMsg);
				}
			},
			error: function (err: any) {
				layer.msg('插入图片失败,服务器错误.');
			}
		});
	}
	/**二进制转为 base64*/
	blobToDataURL(blob: Blob, callback: Function) {
		var a = new FileReader();
		a.onload = function (e: any) {
			callback(e.target.result);
		};
		a.readAsDataURL(blob);
	}
	/**光标处插入内容 */
	insertAtCursor(jsDom: HTMLElement, html: string) {
		if (jsDom != document.activeElement) { // 如果dom没有获取到焦点，追加GET
			jsDom.innerHTML = jsDom.innerHTML + html;
			return;
		}
		var sel, range;
		if (window.getSelection) {
			// IE9 或 非IE浏览器
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				// Range.createContextualFragment() would be useful here but is
				// non-standard and not supported in all browsers (IE9, for one)
				var el = document.createElement("span");
				el.innerHTML = html;
				var frag = document.createDocumentFragment(),
					node, lastNode;
				while ((node = el.firstChild)) {
					lastNode = frag.appendChild(node);
				}
				range.insertNode(frag);
				// Preserve the selection
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
	/**粘贴文件或图片 */
	pasteFile(e: any, el: any) {
		let self = this
		el.focus();
		var cbd = e.clipboardData;
		var ua: any = window.navigator.userAgent;
		// 如果是 Safari 直接 return
		if (!(e.clipboardData && e.clipboardData.items)) {
			return;
		}
		// Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
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
				} else {
					var selection = document.getSelection(); //.getRangeAt(0)
					if (selection && selection.rangeCount > 0) {
						var img = document.createElement('img');
						let rangeObj = selection.getRangeAt(0);
						self.blobToDataURL(blob, function (base64: string) {
							img.src = base64
							// self.uploaddivimg(base64, {});
						});
						rangeObj.deleteContents();
						rangeObj.insertNode(img);
						rangeObj.collapse(false);
					}
				}
			}
			// else if (item.kind == 'string') {
			// 	e.preventDefault();
			// 	let text;
			// 	if (item.type == 'text/plain') {
			// 		text = e.clipboard.readText();
			// 		text = text.replace(/(?!<[img|br].+?>)<.+?>/gi, '');
			// 		self.insertAtCursor(el, text);
			// 	} else {
			// 		text = e.clipboard.readHTML();
			// 		text = text.replace(/(?!<[img|br].+?>)<.+?>/gi, '');
			// 		self.insertAtCursor(el, text);
			// 	}
			// 	return;
			// }
		}
	}
	upload(vue: any, src: string, callback: (src: string, url: string) => void, type?: MsgType) {
		console.log(type);
		let tp = type ? 'file' : 'fileImg'
		$.ajax({
			type: 'POST',
			url: globalAppInfo.UploadUrl + 'Uploads',
			data: JSON.stringify({ type: tp, src: src }),
			contentType: "application/json;charset=utf-8",
			processData: false,
			// contentType: false,
			xhr: function () {
				let myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					myXhr.upload.addEventListener(
						'progress',
						function (e: any) {
							let loaded = e.loaded; //已经上传大小情况
							let total = e.total; //附件总大小
							let percent = Math.floor(100 * loaded / total) + '%'; //已经上传的百分比
							// $('#progressImg').val(percent);
							console.log(percent);
						},
						false
					);
				}
				return myXhr;
			},
			success: (response: any) => {
				if (response.ErrCode == 0) {
					let message: any = document.getElementById('message')
					// response.Path = response.Path + '?file=' + vue.fileName(vue.filePath);
					callback && callback(src, globalAppInfo.FileUrl + response.Path)
					type == 2 && vue.send(response.Path, type)
					message.focus();
				} else {
					layer.msg('插入图片失败,' + response.ErrMsg);
				}

			},
			error(err: any) {
				layer.msg('插入图片失败,服务器错误.');
			}
		});
	}
}