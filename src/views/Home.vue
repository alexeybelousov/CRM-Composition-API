<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div
      v-else
      class="row"
    >
      <HomeBill
        :rates="currency.rates"
      />

      <HomeCurrency />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  components: {
    HomeBill,
    HomeCurrency,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const currency = ref([]);

    onMounted(async () => {
      currency.value = await ctx.root.$store.dispatch('fetchCurrency');
      loading.value = false;
    });

    return {
      loading,
      currency,
    };
  },
};
</script>
