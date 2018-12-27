interface DownFileConfig extends FileConfig {
    /**
     * 完成时回调
     */
    Done: () => void
}
interface PostFileConfig extends FileConfig {
    /**
     * 完成时回调
     */
    Done: (Html: string) => void

    /**表单名称 */
    PostName: string
}
interface FileConfig {
    /**
         * 要下载的地址
         */
    Url: string

    /**
     * 保存路径
     */
    Path: string

    /**
     * 发生错误时回调 可选项
     * @returns ex 错误信息
     */
    Error?: (ex: string) => void

    /**
     * 进度回调 可选项
     * @returns CountSize 总文件大小 单位字节
     * @returns CurSize 已传输大小 单位字节
     * @returns CountSize 当前速度 单位k/s
     */
    Progress?: (CountSize: number, CurSize: number, SecSize: number) => void
}