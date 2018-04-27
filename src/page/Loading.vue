<template>
<div class="body" 
  v-loading.fullscreen.lock="fullscreenLoading"
  element-loading-text="正在跳转到支付页面,请稍等..."
>
</div>
</template>

<script>


export default {
  name: 'loading',
  components: {
  },
  data() {
    return {
      fullscreenLoading:true
    };
  },
};

</script>

<style lang="scss" scoped>

</style>