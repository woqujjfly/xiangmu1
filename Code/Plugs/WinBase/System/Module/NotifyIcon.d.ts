interface Require {
    (ModuleName: "NotifyIcon"): NotifyIcon
}
/**系统托盘图标 单例模式*/
interface NotifyIcon {
    
    /**显示或隐藏任务栏 传值设置新值*/
    Visible(Value?: boolean): boolean

    /**任务栏鼠标指向时显示的文本 传值设置新值*/
    Text(Value?: string): string

    /**弹出任务栏气泡提示 */
    ShowBalloonTip(Config: ShowBalloonTip): void

    /**点击托盘图标时回调 */
    Click(CallBack: (e: MouseEvent) => void): void
}
interface NotifyIconCreate {
    Text: string
}
interface ShowBalloonTip {
    /**文本内容 */
    BalloonTipText: string
    /**标题 */
    BalloonTipTitle: string
    /**图标类型 */
    BalloonTipIcon: BalloonTipIcon
    /**自动关闭时间 单位秒 */
    TimeOut: number
}
declare enum BalloonTipIcon {
    /**无图标 */
    None = 0,
    /**信息 */
    Info = 1,
    /**警告 */
    Warning = 2,
    /**错误 */
    Error = 3
}