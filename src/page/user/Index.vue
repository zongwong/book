<template>
<div>
    <my-search></my-search>
    <div class="userInfoBox">
        <div class="avatar">
            <img src="../../assets/image/book.png" alt="">
            <i class="icon_sex"></i>
        </div>
        <p class="name">打打</p>
        <p>气温气温</p>
        <div class="tabBar">
            <div class="box1000 flex_row tabs_wrap">
                <div class="tab_item on">TA的发布</div>
                <div class="tab_item">TA的卖出</div>
            </div>
        </div>
    </div>
    <div class="box1000">
        <div class="select_box">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="list">

        </div>
    </div>
</div>
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'UserIndex',
  components: {
    'my-search': Search
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style lang="scss" scoped>


.tabBar{
    margin: 40px 0 28px;
    background: #f9f9f9; 
}
.tab_item{
    width: 155px;
    line-height: 68px;
    text-align: center;
    margin: 0 180px;
    font-size: 17px;
    &.on{
        color: #7cd958;
        border-bottom: 2px solid #7cd958;
    }
}
.tabs_wrap{
    justify-content: space-around;
}
.select_box{
    text-align: right;
    margin-bottom: 14px;
}
</style>