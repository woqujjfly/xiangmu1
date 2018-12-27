declare namespace IAjax {
    namespace Request {
        /**登陆后才能请求的接口 */
        interface RequestUserBase {
            /**登陆令牌 */
            T: string
        }
        /**不需要登陆可以请求的接口 */
        interface RequestBase {
        }
    }
}