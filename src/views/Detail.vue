<template>
  <div>
    <Loader
      v-if="loading"
    />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          to="/history"
          class="breadcrumb"
        >
          История
        </router-link>

        <a
          class="breadcrumb"
          @click.prevent
        >
          {{ record.typeText }}
        </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[record.typeClass]"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.desc }}</p>
              <p>Сумма: {{ record.amount | currency('RUB') }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ Date.parse(record.date) | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-else
      class="center"
    >
      Record with id={{ $route.params.id }} not found
    </p>
  </div>
</template>

<script>
import {
  ref, onMounted,
} from '@vue/composition-api';

export default {
  setup(props, ctx) {
    const loading = ref(true);
    const record = ref(null);

    onMounted(async () => {
      const { id } = ctx.root.$route.params;
      const rec = await ctx.root.$store.dispatch('fetchRecordById', id);
      const cat = await ctx.root.$store.dispatch('fetchCategoryById', rec.categoryId);

      loading.value = false;

      record.value = {
        ...rec,
        categoryName: cat.title,
        typeClass: rec.type === 'income' ? 'green' : 'red',
        typeText: rec.type === 'income' ? ' Income' : 'Outcome',
      };
    });

    return {
      loading,
      record,
    };
  },
};
</script>
