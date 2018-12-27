
export default abstract class WinBase {
    protected abstract VuePage: any
    constructor() {
        document.addEventListener("EventsResize", (e) => { this.OnResize() })
        document.addEventListener("EventsMax", (e) => { this.OnWindowState("Max") })
        document.addEventListener("EventsNormal", (e) => { this.OnWindowState("Normal") })
        document.addEventListener("Activated", (e) => { this.Activated() })
        document.addEventListener("Deactivate", (e) => { this.Deactivate() })
        window.Synchronous = <any>{}
        window.Synchronous.Closing = this.OnClose.bind(this)
    }

    /**关闭窗体时触发 返回false将阻止窗口关闭 */
    protected abstract OnClose(): boolean

    /**窗体改变大小时触发 */
    protected abstract OnResize(): void

    /**窗口状态 最大化或者默认大小*/
    protected abstract OnWindowState(State: "Max" | "Normal"): void

    /**当使用代码激活或用户激活窗体时发生 */
    protected abstract Activated(): void

    /**当窗体失去焦点并不再是活动窗体时发生 */
    protected abstract Deactivate(): void

    /**关闭当前窗口 Force参数为true则直接关闭窗体不触发Closing事件 */
    protected Close(Force?: boolean): void {
        Me.Close(Force)
    }
}