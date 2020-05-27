<template>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="cancel" @open="dlgOpen" width="600px" :lock-scroll="false" :append-to-body="true">
        <div class="dialog-content">
            <el-form label-width="120px" ref="form" :model="model" :rules="rules">
                <el-form-item  prop="name" label="用户名：">
                    <el-input size="small" v-model="model.name" class="wh200"></el-input>
                </el-form-item>
                <el-form-item prop="status" label="权限类别：">
                    <el-select size="small" class="wh200" v-model="model.status" >
                        <el-option label="超级管理员" :value="0"/>
                        <el-option label="管理员" :value="1"/>
                        <el-option label="开发人员" :value="2"/>
                        <el-option label="客服人员" :value="3"/>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button size="small" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'dialogExample',
    props:["copyModel","dialogVisible"],
    data() {
        return {
            model:{
                userName:"",
                status:"",
            },
            rules:{

            }
        }
    },
    methods: {
        cancel() {
                this.$emit('dialog-cancel');
        },
        dlgOpen(){
            this.model = Object.assign({},this.copyModel)
        }
    },
}
</script>
<style scoped>
.wh200 {
    width: 200px;
}
</style>
