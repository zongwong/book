<template>
  <div class="">
      <my-search></my-search>
      <div class="sort_box">
        <div class="sort_type on">
          按热度排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending on"></i>
            <i class="sort-caret descending"></i>
          </div>
        </div>
        <div class="sort_type">
          按价格排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending"></i>
            <i class="sort-caret descending"></i>
          </div>
        </div>
      </div>
      <div class="container container1000">
        <div class="flex_box">
          <div class="good_card">
            <div class="good_card-img">
              <img src="../../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </div>
          <div class="good_card">
            <div class="good_card-img">
              <img src="../../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </div>
          <div class="good_card">
            <div class="good_card-img">
              <img src="../../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </div>
          <div class="good_card">
            <div class="good_card-img">
              <img src="../../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'Book',
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
.container1000{
  width: 1000px;
  margin: 60px auto;
}
.good_card{
  width: 196px;
  margin-right: 72px;
  .good_card-img{
    height: 258px;
  }
  &:nth-child(4n){
    margin-right: 0;
  }
}
</style>