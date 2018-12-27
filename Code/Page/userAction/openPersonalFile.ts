import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueOpenPersonalFile"
class OpenPersonalFile extends WinBase {
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }
    public VuePage = VuePage;
    private IpcController = new IpcController
    constructor() {
        super()
        let self = this
        System.Ipc.On((msg: string) => {
            let data: IpcI = JSON.parse(msg)
            self.IpcController[data.IpcCom] && self.IpcController[data.IpcCom](data)
        });
    }
    protected OnClose(): boolean {
        return true
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
    [key: string]: (msg: IpcI) => void
    public EditUserInfo(msg: IpcI) {
        openPersonalFile.VuePage.friendInfo = msg.data;
    }
    public ChangefriendG(data: IpcI) {
        delete data.IpcCom;
        openPersonalFile.VuePage.friendInfo.Groups = {};
        for (let key in data) {
            openPersonalFile.VuePage.friendGroups[key] = data[key].Name;
        }
        openPersonalFile.VuePage.friendGroups = Object.assign({}, openPersonalFile.VuePage.friendGroups);
    }
    public FriendGroupList(data: IpcI) {
        delete data.IpcCom
        console.log(data)
        openPersonalFile.VuePage.friendGroups = data.friendGroup;
        openPersonalFile.VuePage.friendList = data.friendList
        openPersonalFile.VuePage.userData = data.userData
        console.log(openPersonalFile.VuePage.friendList)
    }
}
let openPersonalFile = new OpenPersonalFile
