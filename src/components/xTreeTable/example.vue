<template>
    <div class="app-container">
        <p>控制列：内含加号或减号，控制展开与收缩</p>
        <p>如果columns为0，那么会自动在最前面加一个序号列，并且把这个序号列作为"控制列"</p>
        <p>如果columns不为0，那么会自动取columns中的第一列作为"控制列"</p>
        <p>但是，columns为0时出现的序号列不好看。所以columns不要为0。</p>
        <xTreeTable :data="data" :columns="columns" border>
            <el-table-column prop="timeLine" label="列可以直接写在这里"></el-table-column>
        </xTreeTable>
    </div>
</template>
<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import xTreeTable from '~/components/xTreeTable/index.vue';
export default {
    name: 'TreeTableDemo',
    components: { xTreeTable },
    data() {
        return {
            columns: [{
                    text: '事件',
                    value: 'event',
                    width: 200
                },
                {
                    text: '备注',
                    value: 'comment'
                }
            ],
            // 数据格式必须为 children 格式
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
                    children: [{
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
                            children: [{
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
                                    children: [{
                                            id: 7,
                                            event: '事件7',
                                            timeLine: 50,
                                            comment: '无',
                                            children: [{
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
}
</script>