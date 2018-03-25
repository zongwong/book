<template>
  <div>
    <my-banner></my-banner>
    <my-search></my-search>
    <div class="container">

      <div class="index_title">
        <div class="index_title-en"><span>P</span>OPULAR BOOKS</div>
        <P class="index_title-zh">热门书籍</P>
        <router-link to="/book"><span class="index_title-more">MORE ></span></router-link>
      </div>

      <div class="flex_box">
        <div class="good_card">
          <router-link to="/book/1">
            <div class="good_card-img">
              <img src="../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </router-link>
        </div>
        <div class="good_card">
          <router-link to="/book/1">
            <div class="good_card-img">
              <img src="../assets/image/book.png" alt="">
            </div>
            <p class="good_card-title">数码兽的</p>
            <p class="good_card-price">￥20</p>
          </router-link>
        </div>
      </div>

      <div class="index_title">
        <div class="index_title-en"><span>S</span>ECOND-HAND NOTES</div>
        <P class="index_title-zh">二手笔记</P>
        <router-link to="/notes"><span class="index_title-more">MORE ></span></router-link>
      </div>

      <div class="index_title">
        <div class="index_title-en"><span>H</span>OUSE LEASE</div>
        <P class="index_title-zh">房屋租赁</P>
        <router-link to="/house"><span class="index_title-more">MORE ></span></router-link>
      </div>
      <div class="house_box">
        <div class="flex_row house_card">
          <div class="row_ft house_card-imgWrap">
            <img src="../assets/image/book.png" alt="">
          </div>
          <div class="row_bd house_card-info">
            <p class="house_card-title oneHide">驱蚊器委屈未去</p>
            <p class="house_card-desc moreHide">驱蚊器委屈为全文</p>
            <div class="house_card-other">
              <span>2018-1-12 13:22</span>
              <span class="from">来自 陈琳达</span>
              <span class="zan">点赞 23</span>
              <span class="hr">丨</span>
              <span class="comment">评论 345</span>
            </div>
          </div>
        </div>
        <div class="flex_row house_card">
          <div class="row_ft house_card-imgWrap">
            <img src="../assets/image/book.png" alt="">
          </div>
          <div class="row_bd house_card-info">
            <p class="house_card-title oneHide">驱蚊器委屈未去</p>
            <p class="house_card-desc moreHide">驱蚊器委屈为全文</p>
            <div class="house_card-other">
              <span>2018-1-12 13:22</span>
              <span class="from">来自 陈琳达</span>
              <span class="zan">点赞 23</span>
              <span class="hr">丨</span>
              <span class="comment">评论 345</span>
            </div>
          </div>
        </div>
      </div>
      <div class="index_title">
        <div class="index_title-en"><span>C</span>OMMUNITY</div>
        <P class="index_title-zh">社团交流</P>
        <router-link to="/community"><span class="index_title-more">MORE ></span></router-link>
      </div>
      <div class="club_box">
        <div class="club_card clearfix">
          <div class="club_card-left">
            <div class="flex_row">
              <div class="imgbox">
                <img src="../assets/image/book.png" alt="">
              </div>
              <div class="row_bd club_card-info">
                <p class="club_card-title oneHide">请问请问请问去</p>
                <p class="club_card-desc">请问请问请问请问</p>
              </div>
            </div>
          </div>
          <div class="club_card-right">
            <div class="club_post">
              <div class="flex_row">
                <div class="imgbox">
                  <img src="../assets/image/book.png" alt="">
                </div>
                <div class="row_bd club_post-info">
                  <p class="flex_row">
                    <span class="club_post-title oneHide">请问请问请问请问</span>
                    <span class="row_bd icon_new"></span>
                  </p>
                  <p class="club_post-desc">请问请问请问请问</p>
                </div>
              </div>
            </div>
            <div class="club_post">
              <div class="flex_row">
                <div class="imgbox">
                  <img src="../assets/image/book.png" alt="">
                </div>
                <div class="row_bd club_post-info">
                  <p class="flex_row">
                    <span class="club_post-title oneHide">请问请问请问请问</span>
                    <span class="row_bd icon_new"></span>
                  </p>
                  <p class="club_post-desc">请问请问请问请问</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Search from '../components/common/Search';
import Banner from '../components/common/Banner';
export default {
  name: 'Home',
  components: {
    'my-search': Search,
    'my-banner': Banner
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style lang="scss">
  .index_title{
    text-align: center;
    font-size: 17px;
    padding: 80px 0 50px;
  }
  .index_title-en{
    font-weight: bold;
    font-size: 45px;
    span{
      color:#7cd958;
    }
  }
  .index_title-zh{
    letter-spacing: 10px;
    margin-bottom: 34px;
  }
  .index_title-more{
    color: #d3d3d3;
  }

</style>
