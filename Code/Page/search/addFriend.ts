import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueAddFriend"
class AddFriend extends WinBase {
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
    public FriendGroup(msg: IpcI) {
        delete msg.IpcCom
        addFriend.VuePage.friendGroup = msg;
    }
    public ChangefriendG(msg: IpcI) {
        delete msg.IpcCom
        addFriend.VuePage.friendGroup = msg
    }
}
let addFriend = new AddFriend
