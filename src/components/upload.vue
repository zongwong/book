<template>
<div>
    <!-- <el-upload
        class="avatar-uploader"
        :limit="limit"
        :list-type="listType"
        :multiple="multiple"
        :name="fileName"
        :action="uploadUrl"
        :reviewImgs="reviewImgs"
        :show-file-list="true"
        :file-list="this.fileList"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :before-upload="beforeUpload">
        <i class="el-icon-plus"></i>
    </el-upload> -->
    <el-upload
        action=""
        :auto-upload="true"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :http-request="httpRequest"
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
                dialogVisible: false
            };
        },
        created: function () {
            
        },
        computed: {
            
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
                this.$emit('uploadfile',{file:file});
            },
            onUpload() {
                this.$refs.upload.submit();
            },
            httpRequest() {

            }
            
        }
    };
</script>

<style scoped>

</style>
