declare namespace IAjax {
    namespace Response {
        /**获取群列表 */
        interface GetGroupList extends ResponseBase {
            List: Array<GroupInfo>
        }

        /**获取群成员列表 */
        interface GetMemberList extends ResponseBase {
            List: Array<MemberInfo>
        }
        /**创建群 */
        interface CreateGroup extends ResponseBase {
            /**群ID */
            GroupID: number

            /**群名称 */
            Name: string

            /**群主ID */
            GroupOwnerID: number

            /**群大小 */
            Size: number

            /**群配置 */
            Config: JSON

            /**群通知 */
            Notice: string

            /**群成员列表 */
            MemberList: GetMemberList
        }
        /**退出群 */
        interface leaveGroup extends ResponseBase {
            /**群ID */
            GroupID: number

            /**成员ID */
            MemberID: number
        }
        /**搜索群 */
        interface SearchGroupList extends ResponseBase {
            List: Array<GroupInfo>
        }
    }
}