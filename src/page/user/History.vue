<template>
<div class="history">
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
        </div>
        <div class="evaluate_box evaluate_top">      
            <div class="flex_row">
                <div class="evaluate_label evaluate_rate">本次交易评分：</div>
                <div class="row_bd">
                    <el-rate :colors="['#7cd958','#7cd958','#7cd958']" v-model="value1"></el-rate>
                </div>
            </div>
            <div class="flex_row evaluate_word_row">
                <div class="evaluate_label">买家评价：</div>
                <p class="row_bd evaluate_word">
                    气温气温去
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'History',
  components: {
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