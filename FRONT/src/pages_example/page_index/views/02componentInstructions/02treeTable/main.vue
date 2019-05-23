<style>
</style>
<template>
    <section>
        <el-card>
            <p>1 属性中不能包含<code>children</code> 因为新版本的element（v2.7.0 更新于2019-03-28），table组件支持树形结构，只要他检测到存在children属性，就会认为这是一个树形数据并相应渲染。</p>
            <p>2 样式控制和xTable一样：传递<code>color</code>、<code>size</code>、<code>align</code></p>
        </el-card>
        <el-card>
            <div slot="header">
                为什么不用新版本element默认支持的树形table？
            </div>
            <!-- card body -->
            <p>因为他的实现非常简陋，不支持默认展开节点数据。一开始所有节点都是收缩的。</p>
            <p>这就导致：想要编辑一个层级很深的元素的话，你需要一层层点开。编辑成功后页面自动刷新，所有节点又全部收起来了。你想查看效果，又得一层层点开</p>
        </el-card>
        <treeTable :data="data" :controlColumn="controlColumn" :expandAll="true">
            <el-table-column prop="timeLine" label="timeLine"></el-table-column>
            <el-table-column prop="comment" label="评论"></el-table-column>
        </treeTable>
    </section>
</template>
<script>
export default {
    data() {
        return {
            controlColumn: {
                label: '名称',
                prop: 'event',
                width: ''
            },
            // 数据格式必须为 child 格式
            data: [{
                    id: 0,
                    event: '事件1',
                    timeLine: 50,
                    comment: '无'
                },
                {
                    id: 1,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    child: [{
                            id: 2,
                            event: '事件2',
                            timeLine: 10,
                            comment: '无'
                        },
                        {
                            id: 3,
                            event: '事件3',
                            timeLine: 90,
                            comment: '无',
                            child: [{
                                    id: 4,
                                    event: '事件4',
                                    timeLine: 5,
                                    comment: '无'
                                },
                                {
                                    id: 5,
                                    event: '事件5',
                                    timeLine: 10,
                                    comment: '无'
                                },
                                {
                                    id: 6,
                                    event: '事件6',
                                    timeLine: 75,
                                    comment: '无',
                                    child: [{
                                            id: 7,
                                            event: '事件7',
                                            timeLine: 50,
                                            comment: '无',
                                            child: [{
                                                    id: 71,
                                                    event: '事件71',
                                                    timeLine: 25,
                                                    comment: 'xx'
                                                },
                                                {
                                                    id: 72,
                                                    event: '事件72',
                                                    timeLine: 5,
                                                    comment: 'xx'
                                                },
                                                {
                                                    id: 73,
                                                    event: '事件73',
                                                    timeLine: 20,
                                                    comment: 'xx'
                                                }
                                            ]
                                        },
                                        {
                                            id: 8,
                                            event: '事件8',
                                            timeLine: 25,
                                            comment: '无'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};
</script>