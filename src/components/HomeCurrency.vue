<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'currency-exchange' | localize }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'currency' | localize }}</th>
            <th>{{ 'rate' | localize }}</th>
            <th>{{ 'date' | localize }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="currency in currencies"
            :key="currency"
          >
            <td>{{ currency }}</td>
            <td>{{ rates[currency].toFixed(2) }}</td>
            <td>{{ Date.parse(date) | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    rates: Object,
    date: String,
  },
  setup(props, ctx) {
    const currencies = ['RUB', 'USD', 'EUR'];
    // eslint-disable-next-line max-len
    const base = computed(() => ctx.root.$store.getters.info.bill / props.rates.RUB / props.rates.EUR);
    const getCurrency = (currency) => Math.floor(base.value * props.rates[currency]);

    return {
      currencies,
      base,
      getCurrency,
    };
  },
};
</script>
