<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader
      v-if="loading"
    />

    <p
      v-else-if="!filteredRecords.length"
      class="center"
    >
      {{ `Records does not exist. ` }}
      <router-link
        to="/record"
      >
        Add new
      </router-link>
    </p>

    <section
      v-else
    >
      <HistoryTable
        :records="filteredRecords"
      />
    </section>
  </div>
</template>

<script>
import {
  ref, computed, onMounted,
} from '@vue/composition-api';
import HistoryTable from '@/components/HistoryTable.vue';

export default {
  components: {
    HistoryTable,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const records = computed(() => ctx.root.$store.getters.records);
    const categories = computed(() => ctx.root.$store.getters.categories);
    const filteredRecords = ref([]);

    onMounted(async () => {
      await ctx.root.$store.dispatch('fetchRecords');
      await ctx.root.$store.dispatch('fetchCategories');

      loading.value = false;

      filteredRecords.value = records.value.map((record) => ({
        ...record,
        categoryName: categories.value.find((cat) => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? ' Income' : 'Outcome',
      }));
    });

    return {
      loading,
      filteredRecords,
    };
  },
};
</script>
