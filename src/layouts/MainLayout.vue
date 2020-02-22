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
        :key="locale"
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
import {
  ref, onMounted, computed, watch,
} from '@vue/composition-api';
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import messages from '@/utils/messages';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const isSidebarOpen = ref(true);
    const onToggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    onMounted(async () => {
      if (!_.get(ctx, 'ctx.root.$store.getters.info.name', null)) {
        await ctx.root.$store.dispatch('fetchUserInfo');
      }

      loading.value = false;
    });

    const error = computed(() => ctx.root.$store.getters.error);

    watch(error, (fbError) => {
      if (fbError) {
        ctx.root.$error(messages[fbError.code] || 'Something wrong');
      }
    });

    const locale = computed(() => ctx.root.$store.getters.info.locale);

    return {
      isSidebarOpen,
      onToggleSidebar,
      loading,
      error,
      locale,
    };
  },
};
</script>
