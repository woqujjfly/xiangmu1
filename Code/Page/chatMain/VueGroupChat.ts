import Vue from "../../Plugs/Module/Vue/Vue";
import * as layer from "../../Plugs/Module/layer/layer";
import { WebSocketPro } from "../../Plugs/Module/WebSocketPro";
import { emotion } from "../../Plugs/Module/chatemotion";
import FileController from "./FileController";
import { globalAppInfo } from '../../Plugs/WinBase/global';
let WebSockets = new WebSocketPro
let DB = System.Require('Db')
let shoter = System.Require("Screen")
let Menu = System.Require("Menu")
window.isBottom = true

class MsgObj {
	constructor(private Obj: ChatInfo) {
		this.Check();
		setTimeout(() => {
			if (Obj.MsgStatus == -1) {
				Obj.MsgStatus = 0
			}
		}, 2000)
	}
	private count: number = 0
	private currentTime: number = 0
	private Check(): void {
		let self = this;
		console.log(self.Obj);
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
								VueGroupChat.send(0, self.Obj, msg)
							}
						})
					} else if (e.indexOf('http') != 0) {
						FileController.upload(VueGroupChat, e, (src, url) => {
							msg = msg.replace(src, url)
							if (++self.currentTime == self.count) {
								VueGroupChat.send(0, self.Obj, msg)
							}
						})
					}
					return v2
				})
			})
			if (self.count == 0) {
				VueGroupChat.send(0, self.Obj)
			}
		}
	}
}

export var VueGroupChat = new Vue({
	el: "#chatMainApp",
	data: {
		/**参数信息 */
		Params: <MyAndGroupInfo>(Me.Param && JSON.parse(Me.Param)),
		/**是否显示字体设置 */
		showFontSize: false,
		/**对话列表 */
		chatList: <ChatList>{},
		/**导航菜单列表 */
		navList: ['聊天', '公告', '文件'],
		/**默认'聊天主界面 */
		navitem: '聊天',
		/**控制点击不同的菜单显示不同的DIV */
		showbox: false,
		/**当前的用户信息 */
		userData: '',
		/**新公告内容的最大长度 */
		len: 500,
		/**新公告的内容*/
		AnouncementContent: '',
		/**群成员列表 */
		groupmember: <MemberList>{},
		/**公告列表 */
		announcementlist: <Array<any>>[],
		announcementNumber: 0,
		numberList: <Array<number>>[],
		/**消息记录列表 */
		historyList: <ChatList>{},
		/**表情图片列表 */
		emojiList: <{ [k: string]: string }>emotion,
		/**表情列表 */
		showEmojiWrap: false,
		/**是否显示表情 */
		showEmojiList: true,
		/**震动 */
		endTime: 0,
		emojiTitle: '经典表情',
		filedata: [
			{
				file: '员工晋升考核后薪酬管理.doc',
				refreshtime: '2018-10-25',
				size: '54k',
				uploadperson: '巨象',
				downloadtimes: '10次'
			},
			{
				file: '员工晋升考核后薪酬管理.doc',
				refreshtime: '2018-10-25',
				size: '54k',
				uploadperson: '巨象',
				downloadtimes: '10次'
			},
			{
				file: '员工晋升考核后薪酬管理.doc',
				refreshtime: '2018-10-25',
				size: '54k',
				uploadperson: '巨象',
				downloadtimes: '10次'
			},
		],
		number: '',
		/**是否显示编辑公告 */
		showeditAnnouncement: false,
		/**新公告的标题 */
		inputTitle: '',
		/**查看更多 */
		lookMore: false,
		/**请求的次数 */
		moreTime: 0,
		/**历史记录 */
		historyRecord: false,
		/**是否上传文件 */
		isUploadFile: false,
		/**发送文件列表 */
		uploadFileList: <Array<{ Name: string, CountSize: number, CurSize: number, SecSize: number }>>[]
	},
	methods: {
		/**设置字体 */
		selectFont(e: any) {
			let fontVal: string = e.target.value;
			fontVal
		},
		/**选择表情 */
		selectEmoji(item: string, text: string) {
			let msg: any = document.querySelector('#message');
			let img = `<img class="emotion" src="../../static/images/emotion/${item}.png" data-emoji="${text.replace('[', '').replace(']', '')}">`;
			FileController.insertAtCursor(msg, img);
			this.showEmojiWrap = false;
		},
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
			let historyList: any = DB.GetTable(self.Params.MyID,
				'SELECT * FROM ChatRec WHERE (MyId=@p0 AND FriendId=@p1) OR (MyId=@p1 AND FriendId=@p0) ORDER BY MsgId desc LIMIT @p2',
				self.Params.MyID, self.Params.ID, '60')
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
		/**选择经典表情列表 */
		cutEmoji() { },
		showEmoji() {
			$('.emoji-wrap').css('top', 'calc(100% - ' + ($('.session-send').height() + 325) + 'px)');
		},
		/**发送图片 */
		sendImg(e: any) {
			let msg: any = document.querySelector('#message');
			msg.focus();
			let src: any = System.OpenFileDialog({ Filter: "图像文件|*.jpg;*.png;*.jpeg;*.gif;*.webp" })
			if (typeof (src) == 'string') {
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
						msgInfo = PushResult(self.Params.ID, { Msg: path, Type: 2, Dir: 0, MsgId: new Date().getTime(), MsgStatus: 0, Receive: false, ErrMsg: '' })
						if (res.ErrCode == 0) {
							path = res.Path + "?" + self.fileName(path)
							VueGroupChat.send(2, msgInfo, path)
							self.uploadFileList = []
							self.isUploadFile = false
						} else {
							msgInfo.MsgStatus = 2
							msgInfo.ErrMsg = '上传失败'
							DB.ExecuteNonQuery(VueGroupChat.Params.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '上传失败', msgInfo.MsgId.toString())
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
						DB.ExecuteNonQuery(VueGroupChat.Params.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', msgInfo.MsgId.toString())
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
							msgInfo = PushResult(self.Params.ID, { Msg: path[i], Type: 2, Dir: 0, MsgId: new Date().getTime(), MsgStatus: 0, Receive: false, ErrMsg: '' })
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
								VueGroupChat.send(2, msgInfo, path[i])
							} else {
								msgInfo.MsgStatus = 2
								msgInfo.ErrMsg = '上传失败'
								DB.ExecuteNonQuery(VueGroupChat.Params.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '上传失败', msgInfo.MsgId.toString())
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
							DB.ExecuteNonQuery(VueGroupChat.Params.MyID, 'UPDATE chatrec SET MsgStatus=@p0, ErrMsg=@p1 WHERE MsgId=@p2', 2, '发送失败, 网络故障', msgInfo.MsgId.toString())
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
		fileName: function (msg: string) {
			msg = msg.replace(/\\/g, '/');
			let index = msg.lastIndexOf('?') > -1 ? msg.lastIndexOf('?') : msg.lastIndexOf('/');
			msg = msg.substring(index + 1, msg.length);
			return msg;
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
		/**表情处理 */
		emotion(msg: ChatInfo) {
			console.log(111);
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
		msg_contextmenu(item: ChatInfo, index: number) {
			let SubItem: Array<MeunItemConfig> = [];
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
			if (item.Dir == 0) {
				TextContextMenu.push({
					Key: "撤回",
					Label: "撤回",
					Type: 1,
					Enabled: true
				})
			}
			var imgReg = /<img.*?(?:>|\/>)/gi;
			item.Msg.replace(imgReg, (v1): string => {
				if (!$(v1).is(".emotion")) {
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
				return v1
			})
			SubItem = TextContextMenu
			Menu.Popup({
				FontColor: '#000000',
				BgColor: "#ffffff",
				HoverColor: '#e2e2e3',
				Height: 30,
				Radius: 2,
				Click: (Key: string, Checked: boolean) => {
					console.log(Key, Checked)
					switch (Key) {
						case '复制': document.execCommand("copy", false, item.Msg); break;
						case '全选': document.execCommand("selectAll", false, item.Msg); break;
						case '撤回': ; break;
					}
				},
				SubItem: SubItem
			})
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
		/*输入框失去焦点是表情栏自动隐藏*/
		// expressionNone() :void {
		// 	let self = this 
		// 	self.showEmojiWrap=false;
		// },
		/**发送内容 */
		sendMessage(e: any) {
			let self = this
			let text: any = document.querySelector('#message');
			let fun = () => {
				text.innerHTML = text.innerHTML.trim();
				if (text.innerHTML == '') {
					return;
				}
				let emoji: any = $('#message .emotion');
				if (emoji.length > 0) {
					emoji.each(((i: number, element: any) => {
						let emojis = element.getAttribute('data-emoji');
						element.outerHTML = '[' + emojis + ']';
					}));
				}
				let msg = text.innerHTML.replace(/<span.*?>/gi, '').replace(/<\/span>/gi, '');
				PushResult(self.Params.ID, { Msg: msg, Type: 0, Dir: 0, MsgId: new Date().getTime(), MsgStatus: -1, Receive: false, ErrMsg: '' })
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
				let from = self.Params.Name;
				let msgs = msgInfo.Msg
				msgs = msgs.replace(/<img.*?(?:>|\/>)/gi, '[图片]');
				switch (type) {
					case 2: msgs = '已发送文件' + msg; break;
					case 4: msgs = '推荐了' + msg.split('-')[1]; break;
				}
				System.Ipc.Send('index', JSON.stringify({ IpcCom: "SendQMsg", GroupId: self.Params.ID, MsgId: msgInfo.MsgId, Msg: msgs, Type: type, From: from }))
				DB.ExecuteNonQuery(self.Params.MyID, 'INSERT INTO GroupMsg VALUES(@p0, @p1, @p2, @p3, @p4, @p5, @p6)',
					msgInfo.MsgId.toString(), self.Params.MyID, self.Params.ID, type, msgInfo.Msg, 0, '')
			}
			let send = () => {
				WebSockets.Send("SendQMsg", { Type: type, Msg: <string>msg, To: Number(self.Params.ID), MsgId: new Date().getTime() },
					(msg) => {
						if (msg.ErrCode == 0) {
							if (msgInfo) {
								msgInfo.MsgStatus = 1
								DB.ExecuteNonQuery(self.Params.MyID, 'UPDATE GroupMsg SET MsgStatus=@p0 WHERE MsgId=@p1', 1, msgInfo.MsgId.toString())
							}
						} else {
							if (msgInfo) {
								msgInfo.MsgStatus = 2
								DB.ExecuteNonQuery(self.Params.MyID, 'UPDATE GroupMsg SET MsgStatus=@p0 WHERE MsgId=@p1', 2, msgInfo.MsgId.toString())
							}
						}
					}, () => {
						sendErrNum++
						if (sendErrNum == 2) {
							if (msgInfo) {
								msgInfo.MsgStatus = 2
								DB.ExecuteNonQuery(self.Params.MyID, 'UPDATE GroupMsg SET MsgStatus=@p0 WHERE MsgId=@p1', 2, msgInfo.MsgId.toString())
							}
						} else {
							send()
						}
					}, 5000)
			}
			send()
		},
		/**关闭会话 */
		closeSession() {

		},
		// openPersonalFile() {
		// 	System.Open({
		// 		Name: this.Params.FriendInfo.ID + '',
		// 		Text: globalAppInfo.AppName,
		// 		Url: "Page/Params/openPersonalFile.html",
		// 		Size: { Width: 720, Height: 520 },
		// 		Delay: true,
		// 		Param: JSON.stringify(this.Params.memberList.GroupID),
		// 	});
		// },
		/**打开设置 */
		groupData() {
			let self = this;
			let ID = self.Params.ID;
			console.log(this.Params);
			console.log(ID + "-GroupInfo");
			System.Open({
				Name: ID + "-GroupInfo",
				Text: self.Params.Name,
				Url: "Page/groupAction/groupData.html",
				Size: { Width: 724, Height: 524 },
				Delay: true,
				Param: JSON.stringify(this.Params),
			});
		},
		/**初始化监听新公告的字数 */
		valMatch(n: any) {
			let max = 500;
			if (this.AnouncementContent) {
				let len = this.AnouncementContent.length;
				let en: any = [], zh: any = [];
				n.replace(/[^\u4e00-\u9fa5]/gi, (val: any) => {
					en.push(val);
				});
				n.replace(/[\u4e00-\u9fa5]/gi, (val: any) => {
					zh.push(val);
				});
				if (en.length > 0 && zh.length > 0) {
					len = max - Math.ceil(en.length / 3) - zh.length;
				} else if (en.length > 0) {
					len = max - Math.ceil(en.length / 3);
				} else {
					len = max - len;
				}
				console.log(len);
				return len;
			}

		},
		/**发布新公告 */
		publish(announcementNumber: number) {
			let self = this;

			var s = $("#result").html();
			var num = s.replace(/[^0-9]/ig, "");
			if (!self.inputTitle) {
				layer.msg('标题不能为空');
			} else if (self.inputTitle.length >= 30) {
				layer.msg('字数不能超过三十个字');
			} else if (Number(num) > 485) {
				layer.msg('字数最少为十五个字')
			} else {
				if (self.announcementlist.length != 0 && self.numberList.indexOf(self.announcementlist[announcementNumber - 1].number) > -1) {
					self.announcementlist[announcementNumber - 1].head = self.inputTitle;
					self.announcementlist[announcementNumber - 1].content = self.AnouncementContent;
				} else {
					self.announcementNumber = announcementNumber + 1;
					let news = {
						head: self.inputTitle,
						content: self.AnouncementContent,
						number: self.announcementNumber - 1
					};
					self.announcementlist.push(news);
				}

				//console.log(news);
				self.inputTitle = ''; self.AnouncementContent = '';
				self.showeditAnnouncement = !self.showeditAnnouncement;
			}
		},
		MemberSort(groupMemberList: MemberList) {
			let self = this
			let temp = [], temp1: any = [];
			for (let key in groupMemberList) {
				if (groupMemberList[key].MemberID == this.Params.GroupOwnerID) {
					groupMemberList[key].IsAdmin = 2;
					temp.unshift(groupMemberList[key]);
				} else {
					if (groupMemberList[key].IsAdmin == 1) {
						temp.push(groupMemberList[key]);
					} else if (groupMemberList[key].MemberID == this.Params.MyID) {
						temp.push(groupMemberList[key]);
					} else {
						temp1.push(groupMemberList[key])
					}
				}
			}
			self.groupmember = temp.concat(temp1);
			let result = temp.concat(temp1)
			for (let i in result) {
				self.Params.MemberList[result[i].MemberID] = result[i]
			}
		},
		/**编辑公告*/
		editInfo(index: number) {
			let self = this;
			console.log(self.announcementlist);
			self.showeditAnnouncement = !self.showeditAnnouncement;
			self.inputTitle = self.announcementlist[index].head;
			self.AnouncementContent = self.announcementlist[index].content;
			console.log(self.announcementlist[index]);
			if (self.numberList.indexOf(index) < 0) {
				self.numberList.push(index);
			}
		},
		scrollBotton() {
			this.$nextTick(function () {
				let last: any = document.querySelector(".chat-list li:last-child")
				last && last.scrollIntoView()
			})
		}
	},
	watch: {
		AnouncementContent(n, o) {
			$("#result").html('还可以输入' + (this.len - n.length) + '字');
		},
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
		console.log(self.Params);
		self.valMatch(self.AnouncementContent);
		if (!self.Params.MemberList || Object.keys(self.Params.MemberList).length == 0) {
			setTimeout(() => {
				System.Ipc.Send("index", JSON.stringify({ IpcCom: "GetMemberList" }))
			}, 0)
		} else {
			self.MemberSort(self.Params.MemberList)
		}
	}
})
let chatList: any
if (VueGroupChat.Params.UnRead) {
	if (VueGroupChat.Params.UnRead > 25) {
		VueGroupChat.Params.UnRead = 25
	}
	chatList = DB.GetTable(VueGroupChat.Params.MyID,
		'SELECT * FROM GroupMsg WHERE (MyId=@p0 AND GroupId=@p1) OR (MyId=@p1 AND GroupId=@p0) ORDER BY MsgId desc LIMIT @p2',
		VueGroupChat.Params.MyID, VueGroupChat.Params.ID, VueGroupChat.Params.UnRead)
} else {
	chatList = DB.GetTable(VueGroupChat.Params.MyID,
		'SELECT * FROM GroupMsg WHERE (MyId=@p0 AND GroupId=@p1) OR (MyId=@p1 AND GroupId=@p0) ORDER BY MsgId desc LIMIT @p2',
		VueGroupChat.Params.MyID, VueGroupChat.Params.ID, 3)
}
getRecord(chatList, 'chatlist')
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
			PushResult(VueGroupChat.Params.ID, {
				Msg: msg,
				Type: arr[i].Type,
				Dir: arr[i].MyId == VueGroupChat.Params.MyID ? 0 : 1,
				MsgId: Number(arr[i].MsgId),
				MsgStatus: arr[i].MsgStatus,
				Receive: arr[i].MsgStatus == 1 ? true : false,
				ErrMsg: ''
			}, type, true)
		}
		if (VueGroupChat.moreTime > 0 && arr.length < 25) {
			VueGroupChat.lookMore = false
		} else {
			VueGroupChat.lookMore = true
		}
	}
}
function PushResult(userId: number, info: ChatInfo, type?: string, insertType?: boolean) {
	if (info.Type == 3) {
		layer.msg('您发送了一个抖动窗口')
	} else {
		let list = type ? VueGroupChat.historyList : VueGroupChat.chatList
		if (!list[userId]) {
			list[userId] = []
			insertType ? list[userId].unshift(info) : list[userId].push(info)
		} else {
			insertType ? list[userId].unshift(info) : list[userId].push(info)
		}
		type == 'history' ? VueGroupChat.historyList = Object.assign({}, list) : VueGroupChat.chatList = Object.assign({}, list)
	}
	!insertType && new MsgObj(info)
	return info;
}
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
		if (!SendContextMenu[i].Enabled) {
			if (msg && isSelect) {
				SendContextMenu[i].Enabled = true
			} else if (msg && SendContextMenu[i].Key == "全选") {
				SendContextMenu[i].Enabled = true
			} else {
				SendContextMenu[i].Enabled = false
			}
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
	e.preventDefault()
	e.stopPropagation()
	let isSelect = Select()
	for (let i in SendContextMenu) {
		if (!SendContextMenu[i].Enabled) {
			if (isSelect) {
				SendContextMenu[i].Enabled = true
			} else if (SendContextMenu[i].Key == "全选") {
				SendContextMenu[i].Enabled = true
			} else {
				SendContextMenu[i].Enabled = false
			}
		}
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