<template>
  <div class="aside">
    <div class="userInfoBox">
        <div class="avatar">
            <img v-if="userInfo.headimgurl" :src="headimgurl" alt="头像">
            <i class="icon_sex" :class="{'icon_man':userInfo.sex==1}"></i>
        </div>
        <p class="name">{{userInfo.nickname}}</p>
        <p>{{$t('show.graduated')}}：{{userInfo.graduate_school}}</p>
    </div>
    <div class="aside_nav">
        <el-menu
            :default-active="$route.path"
            :router="true"
            >
            <el-menu-item index="/center/info">
                <i class="el-icon-info"></i>
                <span slot="title">{{$t("navs.userinfo")}}</span>
            </el-menu-item>
            <el-menu-item index="/center/wallet">
                <i class="el-icon-info"></i>
                <span slot="title">{{$t("navs.wallet")}}</span>
            </el-menu-item>
            <el-menu-item index="/center/address">
                <i class="el-icon-info"></i>
                <span slot="title">{{$t("navs.address")}}</span>
            </el-menu-item>
            <el-submenu index="/center/info">
                <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>{{$t("navs.publish")}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/center/book"><i class="el-icon-menu"></i>{{$t("navs.book")}}</el-menu-item>
                    <el-menu-item index="/center/note"><i class="el-icon-menu"></i>{{$t("navs.note")}}</el-menu-item>
                    <el-menu-item index="/center/house"><i class="el-icon-menu"></i>{{$t("navs.house")}}</el-menu-item>
                    <el-menu-item index="/center/community"><i class="el-icon-menu"></i>{{$t("navs.community")}}</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </el-submenu>

            <el-menu-item index="/center/message">
                <i class="el-icon-message"></i>
                <span slot="title">{{$t("navs.message")}}</span>
            </el-menu-item>
            <el-menu-item index="/center/history">
                <i class="el-icon-tickets"></i>
                <span slot="title">{{$t("navs.history")}}</span>
            </el-menu-item>
            <el-submenu index="/center/order">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>{{$t("navs.order")}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/center/order/buy"><i class="el-icon-menu"></i>{{$t("navs.orderbuy")}}</el-menu-item>
                    <el-menu-item index="/center/order/sale"><i class="el-icon-menu"></i>{{$t("navs.ordersale")}}</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex';
export default {
  name: 'Aside',
  data() {
    return {
        
    };
  },
  computed:{
      ...mapGetters([
          'headimgurl'
      ]),
      ...mapState([
          'host',
          'userInfo'
      ])
  },
  methods:{}
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
        p{
            padding: 0 10px；
        }
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