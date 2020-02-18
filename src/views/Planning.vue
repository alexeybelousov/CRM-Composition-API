<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ bill | currency('RUB')}}</h4>
    </div>

    <Loader
      v-if="loading"
    />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      {{ `Categories does not exist. ` }}
      <router-link
        to="/categories"
      >
        Add new
      </router-link>
    </p>

    <section
      v-else
    >
      <div
        v-for="cat in filteredCategories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div
          class="progress"
          v-tooltip="cat.tooltip"
        >
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{
              width: `${cat.progressPercent}%`
            }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import {
  ref, computed, onMounted,
} from '@vue/composition-api';
import currencyFilter from '@/filters/currency.filter';

export default {

  setup(props, ctx) {
    const loading = ref(true);
    const records = computed(() => ctx.root.$store.getters.records);
    const categories = computed(() => ctx.root.$store.getters.categories);
    const bill = computed(() => ctx.root.$store.getters.info.bill);
    const filteredCategories = ref([]);

    onMounted(async () => {
      await ctx.root.$store.dispatch('fetchRecords');
      await ctx.root.$store.dispatch('fetchCategories');

      loading.value = false;

      filteredCategories.value = categories.value.map((cat) => {
        const spend = records.value
          .filter((r) => r.categoryId === cat.id)
          .filter((r) => r.type === 'outcome')
          // eslint-disable-next-line no-return-assign, no-param-reassign
          .reduce((total, record) => total += record.amount, 0);

        // eslint-disable-next-line no-mixed-operators
        const percent = 100 * spend / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        // eslint-disable-next-line no-nested-ternary
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';

        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Previshenie na' : 'Ostalos'} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip,
        };
      });
    });

    return {
      loading,
      categories,
      filteredCategories,
      bill,
    };
  },
};
</script>
