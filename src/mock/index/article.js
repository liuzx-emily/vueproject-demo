import Mock from 'mockjs'
// 文章列表
Mock.mock(/\/article\/list.htmls/, 'get', {
    "code": 1,
    "data": [
        { "num": "1", "title": "海军芜湖舰参加突尼斯海军成立60周年国际舰队检阅活动", "publisher": "小明", "time": "1549987200000", "roofPlacement": "0", "audit": "2", "id": "1" },
        { "num": "2", "title": "守好祖国疆域一草一木（强军思想引领新征程）", "publisher": "陈余治", "time": "1549555200000", "roofPlacement": "0", "audit": "1", "id": "2" },
        { "num": "3", "title": "加拿大司法部就孟晚舟案签发授权 华为：对此感到失望", publisher: "快科技", time: "1551628800000", roofPlacement: "0", audit: "0", id: "3", }
    ],
    "count": 2,
});
// 详情
Mock.mock(/\/article\/detail.htmls/, 'get', {
    "code": 1,
    "data": {
        "id": "f7648ce4d1574c0a8686176c2d83cd12",
        "title": "海军芜湖舰参加突尼斯海军成立60周年国际舰队检阅活动",
        "publisher": "小明",
        "time": "1549987200000",
        "audit": "2",
        "reason": "字号太小了",
        "content": "<p><span style=\"font-size: large;\">人民网突尼斯10月18日电 当地时间10月16日，突尼斯海军成立60周年国际舰队检阅活动在突尼斯湾举行，海军第30批护航编队芜湖舰参加海上阅舰式。此次阅舰式是突尼斯海军首次举办的阅舰式。</span></p><p><span style=\"font-size: large;\">上午11时许，在领航舰突尼斯海军“西法克斯”号近海巡逻舰的引领下，突尼斯与来自中国、英国、法国、意大利等国家的20余艘海军舰艇组成单纵队，向指定海域航渡。</span></p><p><span style=\"font-size: large;\">11时30分，海上阅舰式正式开始。检阅舰“朱古达”号近海巡逻舰驶入检阅方阵，参加受阅的多国海军舰艇与检阅舰对向而行，突尼斯两架直升机位受阅舰艇上空巡航。按照突方要求参加阅舰式的舰艇悬挂代满旗，海军芜湖舰官兵军容严整、精神抖擞，位甲板分区列队，以标准的军礼向检阅舰致敬。突尼斯国防部长法尔哈特·奥沙尼与各国代表团团长一起乘坐检阅舰，对受阅舰艇进行了检阅。阅舰式开始前，突尼斯总统埃塞卜西位总统府礼节性集体会见各国代表团团长。</span></p><p><span style=\"font-size: large;\">据悉，海军芜湖舰于10月7日从亚丁湾西部海域起航赴突尼斯，先后穿越曼德海峡、苏伊士运河，进入地中海，于10月14日抵达突尼斯拉古莱特港，中国驻突尼斯大使馆为芜湖舰举行了简短的欢迎仪式，中国驻突大使汪文斌登临芜湖舰检阅仪仗队，华人华侨、中资机构代表等随后登舰参观。突尼斯海军成立60周年庆祝活动于15日开幕，中方代表团团长许海华少将应邀出席了突方组织的研讨会、参观交流及海上阅舰式等活动。</span></p><p><span style=\"font-size: large;\">芜湖舰赴突尼斯参加阅舰式期间，第三十批护航编队邯郸舰和东平湖舰继续在亚丁湾执行护航任务。（张海龙 来永雷）</span></p>",
        "list": [
            { id: "1", name: "附件1.txt" },
            { id: "2", name: "附件2.txt" },
            { id: "3", name: "附件3.txt" },
        ]
    },
    "description": ""
});
// 附件上传
Mock.mock(/\/article\/upload.htmls/, 'post', {
    "code": 1,
});
// 置顶
Mock.mock(/\/article\/top.htmls/, 'post', {
    "code": 1,
});
// 删除
Mock.mock(/\/article\/delete.htmls/, 'post', {
    "code": 1,
    "data": "0DK2ODLDMCMWJ12392O",

});