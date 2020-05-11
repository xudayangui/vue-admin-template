<template>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="cancel" :model="model">
        <div class="dialog-content">
            {{model}}
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'dialogExample',
    data() {
        return {
            model:{}
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
       cancel() {
            this.$emit('dialog-cancel');
       }
    },
}
</script>