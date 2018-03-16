<template>
  <div class="hello">
    <my-header></my-header>
    <h2>Index</h2>
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
    'my-footer': Footer,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style scoped>
</style>
