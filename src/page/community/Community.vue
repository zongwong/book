<template>
  <div class="">
    <my-search></my-search>
    <div class="club_box community_box">
      <div class="club_card clearfix">
        <div class="club_card-left">
          <div class="flex_row">
            <div class="imgbox">
              <img src="../../assets/image/book.png" alt="">
            </div>
          </div>
        </div>
        <div class="club_card-right">
          <p class="title oneHide">请问请问亲我而且请问请问</p>
          <p class="desc">爱得起无多群无切完而且委屈</p>
          <div class="club_post">
            <div class="flex_row">
              <div class="imgbox">
                <img src="../../assets/image/book.png" alt="">
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
                <img src="../../assets/image/book.png" alt="">
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
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'Community',
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
.community_box{
  width: 1000px;
  margin: 0 auto;
  .club_card{
    padding: 52px 0;
    border:none;
    border-bottom: 1px solid #eee;
    height: auto;
  }
  .club_card-left{
    width: 300px;
    .imgbox{
      width: 300px;
      height: 300px;
      margin: 0;
    }
  }
  .club_card-right{
    width: 670px;
    height: 300px;
    border: none;
    padding:0;
  }
  .title{
    font-size: 20px;
    margin-bottom: 10px;
    max-width: 670px;
  }
  .desc{
    color: #7d7d7d;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>