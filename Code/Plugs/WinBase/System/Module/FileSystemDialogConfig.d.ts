/**选择文件夹对话框 */
interface DirDialogConfig {
    /**
     * 设置默认选中的路径
     */
    SelectedPath?: string

    /**
     * 设置在对话框中树视图控件的上方显示的说明性文本
     */
    Description?: string

    /**
     * 设置在从其开始浏览的根文件夹
     */
    RootFolder?: string
}
/**选择文件对话框 */
interface FileDialogConfig {
    /**
     * 设置默认选中的路径
     */
    FileName?: string

    /**
     * 设置限制文件的类型
     * 例如:文本文件(*.txt)|*.txt|所有文件(*.*)|*.*
     * 默认:所有文件(*.*)|*.*
     */
    Filter?: string

    /**
     * 设置文件对话框标题
     */
    Title?: string
}
/**打开文件对话框 */
interface OpenFileDialogConfig extends FileDialogConfig {

    /**
     * 指示对话框是否允许选择多个文件
     * 默认为false
     */
    Multiselect?: boolean
}
/**保存文件对话框 */
interface SaveFileDialogConfig extends FileDialogConfig {

    /**
     * 如果文件已存在 是否提醒用户覆盖此文件
     */
    OverwritePrompt?: boolean
}