<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="topic_info">
              <div class="topic_header flex_row">
                <div class="row_bd">
                    <h3 class="topic_title">qweqweqwe请问请问亲</h3>
                    <p class="topic_time">2012-12-12-12-12</p>
                </div>
                <div class="topic_avatar flex_row">
                    <div class="topic_avatar_wrap">
                        <img src="../../assets/image/book.png" alt="">
                    </div>
                    <div class="row_bd">
                        <p class="nickname"><span>姓名</span><i class="icon_sex"></i></p>
                        <p class="school">大学打赏</p>
                    </div>
                </div>
              </div>
              <div class="topic_content">

              </div>
              <div class="topic_btn">
                  <span class="zan">点赞 1232</span>
                  <span class="hr">丨</span>
                  <span class="comment">评论 3244</span>
              </div>
              <div class="topic_comment">
                  <div class="comment_item flex_box">
                      <div class="comment_avatar">
                          <img src="../../assets/image/book.png" alt="">
                      </div>
                      <div class="row_bd">
                          <div class="comment_info">
                              <span class="name">xnm气温气温</span>
                              <span class="time">20123012301</span>
                          </div>
                          <div class="comment_data">
                              <span class="reply_btn">回复</span>
                              啊实打实大阿萨德阿萨德阿萨德
                          </div>
                          <div class="reply_comment">
                              <div>请问立刻就气我而去请问请问</div>
                              <div>请问立刻就气我而去请问请问</div>
                              <div>请问立刻就气我而去请问请问</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="reply_box">
                  <textarea class="reply_textarea"></textarea>
                  <el-button size="mini" type="success">发送</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'HouseDetail',
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

</style>