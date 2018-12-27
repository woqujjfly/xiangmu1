//  import { imports } from "../Module/loader";
import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from './VueLogin'
class Login extends WinBase {
    public VuePage = VuePage;

    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }

    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }

    protected OnResize(): void {
        // throw new Error("Method not implemented.");
    }

    protected OnWindowState(State: "Max" | "Normal"): void {
        // throw new Error("Method not implemented.");
    }

    OnClose(): boolean {
        System.Exit();
        return true
    }
}
let login = new Login
if (login.VuePage.autoLogin) {
    setTimeout(() => {
        login.VuePage.socket()
    }, 1000)
}

// var SavePath = System.SaveFileDialog()
// if (SavePath) {
//     System.DownFile({
//         Url: "http://down1.srkj3.com/ssjh2201.apk",
//         Path: SavePath,
//         Done() {
//             console.log("下载完成")
//         },
//         Progress(CountSize, CurSize, SecSize) {
//             console.log("总大小:" + CountSize)
//             console.log("已下载大小:" + CurSize)
//             console.log("速度:" + SecSize + "k/s")
//         },
//         Error(ex) {
//             console.log("错误:" + ex)
//         }
//     })
// }