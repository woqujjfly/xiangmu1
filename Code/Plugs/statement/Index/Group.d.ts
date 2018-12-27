/**群列表*/
interface GroupList {
    [key: string]: GroupInfo
}
interface GroupInfo extends SessionInfo {
    /**群ID */
    ID: number

    /**群名称 */
    Name: string

    /**群主ID */
    GroupOwnerID: number

    /**群大小 */
    Size: number

    /**群配置 */
    Config: JSON

    /**群成员 */
    MemberList: MemberList

    /**群介绍 */
    Introduce: string

    /**群图标 */
    GroupHead: string

    /**群创建时间 */
    CreateTime: number

    /**群通知 */
    Notice: string

    /**群标签 */
    Label: string
}
/**群成员列表 */
interface MemberList {
    [key: number]: MemberInfo
}
/**群成员信息 */
interface MemberInfo {
    /**群ID */
    GroupID: number

    /**群成员ID */
    MemberID: number

    /**成员昵称 */
    Nick: string

    /**成员权限 0成员  1管理员*/
    IsAdmin: number

    /**群名片 */
    VisitingCard: string
}
interface MyAndGroupInfo extends GroupInfo {
    /**当前用户的ID */
    MyID: number
}