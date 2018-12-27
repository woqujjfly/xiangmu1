declare namespace ISocket {
    namespace Response {
        /**响应规范 */
        interface ResponseBase {
            Com: string
            ErrCode: number
            ErrMsg: string
        }
    }
}