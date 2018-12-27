/**公用用户信息 */
interface UserInfoCommon {
    /**用户ID */
    ID: number

    /**用户头像 */
    Headp: string

    /**用户昵称 */
    Nick: string 

    /**用户个性前签名 */
    Vsign: string

    /**vip到期时间 */
    VipOut: number

    /**Vip等级 */
    VipLevel: number

    /**职业 */
    Profession: string

    /**所在地 */
    HomeTown: string

    /**公司 */
    Company: string

    /**手机号 */
    Phone: number

    /**个人说明 */
    PersonalInfo: string

    /**年龄 */
    Age: number

    /**性别 */
    Sex: number

    /**血型*/
    BloodType: string

    /**生日*/
    Birthday: number

    /**学校 */
    School: string
}

interface UserInfo extends UserInfoCommon {
    /**访问服务器的令牌 */
    Token: string

    /**访问数据的令牌 */
    Sign: string
}
/**接受发送的信息 */
interface TParams<T> {
    ErrCode: number
    IpcCom: string
    data: T
}
interface SessionInfo {
    /**是否为好友 */
    IsPerson?: boolean

    /**最后一条消息 */
    LastMsg?: string

    /**发送时间 */
    SendTime?: number

    /**未读条数 */
    UnRead?: number
}
