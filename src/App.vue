<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import EmptyLayout from './layouts/EmptyLayout.vue';
import MainLayout from './layouts/MainLayout.vue';

export default {
  setup(props, ctx) {
    const layout = computed(() => `${ctx.root.$route.meta.layout || 'empty'}-layout`);

    return {
      layout,
    };
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
