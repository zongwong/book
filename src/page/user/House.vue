<template>
<div class="publish">
    <div class="pbbtn_box"><span>发布社团交流</span></div>
    <div class="history_item">
        <div class="post_item">
          <div class="post_user">
            <img src="../../assets/image/book.png" alt="">
          </div>
          <div class="post_data">
            <p class="post_title oneHide">12312312323</p>
            <div class="post_detail">
              <p class="moreHide">qweqweqweqwe空气环境为偶好环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围几千胸围和其吻合器未</p>
            </div>
            <div class="post_other">
              <span>2018-1-12 13:22</span>
              <span class="from"></span>
              <span class="zan">点赞 23</span>
              <span class="hr">丨</span>
              <span class="comment">评论 345</span>
            </div>
          </div>
          <div class="close"></div>
          <!-- <div class="btn_edit">编辑</div> -->
        </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'Pbhouse',
  components: {
  },
  data() {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
  },
};

</script>

<style lang="scss" scoped>
.form_title{
    margin-bottom: 20px;
    .text{
        color: #7cd958;
        margin-right: 8px;
        font-size: 20px;
    }
    .hr{
        background: #7cd958;
        height: 1px;
    }
    .btn_save{
        background: #7cd958;
        color: #fff;
        border-radius: 50px;
        line-height: 30px;
        padding: 0 20px;
    }
}
</style>