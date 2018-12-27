declare namespace ISocket {
    namespace Response {
        /**退出群 */
        interface ExitQ extends ResponseBase {
            /**群ID */
            Qid: number

            /**用户ID 当Type为100时 UID 为0*/
            Uid: number

            /**退出方式 */
            Type: ExitQEnum
        }
        enum ExitQEnum {
            被踢 = 0,
            主动退出,
            群解散 = 100
        }

        /***创建群 */
        interface CreateQ extends ResponseBase {
            /**群ID */
            Id: number
        }

        /**邀请入群的通知 */
        interface JoinQ extends ResponseBase {
            /**群ID */
            Id: number

            /**ID列表 */
            Uid: Array<number>
        }

        /** 群管理员变更通知 */
        interface SetQAdmin extends ResponseBase {
            /**群ID */
            Id: number

            /**成员ID */
            Uid: number

            /**是否为管理员 */
            Admin: boolean
        }

        /**修改群名片 */
        interface EditQNick extends ResponseBase {
            /**群ID */
            Id: number

            /**用户ID */
            Uid: number

            /**群名片 */
            Nick: string
        }

        /**修改群信息*/
        interface EditQInfo extends ResponseBase {
            /**群ID */
            Id: number

            /**群名称*/
            Name: string

            /**群头像  数组第一个为群封面头像*/
            Photo: Array<string>

            /**群标签 */
            Label: Array<string>

            /**群介绍 MaxValueLength = 300*/
            Introduce: string
        }
    }
}