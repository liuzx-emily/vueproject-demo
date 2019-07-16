<template>
	<section>
		<columnBox :chstitle="box1.name" :englisthtitle="box1.ename" :url="box1.url">
			<!-- maxCount 最多展示多少篇文章，默认为0（不限制数量）
             maxTitleLength 标题最大长度，默认为30 -->
			<articleList :list="box1.list" :maxCount="8" />
		</columnBox>
		<columnBox :chstitle="box2.name" :englisthtitle="box2.ename" :url="box2.url">
			<articleList :list="box2.list" :maxCount="2" />
		</columnBox>
		<columnBox :chstitle="box3.name" :englisthtitle="box3.ename" :url="box3.url">
			<articleList :list="box3.list" />
		</columnBox>
		<columnBox :chstitle="box4.name" :englisthtitle="box4.ename" :url="box4.url">
			<articleList :list="box4.list" :maxCount="2" />
		</columnBox>
		<columnBox :chstitle="box5.name" :englisthtitle="box5.ename" :url="box5.url" style="width:100%">
			<section style="background:#eee;padding:10px;">
				自定义栏目
			</section>
		</columnBox>
	</section>
</template>
<script>
import articleList from '../modules/articleList.vue'
import columnBox from '../modules/indexPage_columnBox.vue'
export default {
	components: { columnBox, articleList },
	data() {
		let list = [
			{ id: "1", title: "文章1", time: 1551236004594 },
			{ id: "2", title: "文章2", time: 1551236004594 },
			{ id: "3", title: "文章3名字很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长", time: 1551236004594 },
			{ id: "4", title: "文章4", time: 1551236004594 },
			{ id: "5", title: "文章5", time: 1551236004594 },
			{ id: "6", title: "文章6", time: 1551236004594 },
			{ id: "7", title: "文章7", time: 1551236004594 },
			{ id: "8", title: "文章8", time: 1551236004594 },
			{ id: "9", title: "文章9", time: 1551236004594 },
			{ id: "10", title: "文章10", time: 1551236004594 },
		];
		return {
			box1: {
				url: "#/list/1",
				name: "栏目1",
				ename: "column-one",
				list: list,
			},
			box2: {
				url: "#/list/2",
				name: "栏目2",
				ename: "column-two",
				list: list,
			},
			box3: {
				url: "#/list/3",
				name: "栏目3",
				ename: "column-three",
				list: list,
			},
			box4: {
				url: "#/list/4",
				name: "栏目4",
				ename: "column-four",
				list: list,
			},
			box5: {
				url: "#/list/5",
				name: "栏目5",
				ename: "column-five",
			}
		}
	},
	mounted() {
		// this.getData();
	},
	methods: {
		getData() {
			this.xaxios({
				url: BASE_PATH + '/esi/front/index.htmls',
				params: { row: 8 }
			}).then(res => {
				if (res.code == 1) {
					this.box1 = res.data[0];
					this.box2 = res.data[1];
					this.box3 = res.data[2];
				}
			}).catch(error => { });
		}
	}
};
</script>