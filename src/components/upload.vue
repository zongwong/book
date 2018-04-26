<template>
<div>

    <el-upload
        :action="action"
        :data="{token:token}"
        name="image"
        :auto-upload="true"
        :list-type="listType"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :file-list="fileList"
        :class="className"
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
    import config from '../utils/global';
    export default {
        name: "upload",
        props: {
            limit: {
                type: Number
            },
            fileList: {
                type: Array,
                required: false
            },
            listType: {
                type: String,
                required: false,
                default: 'picture-card'
            },
            className: {
                type: String,
                required: false
            }
        },
        data () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                action:config.host+'/uploader/image'
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

<style lang="scss" >

</style>
