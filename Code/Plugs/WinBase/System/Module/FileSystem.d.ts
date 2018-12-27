interface FileSystem {
    /**
     * 获取文件大小
     * @param Path 文件路径
     * @returns 返回长度字节 不存在或不可读则返回null
     */
    GetFileSize(Path: string): number | null

    /**
     * 读取文件内容
     * @param Path 文件路径
     * @returns 返回文件内容 不存在或不可读则返回null
     */
    ReadAllText(Path: string): string | null
}