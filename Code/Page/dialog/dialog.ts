import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from "./VueDialog"
class Dialog extends WinBase {
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
    }
    // throw new Error("Method not implemented.");
    public VuePage = VuePage;
    protected OnClose(): boolean {
        return true
        // throw new Error("Method not implemented.");
    }
    protected OnResize(): void {
        // throw new Error("Method not implemented.");
    }
    public OnWindowState(State: "Max" | "Normal"): void {
        // throw new Error("Method not implemented.");
    }
}
new Dialog
