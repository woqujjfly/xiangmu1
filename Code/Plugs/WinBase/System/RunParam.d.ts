
/**启动窗体 参数 */
interface RunParam {
    /**窗体名称 英文 不可重复 */
    Name: string

    /**任务栏中显示的标题 */
    Text: string
    
    /**文件路径 */
    Url: string

    /**窗体尺寸 可选 默认值 800*600 */
    Size?: Size

    /**是否显示在其他窗体之上 */
    TopMost?: boolean

    /**最小窗体尺寸 */
    MinSize?: Size

    /**最大窗体尺寸 */
    MaxSize?: Size

    /**是否为Dialog窗体 */
    Dialog?: boolean

    /**等待页面渲染加载完毕后再显示窗体 */
    Delay?: boolean

    /**是否允许调整窗体大小 */
    Resize?: boolean

    /**窗体传参 */
    Param?: string

    /**窗体位置 */
    Location?: Point

    /**是否显示在任务栏 默认显示 */
    ShowInTaskbar?: boolean
}
interface Point {
    X: number
    Y: number
} 
/**尺寸 */
interface Size {
    /**宽度 */
    Width: number
    /**高度 */
    Height: number
}
declare enum WindowState {
    /**0正常 */
    Normal,
    /**1最小化 */
    Minimized,
    /**2最大化 */
    Maximized
}