import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from './VueSearch'
class Search extends WinBase {
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }
    public VuePage = VuePage;
    
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
new Search;
