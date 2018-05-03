<template>
<div class="body" 
  v-loading.fullscreen.lock="fullscreenLoading"
  :element-loading-text="$t('msg.loading')"
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