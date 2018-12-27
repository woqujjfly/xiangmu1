declare namespace ISocket {
    namespace Request {
        /**退出群 通用回调*/
        interface ExitQ extends RequestBase {
            /**群ID */
            Id: number
        }
        /**创建群 通用回调*/
        interface CreateQ extends RequestBase {
            /**群名称 */
            Name: string

            /**群公告 */
            Notice: string

            /**建群直接邀请的ID列表 */
            IdList: Array<number>

            /**群配置 */
            Config: Config
        }
        interface Config {
            /**允许发言 */
            AllowSay: boolean

            /**群验证 */
            Verify: VerifyEnum
        }
        enum VerifyEnum {
            允许任何人加群 = 0,
            允许管理员邀请,
            允许群员邀请,
            不允许任何人加群 = 100
        }
        /**群踢人 通用回调*/
        interface KickQ extends RequestBase {
            /**群ID */
            Qid: number

            /**用户ID */
            Uid: number
        }
        /**解散群 */
        interface DelQ extends ExitQ {
        }
        /** 加入群 可邀请他人入群 也可自己加入该群 自己加入时UidList传空数组 通用回调 */
        interface JoinQ extends RequestBase {
            /**群ID */
            Qid: number

            /**邀请进群的ID列表 */
            UidList: Array<number>
        }

        /**设置管理员 通用回调 */
        interface SetQAdmin extends RequestBase {
            /**群ID */
            Id: number

            /**成员ID */
            Uid: number

            /**设置或取消管理员 */
            Admin: boolean
        }

        /**修改群名片 通用回调*/
        interface EditQNick extends RequestBase {
            /**群ID */
            Id: number

            /**用户ID */
            Uid: number

            /**群名片 */
            Nick: string
        }

        /**修改群信息 通用回调 未改变数据不提交*/
        interface EditQInfo extends RequestBase {
            /**群ID */
            Id: number

            /**群名称 MaxValueLength = 15*/
            Name: string

            /**群头像 MaxValueLength = 15  MaxArrayLength = 5 MinArrayLength = 1*/
            Photo: Array<string>

            /**群标签 MaxValueLength = 8  MaxArrayLength = 3*/
            Label: Array<string>

            /**群介绍 MaxValueLength = 300*/
            Introduce: string
        }
    }
}
