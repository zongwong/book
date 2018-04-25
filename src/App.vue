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
    this.$store.dispatch('campusAction');
    if(localStorage.getItem('token')){
      this.$store.dispatch('userInfoAction');
    }
  }
};
</script>

<style>
</style>
