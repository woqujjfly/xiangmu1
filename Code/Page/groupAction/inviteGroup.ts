import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueInviteGroup"
class InviteGroup extends WinBase {
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }
    public VuePage = VuePage;
    private IpcController = new IpcController()
    constructor() {
        super()
        let self = this
        System.Ipc.On((msg: string) => {
            let data: IpcI = JSON.parse(msg)
            self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
        });
    }
    protected OnClose(): boolean {
        return true;
        // throw new Error("Method not implemented.");
    }
    protected OnResize(): void {
        // throw new Error("Method not implemented.");
    }
    protected OnWindowState(State: "Max" | "Normal"): void {
        // throw new Error("Method not implemented.");
    }
}
class IpcController {
    [key: string]: (msg: any) => void;
    public friendL(msg: IpcI) {
        // delete msg.IpcCom;
        // inviteGroup.VuePage.friendInfo = 0;
        // inviteGroup.VuePage.groupInfo = msg;
        inviteGroup.VuePage.shareGroupId = msg.Qid;
        // inviteGroup.VuePage.groupMember = msg.groupMember;
        // console.log(inviteGroup.VuePage.groupMember)
    }
}
let inviteGroup = new InviteGroup;