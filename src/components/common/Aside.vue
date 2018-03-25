<template>
  <div class="aside">
    <div class="userInfoBox">
        <div class="avatar">
            <img src="../../assets/image/book.png" alt="">
            <i class="icon_sex"></i>
        </div>
        <p class="name">打打</p>
        <p>气温气温</p>
    </div>
    <div class="aside_nav">
        <el-menu
            :default-active="activeIndex"
            router
            >
            <el-menu-item index="/center/info">
                <i class="el-icon-info"></i>
                <span slot="title">个人资料</span>
            </el-menu-item>
            <el-submenu index="/center/info">
                <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>我的发布</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/center/book"><i class="el-icon-menu"></i>二手书籍</el-menu-item>
                    <el-menu-item index="/center/note"><i class="el-icon-menu"></i>二手笔记</el-menu-item>
                    <el-menu-item index="/center/house"><i class="el-icon-menu"></i>房屋租赁</el-menu-item>
                    <el-menu-item index="/center/community"><i class="el-icon-menu"></i>社团交流</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </el-submenu>

            <el-menu-item index="/center/message">
                <i class="el-icon-message"></i>
                <span slot="title">我的消息</span>
            </el-menu-item>
            <el-menu-item index="/center/history">
                <i class="el-icon-tickets"></i>
                <span slot="title">历史评价</span>
            </el-menu-item>
            <el-menu-item index="/center/order">
                <i class="el-icon-goods"></i>
                <span slot="title">交易记录</span>
            </el-menu-item>
        </el-menu>



        <!-- <router-link to="/center/"><p>个人资料</p></router-link>
        <router-link to="/center/"><p>我的发布</p></router-link>
        <router-link to="/center/"><p>我的消息</p></router-link>
        <router-link to="/center/history"><p>历史评价</p></router-link>
        <router-link to="/center/order"><p>交易记录</p></router-link> -->
        <!-- <span></span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
        activeIndex:this.$route.path
    };
  },
};
</script>

<style lang="scss" scoped>
.aside{
    width: 220px;
    box-sizing: border-box;
    border:1px solid #eee;
    color: #7d7d7d;
    font-size: 17px;
    margin-right: 50px;
    .userInfoBox{
        background: #f2fbee;
        padding-bottom: 30px;
    }
}
.aside_nav{
    padding: 15px 0 60px;
    p{
        margin: 34px 0;
        &.on{
            color: #7cd958;
        }
    }
}
</style>