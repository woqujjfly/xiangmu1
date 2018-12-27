/**好友分组 */
interface FriendGroup {
	[key: string]: {
		/**好友分组ID */
		ID: number;

		/**好友分组名称 */
		Name: string;

		/**好友列表 */
		List: FriendList;

		/**在线人数 */
		OnlineNum: number;
	};
}
/**好友列表 */
interface FriendList {
	[key: string]: FriendInfo;
}
/**好友信息 */
interface FriendInfo extends UserInfoCommon, SessionInfo {
	/**好友备注 */
	Remark: string;

	/**好友分组ID */
	FriendGroupID: number;

	/**在线状态 */
	OnlineType: number;
}
/**查看个人资料 */
interface PersonalData extends FriendInfo {
	/**自己ID */
	UserId: number;

	/**好友分组 */
	Groups: { [ID: string]: string };
}
interface MyAndUserInfo extends FriendInfo {
	/**令牌 */
	Token: string

	/**当前用户的ID */
	MyID: number

	/**当前用户的昵称 */
	MyNick: string

	/**其他操作 */
	Action?: string

	/**分享 */
	Share?: { ShareID: number, ShareNick: string }
}