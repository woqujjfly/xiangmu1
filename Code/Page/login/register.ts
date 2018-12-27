//  import { imports } from "../Module/loader";
import WinBase from "../../Plugs/WinBase/WinBase"
import VuePage from './VueRegister'
class Register extends WinBase {
    constructor(){
        super()
    }
    protected Activated(): void {
        // throw new Error("Method not implemented.");
    }
    protected Deactivate(): void {
        // throw new Error("Method not implemented.");
    }
    protected VuePage = VuePage;
    
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
new Register