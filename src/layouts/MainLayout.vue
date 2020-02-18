<template>
  <div>
    <Loader v-if="loading" />

    <div
      v-else
      class="app-main-layout"
    >
      <Navbar
        @toggle-sidebar="onToggleSidebar"
      />

      <Sidebar
        :is-sidebar-open="isSidebarOpen"
      />

      <main
        class="app-content"
        :class="{
          'full': !isSidebarOpen,
        }"
      >
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          tag="a"
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Create new record'"
        >
            <i class="large material-icons">add</i>
        </router-link >
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { ref, onMounted } from '@vue/composition-api';
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const isSidebarOpen = ref(false);
    const onToggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    onMounted(async () => {
      if (!_.get(ctx, 'ctx.root.$store.getters.info.name', null)) {
        await ctx.root.$store.dispatch('fetchUserInfo');
      }

      loading.value = false;
    });

    return {
      isSidebarOpen,
      onToggleSidebar,
      loading,
    };
  },
};
</script>
