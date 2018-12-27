import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueAdminRecord"
class AdminRecord extends WinBase {
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }
    protected VuePage = VuePage
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
new AdminRecord