<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('currencyAction');
    
    this.$store.dispatch('userInfoAction');
    this.$store.dispatch('campusAction').then(res=>{
      console.log(res)
    })
  }
};
</script>

<style>
</style>
