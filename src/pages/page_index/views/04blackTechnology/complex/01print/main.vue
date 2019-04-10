<template>
    <section>
        <p>说明：1 一开始用的是<code>@media print</code>。并手动将#main_containerd的宽度和@page的宽度设置为一样的。element的table组件，每个列的宽度都是用js算出来的，但是打印时，阻塞页面的进程，所以尽管table的外层容器宽度变了，但是因为js被阻塞了，table的每一列的宽度不会变化，这样就出问题了。</p>
        <p>解决方法是：将tr设为flex，并将宽度手动设为容器宽度(设为100%无效)</p>
        <p>2 后来发现了问题：如果页面中有echarts图表，那么外层容器宽度一旦变化，必须要手动重绘才可以。要重绘的话必须用js来设置宽度并且resize。太麻烦了。所以换一种思路解决问题</p>
        <p>3 不用@media print了。每次打印前计算容器的宽度，容器是多宽，打印的纸张就设定为多宽。这样就可以保证无论是表格、还是echarts图表都不会出现问题了。</p>
        <el-button type="success" size="mini" @click="do_print">打印-small</el-button>
        <br>
        <el-radio-group v-model="pageType">
            <el-radio :label="1">表格</el-radio>
            <el-radio :label="2">charts</el-radio>
            <el-radio :label="3">全部</el-radio>
        </el-radio-group>
        <br>
        <view1 v-if="pageType===1||pageType===3"></view1>
        <view2 v-if="pageType===2||pageType===3" ref="view2"></view2>
    </section>
</template>
<script>
import view1 from '~/pages/page_index/views/02componentInstructions/xTable/table-usage.vue'
import view2 from '~/pages/page_index/views/03pluginDemo/echarts/basic/01line.vue'
export default {
    components: { view1, view2 },
    data() {
        return {
            pageType: 2,
        };
    },
    watch: {
        pageType() {
            if (this.pageType === 2) {
                setTimeout(() => {
                    this.$refs.view2.initChart();
                }, 500);

            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.view2.initChart();
        }, 500);
    },
    methods: {
        do_print(type) {
            let width1 = document.getElementById('main_container').getBoundingClientRect().width;
            let width2 = document.getElementById('sidebar_wrap').getBoundingClientRect().width;
            let width = width1 - width2;
            let oStyle = document.createElement("style");
            oStyle.setAttribute("id", "printstyle");
            oStyle.innerHTML = `
            	#topbar {
            	    display: none;
            	}
            	#main_container {
			        width: ${width}px !important;
            	    height: auto !important;            	    
            	}
            	#sidebar_wrap {
            	    display: none !important;
            	}
            	#content_wrap {
            	    margin: 0 !important;
			        width: ${width}px !important;
            	    
            	}
            	table {
            		width: ${width}px !important;        	        
            	}
            	tr {
            		width: ${width}px !important;	            
    	        }
				@page {
				    size: ${width}px ${width*0.6}px;
				}
            `;
            document.body.appendChild(oStyle);
            // 开个定时器，等一下上面的操作执行完。不然一旦print，所有进程会被阻塞
            setTimeout(() => {
                window.print();
                // 在print期间，一切进程是阻塞的。所以只有打印窗口关掉后，才会执行下面的内容
                document.getElementById('printstyle').remove();
            }, 0);
        }
    }
};
</script>