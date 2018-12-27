import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueGroupshare"
class GroupShare extends WinBase {
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
        return true
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
    public ContactGroup(msg: IpcI) {
        groupshare.VuePage.groupInfo.contactGroup = msg.data;
    }
}
let groupshare = new GroupShare()

