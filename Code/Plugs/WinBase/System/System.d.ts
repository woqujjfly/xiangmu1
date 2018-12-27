interface System {
    /**打开一个新窗口 */
    Open: (RunParam: RunParam) => void

    /**直接退出程序 不会触发Closing */
    Exit: () => void

    /**获取系统模块 */
    Require: Require

    /**md5 */
    md5(code: string): string

    /**存储临时数据 */
    GlobalVal: string

    /**发送消息 */
    Ipc: {
        /**监听发送的消息 */
        On(callback: (msg: string) => void): void
        /**
         * @param name 窗体名称
         * @param msg 发送消息
        */
        Send(name: string, msg: string): void

        /**
         * @param msg 发送消息
        */
        Send(msg: string): void
    }

    /**查找指定标题的进程句柄 */
    FindProc(title: string): number

    // /**查找当前打开的窗口名称 可进行窗口操作 */
    // FindWinObj(name: string): Me | undefined

    /**查找当前打开的窗口名称 */
    FindWinBool(name: string): boolean

    /**获取所有进程 */
    GetProcs(): Array<{ Name: string, Id: number }>

    /**创建互斥锁 */
    CreateMutex(key: string): void

    /**查找互斥锁是否存在 */
    GetMutex(key: string): boolean

    /**删除互斥锁 */
    DelMutex(key: string): void

    /**
     * 打开文件夹选择器
     * @param Config 配置
     * @returns 用户确认后返回路径 取消后返回null
     */
    OpenDirDialog(Config?: DirDialogConfig): string | null

    /**
     * 打开文件选择器
     * @param Config 配置
     * @returns 用户确认后返回路径
     * @returns 若允许多选则返回路径的数组
     * @returns 取消后返回null
     */
    OpenFileDialog(Config?: OpenFileDialogConfig): string | Array<string> | null

    /**
     * 打开文件保存选择器
     * @param Config 配置
     * @returns 用户确认后返回路径 取消后返回null
     */
    SaveFileDialog(Config?: SaveFileDialogConfig): string | null

    /**
     * 注册快捷键
     * 注册成功返回热键ID 失败返回null
     * 若注册时的页面被关闭 热键将自动注销
     */
    RegHotKey(Config: RegHotKeyConfig): number | null

    /**
     * 注销热键
     * 返回成功或失败
     */
    UnRegHotKey(Id: number): boolean

    /**
     * 下载文件
     * @param Config 启动参数
     */
    DownFile(Config: DownFileConfig): void

    /**
     * 上传文件
     * @param Config 启动参数
     */
    PostFile(Config: PostFileConfig): void

    /**
     * 使用默认浏览器打开指定Url
     * @param Url Url地址
     * @returns 返回成功或失败
     */
    OpenUrl(Url: string): boolean

    /**
     * 打开文件或文件夹
     * @param Path 文件或文件夹路径
     * @returns 返回成功或失败
     */
    OpenFileOrDir(Path: string): boolean

    /**
     * 定位到文件或文件夹
     * @param Path 文件或文件夹路径
     * @returns 返回成功或失败
     */
    SelectFileOrDir(Path: string): boolean

    /**文件操作相关类 */
    FileSystem: FileSystem

    /**添加开机启动 返回成功或失败 */
    AddStartup(): boolean

    /**删除开机启动 返回成功或失败 */
    DelStartup(): boolean
}
interface Me {

    /**获取 窗体传参 */
    readonly Param?: string

    /**获取 窗体名称 */
    readonly Name: string

    /**获取 是否为活动窗体 */
    readonly Focused: boolean

    /**获取或设置 窗体当前状态 */
    WindowState: WindowState

    /**获取或设置 任务栏标题栏文字 */
    Text: string

    /**获取或设置 窗体是否显示在最前 */
    TopMost: boolean

    /**获取或设置 窗体X坐标值 */
    Left: number

    /**获取或设置 窗体Y坐标值 */
    Top: number

    /**获取或设置 窗体高度 */
    Height: number

    /**获取或设置 窗体宽度 */
    Width: number

    /**获取或设置 是否显示在任务栏 */
    ShowInTaskbar: boolean

    /**获取或设置 窗体的不透明度级别 范围:0-1*/
    Opacity: number

    /**获取或设置 是否显示该窗口 */
    Visible: boolean

    /**关闭当前窗口 Force参数为true则直接关闭窗体不触发Closing事件 */
    Close: (Force?: boolean) => void

    /**显示窗口 */
    Show(): void

    /**隐藏窗口 */
    Hide(): void

    /**闪动任务栏高亮提醒 */
    FlashWindow(): void

    /**激活窗体并给予它焦点 */
    Activate(): void
}
interface Window {
    Synchronous: Synchronous
    SystemReady: () => void
    imgLoad: (str: HTMLElement) => void
    isBottom: boolean
}
declare var System: System
declare var Me: Me

interface Date {
    Format: (str: string, timestamp?: number) => string;
}