interface Require {
    (ModuleName: "Db"): Db
}
/**
 * 数据库插件
 * 支持参数化
 * 参数化传递 @p0 @p1 @p2 ...
 */
interface Db {
    /**
     * 执行Sql 并返回影响的行数
     * @param Id 用户Id
     * @param Sql Sql语句
     * @param Param 参数化字段
     */
    ExecuteNonQuery(Id: number, Sql: string, ...Param: Array<string | number>): number

    /**
     * 查询Sql 并返回第一行第一列的数据
     * @param Id 用户Id
     * @param Sql Sql语句
     * @param Param 参数化字段
     */
    ExecuteScalar(Id: number, Sql: string, ...Param: Array<string | number>): string | number

    /**
     * 查询Sql 并返回数据表
     * @param Id 用户Id
     * @param Sql Sql语句
     * @param Param 参数化字段
     */
    GetTable(Id: number, Sql: string, ...Param: Array<string | number>): Array<Dict<string | number>>
}