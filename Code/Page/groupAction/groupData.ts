import WinBase from "../../Plugs/WinBase/WinBase";
import VuePage from "./VueGroupData";
class GroupData extends WinBase {
	protected Activated(): void {
		// throw new Error("Method not implemented.");
	}
	protected Deactivate(): void {
		// throw new Error("Method not implemented.");
	}
	public VuePage = VuePage;

	private IpcController = new IpcController();
	constructor() {
		super();
		let self = this
		System.Ipc.On((msg: string) => {
			let data: IpcI = JSON.parse(msg)
			self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
		});
	}
	protected OnClose(): boolean {
		// throw new Error("Method not implemented.");
		return true;
	}
	protected OnResize(): void {
		// throw new Error("Method not implemented.");
	}
	protected OnWindowState(State: "Max" | "Normal"): void {
		// throw new Error("Method not implemented.");
	}
}
class IpcController {
	[key: string]: (msg: IpcI) => void;
	public MemberList(msg: IpcI) {
		console.log(msg);
		// groupData.VuePage.Params.MemberList = groupData.VuePage.MemberSort();
		// groupData.VuePage.Params.MyID = msg.MyID;
		// groupData.VuePage.Params = Object.assign({}, groupData.VuePage.Params)
		console.log(groupData.VuePage.Params);
	}
	public ExitMemberList(msg: IpcI) {
		Me.Close(true);
	}
	public ChangeMemberList(msg: IpcI) {
		delete groupData.VuePage.Params.MemberList[msg.UserID];
		groupData.VuePage.Params = Object.assign({}, groupData.VuePage.Params);
	}
	public InviteList(msg: IpcI) {
		console.log(msg);
		groupData.VuePage.Params.MemberList = Object.assign(
			groupData.VuePage.Params.MemberList,
			msg.data
		);
		groupData.VuePage.Params = Object.assign({}, groupData.VuePage.Params)
		console.log(groupData.VuePage.Params);
	}
}
let groupData = new GroupData();
