1 多表联查怎么办？
	一开始，想用sequelize的 belongsTo 等方法。但是查父级时会报错。
	然后，我想到了用程序循环取父级。但这个方法效率太低，被我否决了（可以看 permission.js 中的 inelegentQuery ）。
	最后，我决定手动拼sql。

2 最典型的table查询，可以看 article
	有分页
	实现了模糊查询
	实现了日期范围查询

3 最典型的tree查询，可以看 permission

