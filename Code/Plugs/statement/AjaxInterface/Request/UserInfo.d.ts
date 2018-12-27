declare namespace IAjax {
    namespace Request {
        /**修改密码 */
        interface ModifyPass extends RequestUserBase {
            /**用户ID */
            ID: number

            /**原密码 */
            OldPass: string

            /**新密码 */
            NewPass: string
        }
        /**获取用户信息 */
        interface GetUserInfo extends RequestUserBase {
            /**其他用户ID */
            ID: number
        }
    }
}