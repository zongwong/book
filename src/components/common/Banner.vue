<template>
  <div class="banner">
    <div class="block">
        <el-carousel  trigger="click" height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
                <div class="banner_info">
                    <div class="container banner_info-wrap">
                        <p class="banner_title">WELCOME TO OUR STORE</p>
                        <p class="banner_desc">Daily Subscription Agency is a newspaper outlet organizaaily Subscription Agency is a newspaper outlet organization. W</p>
                        <p class="banner_btn">CHECK IT OUT</p>
                    </div>
                </div>
                <div>
                    <img class="bannerImg" src="../../assets/image/banner.png" alt="幻灯片">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.bannerImg{
  width: 100%;
}
.banner_info {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  .banner_info-wrap {
    padding: 0 130px;
    color: #fff;
    font-size: 20px;
    box-sizing: border-box;
  }
  .banner_title {
    font-size: 55px;
    font-weight: bold;
    margin: 120px 0 20px;
  }
  .banner_desc {
    max-width: 550px;
    word-break: break-all;
    margin-bottom: 40px;
  }
  .banner_btn {
    color: #333;
    background: rgba(255, 255, 255, 0.7);
    width: 160px;
    line-height: 40px;
    text-align: center;
  }
}
</style>