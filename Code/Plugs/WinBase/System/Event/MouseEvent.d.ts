/**鼠标事件 */
interface MouseEvent {
    /**获取曾按下的是哪个鼠标按钮 */
    Button: MouseEvent_MouseButtons
    /**获取按下并释放鼠标按钮的次数 */
    Clicks: 0 | 1
    /**获取鼠标轮已转动的制动器数的有符号计数乘以 WHEEL_DELTA 常数 */
    Delta: number
    /**获取鼠标在产生鼠标事件时的 x 坐标 */
    X: number
    /**获取鼠标在产生鼠标事件时的 y 坐标 */
    Y: number
}
declare enum MouseEvent_MouseButtons {
    None,
    /**左键按下 */
    Left = 1048576,
    /**右键按下 */
    Right = 2097152,
    /**中键按下 */
    Middle = 4194304,

    XButton1 = 8388608,

    XButton2 = 16777216
}