declare namespace IAjax {
    namespace Request {
        /**获取群成员列表 */
        interface GetMemberList extends RequestUserBase {
            /**群ID */
            GroupID: number
        }
    }
}