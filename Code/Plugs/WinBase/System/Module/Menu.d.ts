interface Require {
    (ModuleName: "Menu"): Menu
}
interface Menu {
    Popup(MeunItem: MeunItem): void
    Close(): void
}
/**菜单项配置 */
interface MeunItem {
    /**前景色*/
    FontColor: string

    /**背景色*/
    BgColor: string

    /**经过颜色*/
    HoverColor: string

    /**每项的高度 */
    Height: number

    /**选中项的图标 */
    CheckedIcon?: string

    /**圆角 */
    Radius?: number

    /**禁用项背景颜色 */
    UnableBgColor?: string

    /**禁用项字体颜色 */
    UnableFontColor?: string

    /**弹出的位置 不传则在光标下方弹出 */
    Location?: Point

    /**点击按钮时触发的回调
     * @param Key 点击按钮的key
     * @param Checked 菜单项的Checked状态
     */
    Click: (Key: string, Checked: boolean) => void

    /**菜单项 */
    SubItem: Array<MeunItemConfig>
}
interface MeunItemConfig {
    /**键名 */
    Key?: string

    /**显示的名称 */
    Label?: string

    /**项类型 0分割线 1按钮 2CheckBoxes*/
    Type: number

    /**图标 传递Base64图片信息 支持透明 */
    Icon?: string

    /**右侧的图标 传递Base64图片信息 支持透明 */
    RightIcon?: string

    /**是否启用控件 */
    Enabled?: boolean

    /**Checked初始选中状态 */
    Checked?: boolean

    /**子菜单项 */
    SubItem?: Array<MeunItemConfig>
}