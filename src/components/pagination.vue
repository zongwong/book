<template>
    <div class="pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            total: {
                type: Number,
                required: true
            },
            pageSize: {
                type: Number,
                required: false,
                default: 1
            },
            currentPage: {
                type: Number,
                required: false,
                default: 1
            }
        },
        data () {
            return {};
        },
        methods: {
            currentPageChange(currentPage) {
                this.$emit("page-change", currentPage);
            },
            handleSizeChange(val) {
                this.$emit("size-change", val);
            }
        }
    };
</script>

<style scoped>
    
</style>
