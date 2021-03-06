<template>
  <div>
    <div class="page-title">
      <h3>{{ 'history-title' | localize }}</h3>
    </div>

    <div
      v-if="!loading"
      class="history-chart"
    >
      <Chart
        :chart-data="chartData"
        :width="300"
        :height="300"
      />
    </div>

    <Loader
      v-if="loading"
    />

    <p
      v-else-if="!filteredRecords.length"
      class="center"
    >
      {{ 'history-record-not-exist' | localize }}
      <router-link
        to="/record"
      >
        {{ 'add-new' | localize }}
      </router-link>
    </p>

    <section
      v-else
    >
      <HistoryTable
        :records="items"
      />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChange"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import {
  ref, computed, onMounted, reactive,
} from '@vue/composition-api';
import HistoryTable from '@/components/HistoryTable.vue';
import Chart from '@/components/Chart.vue';
import usePagination from '@/compositions/usePagination';

export default {
  metaInfo() {
    return {
      title: this.$title('history-title'),
    };
  },
  components: {
    Chart,
    HistoryTable,
  },
  setup(props, ctx) {
    const {
      initPagination, page, items, pageCount, pageChange,
    } = usePagination(ctx);

    const loading = ref(true);
    const records = computed(() => ctx.root.$store.getters.records);
    const categories = computed(() => ctx.root.$store.getters.categories);
    const filteredRecords = ref([]);
    const chartData = reactive({});

    onMounted(async () => {
      await ctx.root.$store.dispatch('fetchRecords');
      await ctx.root.$store.dispatch('fetchCategories');

      filteredRecords.value = records.value.map((record) => ({
        ...record,
        categoryName: categories.value.find((cat) => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? ' Income' : 'Outcome',
      }));

      initPagination(filteredRecords.value);

      chartData.labels = categories.value.map((cat) => cat.title);
      chartData.datasets = [{
        label: 'Expenses by category',
        data: categories.value.map((cat) => records.value.reduce((total, rec) => {
          if (rec.categoryId === cat.id && rec.type === 'outcome') {
            // eslint-disable-next-line no-param-reassign
            total += +rec.amount;
          }
          return total;
        }, 0)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }];

      loading.value = false;
    });

    return {
      loading,
      filteredRecords,
      page,
      items,
      pageCount,
      pageChange,
      chartData,
    };
  },
};
</script>
