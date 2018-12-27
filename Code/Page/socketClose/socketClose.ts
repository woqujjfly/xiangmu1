//  import { imports } from "../Module/loader";
import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from './VueSocketClose'
class SocketClose extends WinBase {
    public VuePage = VuePage;
    constructor() {
        super()
    }

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
        return true
    }
}
new SocketClose