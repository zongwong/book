<template>
  <div>
    <my-banner></my-banner>
    <my-search
      :className="nobg"
    ></my-search>
    <div class="container" v-loading="loading">
      <div class="target flex_row">
        <a href="#nav1"><img  src="../assets/image/nav1.png" alt="图片"></a>
        <a href="#nav2"><img  src="../assets/image/nav2.png" alt="图片"></a>
        <a href="#nav3"><img  src="../assets/image/nav3.png" alt="图片"></a>
        <a href="#nav4"><img  src="../assets/image/nav4.png" alt="图片"></a>
      </div>
      <div class="index_title" id="nav1">
        <div class="index_title-en"><span>P</span>OPULAR BOOKS</div>
        <P class="index_title-zh">热门书籍</P>
        <router-link to="/book"><span class="index_title-more">MORE ></span></router-link>
      </div>

      <div class="flex_box">
        <div class="good_card" v-for="item in book" :key="item.goods_id">
          <router-link :to="'/goods/'+item.goods_id">
            <div class="good_card-img">
              <img :src="host+item.images[0]" alt="">
            </div>
            <p class="good_card-title">{{item.title}}</p>
            <p class="good_card-price">{{item.currency_symbol}} {{item.shop_price}}</p>
          </router-link>
        </div>
      </div>

      <div class="index_title" id="nav2">
        <div class="index_title-en"><span>S</span>ECOND-HAND NOTES</div>
        <P class="index_title-zh">二手笔记</P>
        <router-link to="/notes"><span class="index_title-more">MORE ></span></router-link>
      </div>

      <div class="flex_box">
        <div class="good_card" v-for="item in note" :key="item.goods_id">
          <router-link :to="'/goods/'+item.goods_id">
            <div class="good_card-img">
              <img :src="host+item.images[0]" alt="">
            </div>
            <p class="good_card-title">{{item.title}}</p>
            <p class="good_card-price">{{item.currency_symbol}} {{item.shop_price}}</p>
          </router-link>
        </div>
      </div>

      <div class="index_title" id="nav3">
        <div class="index_title-en"><span>H</span>OUSE LEASE</div>
        <P class="index_title-zh">房屋租赁</P>
        <router-link to="/house"><span class="index_title-more">MORE ></span></router-link>
      </div>
      <div class="house_box">
        <div class="flex_row house_card" v-for="item in lease" :key="item.lease_id">
          
            <div class="row_ft house_card-imgWrap">
              <router-link :to="'/house'+item.lease_id">
              <img :src="host + item.images[0]" alt="封面">
              </router-link>
            </div>
            <div class="row_bd house_card-info">
              <router-link :to="'/house/'+item.lease_id">
              <p class="house_card-title oneHide">{{item.title}}</p>
              <p class="house_card-desc moreHide">{{item.content}}</p>
              <div class="house_card-other">
                <span>{{item.created_at}}</span>
                <span class="from">来自 {{item.userinfo.nickname}}</span>
                <span class="zan">点赞 {{item.thumbup}}</span>
                <span class="hr">丨</span>
                <span class="comment">评论 {{item.comment}}</span>
              </div>
              </router-link>
            </div>
          
        </div>
      </div>
      <div class="index_title" id="nav4">
        <div class="index_title-en"><span>C</span>OMMUNITY</div>
        <P class="index_title-zh">社团交流</P>
        <router-link to="/community"><span class="index_title-more">MORE ></span></router-link>
      </div>
      <div class="club_box">
        <div class="club_card clearfix" v-for="item in associatino" :key="item.association_id">
          <div class="club_card-left">
            <router-link :to="'/community/'+item.association_id">
              <div class="flex_row">
                <div class="imgbox">
                  <img :src="host + item.headimgurl" alt="封面">
                </div>
                <div class="row_bd club_card-info">
                  <p class="club_card-title oneHide">{{item.title}}</p>
                  <p class="club_card-desc">{{item.summary}}</p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="club_card-right">
            <div class="club_post" v-for="post in item.posts" :key="post.post_id">
              <router-link :to="'/community/post/'+post.post_id">
                <div class="flex_row">
                  <div class="imgbox">
                    <img :src="host + post.images[0]" alt="封面">
                  </div>
                  <div class="row_bd club_post-info">
                    <p class="flex_row">
                      <span class="club_post-title oneHide">{{post.title}}</span>
                      <span class="row_bd icon_new"></span>
                    </p>
                    <p class="club_post-desc">{{post.content}}</p>
                  </div>
                </div>
              </router-link>
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
import { indexList } from '../api/api';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    'my-search': Search,
    'my-banner': Banner
  },
  data() {
    return {
      associatino:[],
      book:[],
      lease:[],
      note:[],
      loading:false,
      nobg:'nobg'
    };
  },
  computed:{
    ...mapState([
      'host'
    ])
  },
  created(){
    this.loading = true;
    indexList().then(res=>{
      if(res.code==200){
        this.associatino = res.data.associatino;
        this.book = res.data.book;
        this.lease = res.data.lease;
        this.note = res.data.note;
        this.loading = false;
      }
    })
  }
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
  .target{
    justify-content: space-around;
    margin-top: 40px;
    img{
      cursor: pointer;
    }
  }
</style>
