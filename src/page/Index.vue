<template>
  <div>
    <my-header></my-header>
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
export default {
  name: 'Index',
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  data() {
    return {
    };
  }
};

</script>

<style lang="scss" scoped>
  
</style>
