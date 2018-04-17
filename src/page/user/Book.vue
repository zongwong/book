<template>
<div class="publish nopadding">
    <div class="pbbtn_box"><span>发布二手笔记</span></div>
    <div class="history_item">
        <div class="goods_info">
            <div class="goods_imgs">
                <img src="../../assets/image/book.png" alt="">
            </div>
            <div class="goods_data">
                <p class="title">请问请问亲我额去</p>
                <p class="desc">1231231223qweqweqweqweqwe</p>
                <p class="price">￥20.00</p>
            </div>
            <div class="close"></div>
            <div class="btn_edit">编辑</div>
        </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'Pbbook',
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
  created(){
      
  }
};

</script>

<style lang="scss" scoped>

</style>