<template>
    <section :id="editorId"></section>
</template>
<script>
import xTools from '~/utils/xTools.js'
import { toolbars } from './data_ueditor.js'
export default {
    data() {
        return {
            editorId: 'xEditor' + xTools.guid(),
            editor: null,
        }
    },
    mounted() {
        let option = {
            toolbars: [toolbars],
            autoHeightEnabled: true,
            autoFloatEnabled: true
        };
        this.editor = UE.getEditor(this.editorId, option);
    }
};
</script>