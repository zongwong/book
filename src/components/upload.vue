<template>
<div>

    <el-upload
        action="/api/uploader/image"
        :data="{token:token}"
        name="image"
        :auto-upload="true"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :file-list="fileList"
    >
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "upload",
        props: {
            limit: {
                type: Number
            },
            fileList: {
                type: Array,
                required: false
            }
        },
        data () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
            };
        },
        created: function () {
            
        },
        computed: {
            ...mapState({
                token:'token'
            })
        },
        methods: {
            handleRemove(file, fileList) {
                this.$emit('uploadfile',{file:fileList});
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleProgress(event, file, fileList) {
            },
            beforeUpload(file) {
            },
            onSuccess(response, file, fileList){
                this.$emit('uploadfile',{file:response.data.imageurl});
            }
        }
    };
</script>

<style scoped>

</style>
