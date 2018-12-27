import Vue from '../../Plugs/Module/Vue/Vue';
import { globalAppInfo } from '../../Plugs/WinBase/global';
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import { emotion } from "../../Plugs/Module/chatemotion";
import FileController from "./FileController";
let WebSockets = new WebSocketPro()
let DB = System.Require('Db')
let Menu = System.Require('Menu')
let shoter = System.Require("Screen")
globalAppInfo;
window.isBottom = true
class MsgObj {
	constructor(private Obj: ChatInfo) {
		this.Check()
		setTimeout(() => {
			if (Obj.MsgStatus == -1) {
				Obj.MsgStatus = 0
			}
		}, 2000)
	}
	private count: number = 0
	private currentTime: number = 0
	private Check(): void {
		let self = this
		let msg = self.Obj.Msg
		if (self.Obj.Type == 0) {
			var imgReg = /<img.*?(?:>|\/>)/gi;
			var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			self.Obj.Msg = self.Obj.Msg.replace(imgReg, (v1): string => {
				self.count++
				return v1.replace(srcReg, (v2, e): string => {
					if (e.indexOf('data:image/png;base64') > -1) {
						FileController.uploadBase64(e, (base64, url) => {
							msg = msg.replace(base64, url)
							if (++self.currentTime == self.count) {
								VueChat.send(0, self.Obj, msg)
							}
						})
					} else if (e.indexOf('http') != 0) {
						let path = e.replace(/\//, 'file:///')
						System.PostFile({
							Url: globalAppInfo.UploadUrl + 'Uploads', Path: path,
							PostName: 'fileImg',
							Done(response: string) {
								let res: any = JSON.parse(response)
								if (res.ErrCode == 0) {
									msg = msg.replace(e, 'http://file.chat555.com' + res.Path)
									if (++self.currentTime == self.count) {
										VueChat.send(0, self.Obj, msg)
									}
								} else {
									self.Obj.MsgStatus = 2
									self.Obj.ErrMsg = '上传失败'
									DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '上传失败', self.Obj.MsgId.toString())
								}
							},
							Error(err) {
								self.Obj.MsgStatus = 2
								self.Obj.ErrMsg = '发送失败, 网络故障'
								DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', self.Obj.MsgId.toString())
							}
						})
					}
					return v2
				})
			})
			if (self.count == 0) {
				VueChat.send(0, self.Obj)
			}
		}
	}
}
export var VueChat = new Vue({
	el: '#chatMainApp',
	data: {
		/**好友信息 */
		userInfo: <MyAndUserInfo>(Me.Param && JSON.parse(Me.Param)),
		/**是否显示字体设置 */
		showFontSize: false,
		/**对话列表 */
		chatList: <ChatList>{},
		/**表情列表 */
		showEmojiWrap: false,
		emojiTitle: '经典表情',
		/**是否显示表情 */
		showEmojiList: true,
		/**表情图片列表 */
		emojiList: <{ [k: string]: string }>emotion,
		/**查看更多 */
		lookMore: false,
		/**请求的次数 */
		moreTime: 0,
		/**更多消息 查看历史记录 */
		history: false,
		/**消息记录 */
		historyRecord: false,
		historyType: ['全部', '图片', '文件'],
		historyIndex: 0,
		/**消息记录列表 */
		historyList: <ChatList>{},
		isFirst: false,
		isLast: true,
		/**震动 */
		endTime: 0,
		/**没有更多了 */
		notMore: false,
		/**是否发送文件 */
		isUploadFile: false,
		/**发送文件列表 */
		uploadFileList: <Array<{ Name: string, CountSize: number, CurSize: number, SecSize: number }>>[]
	},
	methods: {
		/**设置字体 */
		selectFont(e: any) { },
		/**截图 */
		screenshot(base64: string) {
			let msg: any = document.querySelector('#message');
			msg.focus()
			if (typeof (base64) == "string") {
				let img = `<img src='data:image/png;base64,${base64}'>`
				FileController.insertAtCursor(msg, img)
			} else {
				shoter.GetScreen(function (str) {
					let img = `<img src='data:image/png;base64,${str}'>`
					FileController.insertAtCursor(msg, img)
				})
			}
		},
		/**震动 */
		shake(event: any, from: string) {
			let self = this
			let timer = 0, num = 0, left = Me.Left, top = Me.Top, Rate = 20, speed = 60, times = 10
			let stoped = () => {
				Me.Left = left
				Me.Top = top
				clearTimeout(timer);
			}
			let start = () => {
				num++;
				if (num == times * 2) {
					stoped()
					self.endTime++
				} else {
					if (Me.Left == (left - 2)) {
						Me.Top = top + 2
						setTimeout(function () {
							Me.Left = left + 2
						}, Rate)
					} else {
						Me.Top = top - 2
						setTimeout(function () {
							Me.Left = left - 2
						}, Rate)
					}
					timer = setTimeout(function () {
						start()
					}, speed);
				}
			}
			if (from) {
				layer.msg(from + '给您发送了一个抖动窗口')
				start()
				self.endTime = 0
			} else {
				if (self.endTime > 0) {
					layer.msg('您发送窗口抖动过于频繁，请稍后再试。')
					setTimeout(() => {
						self.endTime = 0
					}, 2000)
				} else {
					start()
					self.send(3, undefined, '')
				}
			}
		},
		/**消息记录 */
		messageLog() {
			let self = this
			self.isUploadFile = false
			if (self.historyRecord) {
				layer.load(1, {
					shade: [0.1, '#fff'],
					offset: [($(window).height() - $('header').height()) / 2 + 'px', ($('.chatRight').width() / 2 + $(".chat-main").width()) + 'px'],
				});
				$('.historyRecord').css('display', 'none')
				Me.Width = 1020
				$('.chatRight').width('360px')
			} else {
				$('.historyRecord').css('display', 'inline-block')
				Me.Width = 920
				$('.chatRight').width('260px')
			}
			let historyList: any = DB.GetTable(self.userInfo.MyID,
				'SELECT * FROM ChatRec WHERE (MyId=@p0 AND FriendId=@p1) OR (MyId=@p1 AND FriendId=@p0) ORDER BY MsgId desc LIMIT @p2',
				self.userInfo.MyID, self.userInfo.ID, '60')
			if (historyList.length > 0) {
				getRecord(historyList, 'history')
			} else {
				layer.closeAll()
				self.historyRecord && layer.msg('暂无记录')
			}
		},
		/**翻页 */
		historyAction(e: any) {
			let action = e.target.innerText.trim()
			if (action == '上一页') {

			} else if (action == '下一页') {

			}
			// let list = () => {

			// }
		},
		/**输入框右键菜单 */
		send_contextmenu() { },
		/**选择经典表情列表 */
		cutEmoji() { },
		showEmoji() {
			$('.emoji-wrap').css('top', 'calc(100% - ' + ($('.session-send').height() + 325) + 'px)');
		},
		/**发送图片 */
		sendImg(e: any) {
			let msg: any = document.querySelector('#message');
			msg.focus()
			let src: any = System.OpenFileDialog({ Filter: "图像文件|*.jpg;*.png;*.jpeg;*.gif;*.webp" })
			if (typeof (src) == "string") {
				let img = `<img src="/${src.replace(/\\/g, "/")}">`;
				FileController.insertAtCursor(msg, img);
			} else {
				for (let i in src) {
					let img = `<img src="/${src[i].replace(/\\/g, "/")}">`;
					FileController.insertAtCursor(msg, img)
				}
			}
		},
		/**发送文件 */
		sendFile() {
			let self = this
			let path: any = System.OpenFileDialog({ Multiselect: true })
			if (!path) return;
			self.isUploadFile = true
			self.historyRecord = false
			if (path.length == 1) {
				self.uploadFileList.push({ Name: path[0], CountSize: 0, CurSize: 0, SecSize: 0 })
			} else {
				for (let i = 0; i < path.length; i++) {
					if (self.uploadFileList.length > 0) {
						for (let j in self.uploadFileList) {
							if (self.uploadFileList[j].Name.indexOf(path[i]) > -1) {
								layer.msg("文件已在传输队列, 不能重复发送")
								return
							} else {
								self.uploadFileList.push({ Name: path[i], CountSize: 0, CurSize: 0, SecSize: 0 })
							}
						}
					} else {
						self.uploadFileList.push({ Name: path[i], CountSize: 0, CurSize: 0, SecSize: 0 })
					}
				}
			}
			if (path.length == 1) {
				path = path[0]
				$(".commonTitle").html("上传文件0/1")
				let msgInfo: ChatInfo
				System.PostFile({
					Url: globalAppInfo.UploadUrl + 'Uploads', Path: path,
					PostName: 'file',
					Done(response: string) {
						let res = JSON.parse(response)
						msgInfo = PushResult(self.userInfo.ID, { Msg: path, Type: 2, Dir: 0, MsgId: new Date().getTime(), MsgStatus: 0, Receive: false, ErrMsg: '' })
						if (res.ErrCode == 0) {
							path = res.Path + "?" + self.fileName(path)
							VueChat.send(2, msgInfo, path)
							self.uploadFileList = []
							self.isUploadFile = false
						} else {
							msgInfo.MsgStatus = 2
							msgInfo.ErrMsg = '上传失败'
							DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '上传失败', msgInfo.MsgId.toString())
						}
					},
					Progress(CountSize: number, CurSize: number, SecSize: number) {
						self.uploadFileList[0].SecSize = SecSize
						self.uploadFileList[0].CurSize = CurSize
						console.log(CountSize, CurSize, SecSize)
					},
					Error(err) {
						msgInfo.MsgStatus = 2
						msgInfo.ErrMsg = '发送失败, 网络故障'
						DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', msgInfo.MsgId.toString())
					}
				})
			} else {
				$(".commonTitle").html("上传文件0/" + path.length)
				let postNumber = 0
				let msgInfo: ChatInfo
				for (let i in path) {
					System.PostFile({
						Url: globalAppInfo.UploadUrl + 'Uploads', Path: path[i],
						PostName: 'file',
						Done(response: string) {
							let res: any = JSON.parse(response)
							msgInfo = PushResult(self.userInfo.ID, { Msg: path[i], Type: 2, Dir: 0, MsgId: new Date().getTime(), MsgStatus: 0, Receive: false, ErrMsg: '' })
							if (res.ErrCode == 0) {
								postNumber++
								$(".commonTitle").html(`上传文件${postNumber}/${path.length} `)
								for (let j = 0; j < self.uploadFileList.length; j++) {
									if (path[i] == self.uploadFileList[j].Name) {
										self.uploadFileList.splice(j, 1)
									}
								}
								if (self.uploadFileList.length == 0) {
									self.isUploadFile = false
								}
								path[i] = res.Path + "?" + self.fileName(path[i])
								VueChat.send(2, msgInfo, path[i])
							} else {
								msgInfo.MsgStatus = 2
								msgInfo.ErrMsg = '上传失败'
								DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '上传失败', msgInfo.MsgId.toString())
							}
							setTimeout(() => {
								let last: any = document.querySelector(".chat-list li:last-child")
								last && last.scrollIntoView()
							}, 0)
						},
						Progress(CountSize: number, CurSize: number, SecSize: number) {
							for (let i in self.uploadFileList) {
								self.uploadFileList[i].CountSize = CountSize
								self.uploadFileList[i].CurSize = CurSize
								self.uploadFileList[i].SecSize = SecSize
							}
						},
						Error(err) {
							msgInfo.MsgStatus = 2
							msgInfo.ErrMsg = '发送失败, 网络故障'
							DB.ExecuteNonQuery(VueChat.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', msgInfo.MsgId.toString())
						}
					})
				}
			}
		},
		/**文件大小 */
		postSize(size: number) {
			let s: string
			if (size > (1024 * 1024)) {
				s = (size / (1024 * 1024)).toFixed(2) + "MB"
			} else if (size > 1024) {
				s = (size / 1024).toFixed(2) + "KB"
			} else {
				s = size + "B"
			}
			return s;
		},
		/**打开文件 */
		openFile(path: string) {
			let isExist = System.OpenFileOrDir(path)
			if (!isExist) {
				layer.alert('此文件不存在, 可能被删除或者被移动到其他位置')
			}
		},
		/**打开文件夹 */
		openDir(path: string) {
			let index = path.lastIndexOf("\\")
			let isExist = System.OpenFileOrDir(path.substr(0, index))
			if (!isExist) {
				layer.alert('此文件不存在, 可能被删除或者被移动到其他位置')
			}
		},
		/**选择表情 */
		selectEmoji(item: string, text: string) {
			let msg: any = document.querySelector('#message');
			let img = `<img class="emotion" src="../../static/images/emotion/${item}.png" data-emoji="${text.replace('[', '').replace(']', '')}">`;
			FileController.insertAtCursor(msg, img);
			this.showEmojiWrap = false;
		},
		/**表情处理 */
		emotion(msg: ChatInfo) {
			var self = this;
			let msgs = msg.Msg.replace(/\[[\u4e00-\u9fa5]+\]/g, (Regstr): string => {
				return (
					`<img class="emotion" src="../../static/images/emotion/${self.emojiList[Regstr]}.png" data-emoji="${Regstr.replace('[', '').replace(']', '')}">`
				);
			});
			if (msg.MsgStatus == 2) {
				msgs += `<div class="err" data-err="${msg.ErrMsg}" data-MsgId="${msg.MsgId}"></div>`
			}
			return msgs;
		},
		/**文本右键菜单 */
		msg_contextmenu(event: any, item: ChatInfo, index: number, el: Element) {
			let self = this
			
			Menu.Popup({
				FontColor: '#000000',
				BgColor: "#ffffff",
				HoverColor: '#e2e2e3',
				Height: 30,
				Radius: 2,
				Click: (Key: string, Checked: boolean) => {
					console.log(Key, Checked)
					switch (Key) {
						case '复制': self.selectAll(el, index); document.execCommand('copy'); break;
						case '全选': self.selectAll(el, index); break;
						case '撤回': ; break;
						case '另存为': self.saveAs(item.Msg);; break;
						case '添加到表情': ; break;
					}
				},
				SubItem: TextContextMenu
			})
		},
		/**全选 */
		selectAll(el: Element, index: number) {
			var text = document.querySelectorAll('#' + el + ' .chat-item .chat-content')[index];
			var selection = window.getSelection();
			var range = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		},
		/**另存为 */
		saveAs(path: string) {
			let srcReg = /data-src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			let index: number = 0, p: string = ''
			path.replace(srcReg, (v1) => {
				p = v1.split(/[\'\"]/g)[1]
				index = p.lastIndexOf("/")
				return v1
			})
			System.SaveFileDialog({ FileName: p.substr(index + 1, p.length), OverwritePrompt: true })
		},
		file_contextmenu(item: HistroyChatinfo, index: number) {
			let self = this
			let FileContextMenu: Array<MeunItemConfig> = [
				{
					Key: "打开",
					Label: "打开",
					Type: 1,
					Enabled: true
				}, {
					Key: "打开文件夹",
					Label: "打开文件夹",
					Type: 1,
					Enabled: true
				}
			]
			Menu.Popup({
				FontColor: '#000000',
				BgColor: "#ffffff",
				HoverColor: '#e2e2e3',
				Height: 30,
				Radius: 2,
				Click: (Key: string, Checked: boolean) => {
					console.log(Key, Checked)
					switch (Key) {
						case '打开': self.openFile(item.Msg); break;
						case '打开文件夹': self.openDir(item.Msg); break;
					}
				},
				SubItem: FileContextMenu
			})
		},
		/**发送内容 */
		sendMessage(e: any) {
			let self = this
			let text: any = document.querySelector('#message');
			text.innerHTML.indexOf('<br>') == 0 && (text.innerHTML = '');
			let fun = () => {
				text.innerHTML = text.innerHTML.trim();
				if (text.innerHTML == '') {
					return;
				}
				let emoji: any = $('#message .emotion');
				if (emoji.length > 0) {
					emoji.each((i: number, element: any) => {
						let emojis = element.getAttribute('data-emoji');
						element.outerHTML = '[' + emojis + ']';
					});
				}
				let msg = text.innerHTML.replace(/<span.*?>/gi, '').replace(/<\/span>/gi, '');
				PushResult(self.userInfo.ID, { Msg: msg, Type: 0, Dir: 0, MsgId: new Date().getTime(), MsgStatus: -1, Receive: false, ErrMsg: '' })
				text.innerHTML = '';
			};
			if (e.type == 'click' || (e.keyCode == 83 && e.altKey)) {
				fun();
			}
			if (e.keyCode == 13 && e.ctrlKey) {
				FileController.insertAtCursor(text, '<br><br>');
			} else if (e.keyCode == 13) {
				fun();
				e.preventDefault();
			}
		},
		send(type: MsgType, msgInfo?: ChatInfo, msg?: string) {
			let self = this
			let sendErrNum = 0
			if (msgInfo) {
				if (!msg) msg = msgInfo.Msg
				let from = self.userInfo.Remark ? self.userInfo.Remark : self.userInfo.Nick
				let msgs = msgInfo.Msg
				msgs = msgs.replace(/<img.*?(?:>|\/>)/gi, '[图片]');
				switch (type) {
					case 2: msgs = '已发送文件' + msg; break;
					case 4: msgs = '推荐了' + msg.split('-')[1]; break;
				}
				System.Ipc.Send('index', JSON.stringify({ IpcCom: "SendMsg", FriendId: self.userInfo.ID, MsgId: msgInfo.MsgId, Msg: msgs, Type: type, From: from }))
				DB.ExecuteNonQuery(self.userInfo.MyID, 'INSERT INTO chatrec VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
					msgInfo.MsgId.toString(), self.userInfo.MyID, self.userInfo.ID, type, msgInfo.Msg, 0, '')
			}
			let send = () => {
				WebSockets.Send("SendMsg", { Type: type, Msg: <string>msg, To: Number(self.userInfo.ID), MsgId: new Date().getTime() },
					(msg) => {
						if (msg.ErrCode == 0) {
							if (msgInfo) {
								msgInfo.MsgStatus = 1
								DB.ExecuteNonQuery(self.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0 WHERE MsgId=@p1', 1, msgInfo.MsgId.toString())
							}
						} else {
							if (msgInfo) {
								msgInfo.MsgStatus = 2
								msgInfo.ErrMsg = '服务器错误'
								DB.ExecuteNonQuery(self.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '服务器错误', msgInfo.MsgId.toString())
							}
						}
					}, () => {
						sendErrNum++
						if (sendErrNum == 2) {
							if (msgInfo) {
								msgInfo.MsgStatus = 2
								msgInfo.ErrMsg = '发送失败, 网络故障'
								DB.ExecuteNonQuery(self.userInfo.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', msgInfo.MsgId.toString())
							}
						} else {
							send()
						}
					}, 5000)
			}
			send()
		},
		/**查看更多消息 */
		moreRecord() {
			let self = this
			self.lookMore = false
			let start = self.moreTime == 0 ? 5 : self.moreTime * 25
			self.moreTime++
			let chatList: any = DB.GetTable(self.userInfo.MyID,
				'SELECT * FROM chatrec WHERE (MyId=@p0 AND FriendId=@p1) OR (MyId=@p1 AND FriendId=@p0) ORDER BY MsgId desc LIMIT @p2, @p3',
				self.userInfo.MyID, self.userInfo.ID, start, '25')
			if (chatList.length > 0) {
				layer.load(1, {
					shade: [0.1, '#fff'],
					offset: ['80px', ($(window).width() - $('.chatRight').width()) / 2 + 'px'],
					time: 1500
				});
				getRecord(chatList, 'chatlist')
				div.scrollTop = div.scrollHeight / chatListEl.offsetHeight * div.offsetHeight
			} else {
				self.notMore = true
			}
		},
		/**查看好友资料 */
		openPersonalFile(e: any) {
			let params;
			if (e.target.className == 'handle' && this.userInfo.Share) {
				params = this.userInfo.Share.ShareID
			} else {
				params = this.userInfo
			}
			System.Open({
				Name: this.userInfo.ID + '',
				Text: globalAppInfo.AppName,
				Url: "Page/userAction/openPersonalFile.html",
				Size: { Width: 720, Height: 520 },
				Delay: true,
				Param: JSON.stringify(params),
			});
		},
		/**转发分享名片 */
		transmitShare() {
			let self = this;
			let params = <any>{};
			if (self.userInfo.Share) {
				params.getContactInfo = { ID: self.userInfo.Share.ShareID, Nick: self.userInfo.Share.ShareNick }
			}
			params.userData = { MyID: self.userInfo.MyID, MyNick: self.userInfo.MyNick, }
			System.Open({
				Name: "groupShare",
				Text: "分享名片",
				Url: "Page/groupAction/groupShare.html",
				Size: { Width: 550, Height: 410 },
				Delay: true,
				Param: JSON.stringify(params)
			});
		},
		fileName: function (msg: string) {
			msg = msg.replace(/\\/g, '/');
			let index = msg.lastIndexOf('?') > -1 ? msg.lastIndexOf('?') : msg.lastIndexOf('/');
			msg = msg.substring(index + 1, msg.length);
			return msg;
		},
		scrollBotton() {
			this.$nextTick(function () {
				let last: any = document.querySelector(".chat-list li:last-child")
				last && last.scrollIntoView()
			})
		}
	},
	updated: function () {
		this.$nextTick(function () {
			if (window.isBottom) {
				let last: any = document.querySelector(".chat-list li:last-child")
				last && last.scrollIntoView()
			}
			let last: any = document.querySelector(".historyList li:last-child")
			last && last.scrollIntoView()
		})
	},
	mounted() {
		let self = this
		setTimeout(() => {
			self.scrollBotton()
		}, 150)
		let text: any = document.querySelector('#message');
		text.focus();
		if (self.userInfo.Action) {
			switch (self.userInfo.Action) {
				case "Shake": self.shake(event, self.userInfo.Remark ? self.userInfo.Remark : self.userInfo.Nick); break;
				case "Share":
					let timeData = new Date().getTime()
					let msgInfo: ChatInfo = { Msg: (<any>self.userInfo.Share).ShareID + '-' + (<any>self.userInfo.Share).ShareNick, Type: 4, Dir: 0, MsgId: timeData, MsgStatus: 0, Receive: false, ErrMsg: '' }
					self.send(4, msgInfo); break;
			}
		}
	},
	watch: {
		moreTime(n) {
			n == 4 && (this.history = true)
		}
	}
});
$(document).on('mouseover', '.err', function (this: any) {
	layer.tips($(this).attr('data-err') + '<br>点击重新发送', this, { tips: 1, time: 0 });
})
$(document).on('mouseout', '.err', () => {
	layer.closeAll()
})
$(document).on("click", ".err", function (this: any) {
	let MsgId = Number($(this).attr('data-MsgId'))
	VueChat.chatList[VueChat.userInfo.ID].find((el) => {
		if (el.MsgId == MsgId) {
			layer.closeAll()
			el.MsgStatus = 0
			new MsgObj(el)
			return true
		} else {
			return false
		}
	})
})
let chatList: any
if (VueChat.userInfo.UnRead) {
	if (VueChat.userInfo.UnRead > 25) {
		VueChat.userInfo.UnRead = 25
	}
	chatList = DB.GetTable(VueChat.userInfo.MyID,
		'SELECT * FROM chatrec WHERE (MyId=@p0 AND FriendId=@p1) OR (MyId=@p1 AND FriendId=@p0) ORDER BY MsgId desc LIMIT @p2',
		VueChat.userInfo.MyID, VueChat.userInfo.ID, VueChat.userInfo.UnRead)
} else {
	chatList = DB.GetTable(VueChat.userInfo.MyID,
		'SELECT * FROM chatrec WHERE (MyId=@p0 AND FriendId=@p1) OR (MyId=@p1 AND FriendId=@p0) ORDER BY MsgId desc LIMIT @p2',
		VueChat.userInfo.MyID, VueChat.userInfo.ID, 3)
}
getRecord(chatList, 'chatlist')
console.log(chatList)
function getRecord(arr: Array<HistroyChatinfo>, type: string) {
	if (arr.length > 0) {
		layer.closeAll()
		for (let i = 0, l = arr.length; i < l; i++) {
			var imgReg = /<img.*?(?:>|\/>)/gi;
			var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			let msg = arr[i].Msg.replace(imgReg, (v1): string => {
				return v1.replace(srcReg, (v2, e): string => {
					if (e.indexOf('data:image/png;base64') < 0 && e.indexOf("://") < 0) {
						return v2.replace("src=", "onload='imgLoad(this)' src='../../static/images/loading.gif' data-src=")
					} else {
						return v2
					}
				})
			})
			PushResult(VueChat.userInfo.ID, {
				Msg: msg,
				Type: arr[i].Type,
				Dir: arr[i].MyId == VueChat.userInfo.MyID ? 0 : 1,
				MsgId: Number(arr[i].MsgId),
				MsgStatus: arr[i].MsgStatus,
				Receive: arr[i].MsgStatus == 1 ? true : false,
				ErrMsg: ''
			}, type, true)
		}
		if (VueChat.moreTime > 0 && arr.length < 25) {
			VueChat.lookMore = false
		} else {
			VueChat.lookMore = true
		}
	}
}
window.imgLoad = (str) => {
	let src: any = str.getAttribute("data-src")
	str.setAttribute('src', src)
	if (window.isBottom) {
		let last: any = document.querySelector(".chat-list li:last-child")
		last && last.scrollIntoView()
	}
}
function PushResult(userId: number, info: ChatInfo, type?: string, insertType?: boolean) {
	if (info.Type == 3) {
		layer.msg('您发送了一个抖动窗口')
	} else {
		let list = type ? VueChat.historyList : VueChat.chatList
		if (!list[userId]) {
			list[userId] = []
			insertType ? list[userId].unshift(info) : list[userId].push(info)
		} else {
			insertType ? list[userId].unshift(info) : list[userId].push(info)
		}
		type == 'history' ? VueChat.historyList = Object.assign({}, list) : VueChat.chatList = Object.assign({}, list)
	}
	!insertType && new MsgObj(info)
	return info;
}
let parentEl: any = document.querySelector('.chat-main');
let div: any = document.querySelector('#chat');
let chatListEl: any = document.querySelector('#chatList');
let ele: any = document.querySelector('.session-send');
let isChanging: boolean, isran: boolean
parentEl.onmousemove = function (e: MouseEvent) {
	if (isChanging) return;
	let T0 = ele.offsetTop;
	let T = T0 + 5;
	let areaT = e.clientY < T;
	if (areaT) {
		ele.style.cursor = 'n-resize';
		isran = true;
	} else {
		ele.style.cursor = 'default';
		isran = false;
	}
};
div.onmousewheel = (e: any) => {
	if (e.wheelDelta > 0) {
		window.isBottom = false
		if (VueChat.moreTime < 4 && !VueChat.notMore) {
			if (div.scrollTop > 0 && div.scrollTop < 100) {
				VueChat.lookMore = true
			} else if (div.scrollTop == 0 && e.wheelDelta > 0) {
				VueChat.moreRecord()
			}
		}
	} else {
		if (div.scrollHeight - div.clientHeight - 100 <= div.offsetHeight) {
			window.isBottom = true
		}
	}
}
ele.onmousedown = function (e: MouseEvent) {
	e.stopPropagation();
	let y1 = e.clientY;
	let EH = ele.offsetHeight;
	isChanging = true;
	document.onmousemove = function (e: MouseEvent) {
		VueChat.showEmojiWrap = false;
		let y2 = e.clientY;
		if (isChanging) {
			let eleH;
			if (isran) {
				eleH = EH + (y1 - y2);
			}
			if (eleH != undefined && (eleH > 140 && eleH < 350)) {
				ele.style.height = eleH + 'px';
				div.style.height = parentEl.offsetHeight - eleH + 'px'
			}
			if (window.isBottom) div.scrollTop = div.scrollHeight
		}
	};
	document.onmouseup = function (e: MouseEvent) {
		isChanging = false;
		isran = false;
		document.onmousemove = null;
		document.onmouseup = null;
		ele.style.cursor = 'default';
		if (ele.releaseCapture) {
			ele.releaseCapture();
		}
	};
};
// 截图路径 "data:image/png;base64," + str;
let messagediv: any = document.getElementById('message');
messagediv.addEventListener('paste',
	function (e: any) {
		FileController.pasteFile(e, messagediv)
	},
	false
);
let Enabled: boolean = false
let SendContextMenu: Array<MeunItemConfig> = [
	{
		Key: "剪切",
		Label: "剪切",
		Type: 1,
		Enabled: Enabled
	}, {
		Key: "复制",
		Label: "复制",
		Type: 1,
		Enabled: Enabled
	}, {
		Key: "粘贴",
		Label: "粘贴",
		Type: 1,
		Enabled: true
	}, {
		Key: "全选",
		Label: "全部选择",
		Type: 1,
		Enabled: Enabled
	}
]
$(document).on("contextmenu", "#message", function (this: HTMLElement, e: Event) {
	e.preventDefault()
	let msg = $(this).html()
	let isSelect = Select()
	for (let i in SendContextMenu) {
		if (msg && isSelect) {
			SendContextMenu[i].Enabled = true
		} else if (msg && SendContextMenu[i].Key == "全选") {
			SendContextMenu[i].Enabled = true
		}
	}
	Menu.Popup({
		FontColor: '#000000',
		BgColor: "#ffffff",
		HoverColor: '#e2e2e3',
		UnableBgColor: "#ffffff",
		Height: 30,
		Radius: 2,
		Click: (Key: string, Checked: boolean) => {
			console.log(Key, Checked)
			switch (Key) {
				case '剪切': ; break;
				case '复制': ; break;
				case '粘贴': ; break;
				case '全选': ; break;
			}
		},
		SubItem: SendContextMenu
	})
})
let isAdd = true
$(document).on("contextmenu", "#message img", function (this: HTMLElement, e: Event) {
	isAdd = true
	e.preventDefault()
	e.stopPropagation()
	for (let i in SendContextMenu) {
		SendContextMenu[i].Enabled = true
	}
	let ImgContextMenu = SendContextMenu.slice(0)
	if (!$(this).is(".emotion") && isAdd) {
		ImgContextMenu.push(
			{
				Key: "另存为",
				Label: "另存为",
				Type: 1,
				Enabled: true
			}, {
				Key: "添加到表情",
				Label: "添加到表情",
				Type: 1,
				Enabled: true
			}
		)
		isAdd = false
	}
	console.log(ImgContextMenu, SendContextMenu)
	Menu.Popup({
		FontColor: '#000000',
		BgColor: "#ffffff",
		HoverColor: '#e2e2e3',
		UnableBgColor: "#ffffff",
		Height: 30,
		Radius: 2,
		Click: (Key: string, Checked: boolean) => {
			console.log(Key, Checked)
			switch (Key) {
				case '另存为': ; break;
				case '添加到表情': ; break;
			}
		},
		SubItem: ImgContextMenu
	})
})
let TextContextMenu: Array<MeunItemConfig> = [
	{
		Key: "复制",
		Label: "复制",
		Type: 1,
		Enabled: true
	}, {
		Key: "全选",
		Label: "全部选择",
		Type: 1,
		Enabled: true
	}
]
// if (item.Dir == 0) {
// 	TextContextMenu.push({
// 		Key: "撤回",
// 		Label: "撤回",
// 		Type: 1,
// 		Enabled: true
// 	})
// }
$(document).on("contextmenu", '#chatlist .chat-content img, #historyList .chat-content img', function (this: HTMLElement, e: Event) {
	e.preventDefault()
	e.stopPropagation()
	if (!$(this).is(".emotion")) {
		TextContextMenu.push(
			{
				Key: "另存为",
				Label: "另存为",
				Type: 1,
				Enabled: true
			}, {
				Key: "添加到表情",
				Label: "添加到表情",
				Type: 1,
				Enabled: true
			}
		)
	}
})
function Select() {
	var selectionObj = null, rangeObj = null, selectedText = "", selectedHtml = "";
	if (window.getSelection) {
		selectionObj = window.getSelection();
		selectedText = selectionObj.toString();
		rangeObj = selectionObj.getRangeAt(0);
		var docFragment = rangeObj.cloneContents();
		var tempDiv = document.createElement("div");
		tempDiv.appendChild(docFragment);
		selectedHtml = tempDiv.innerHTML;
	}
	if (selectedText || selectedHtml) return true
	else return false
}