<template>
  <div>
    <div class="page-title">
      <h3>{{ 'categories-title' | localize }}</h3>
    </div>
    <section>
      <Loader
        v-if="loading"
      />

      <div
        v-else
        class="row"
      >
        <CategoryCreate />

        <CategoryEdit
          v-if="categories.length"
          :key="`${key}`"
        />

        <p class="center" v-else>
          {{ 'categories-not-found' | localize }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import {
  ref, computed, onMounted, watch,
} from '@vue/composition-api';
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';

export default {
  metaInfo() {
    return {
      title: this.$title('categories-title'),
    };
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const key = ref('');
    const categories = computed(() => ctx.root.$store.getters.categories);

    onMounted(async () => {
      await ctx.root.$store.dispatch('fetchCategories');

      loading.value = false;
    });

    watch(categories, () => {
      key.value = new Date();
    });

    return {
      categories,
      loading,
      key,
    };
  },
};
</script>
