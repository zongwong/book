<template>
<div>
    <my-search></my-search>
    <div class="box1000 flex_row myinfo"> 
        <my-aside></my-aside>
        <div class="row_bd">
          <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import Search from '../../components/common/Search';
import Aside from '../../components/common/Aside';

export default {
  name: 'Center',
  components: {
    'my-search': Search,
    'my-aside': Aside
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style lang="scss" scoped>
.myinfo{
    padding-top: 50px;
    align-items: start;
}
</style>