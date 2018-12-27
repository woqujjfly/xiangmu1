declare namespace IAjax {
    namespace Request {
        /**登录请求参数 */
        interface Login extends RequestBase {
            /**账号ID */
            ID: number

            /**密码 */
            Pass: string

            /**设备类型 0:APP 1:PC*/
            DeviceType: 0 | 1
        }

        /**注册请求参数 */
        interface Register extends RequestBase {
            /**手机号码 */
            Phone: number

            /**密码 */
            Pass: string

            /**昵称 */
            Nick: string

            /**验证码 */
            VCode: number
        }

        /**发送验证码 */
        interface GetVcode extends RequestBase {
            /**手机号码 */
            Phone: number
        }
    }
}