<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, idx) in records"
      :key="record.id"
    >
      <td>{{ idx + 1}}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ Date.parse(record.date) | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          v-tooltip="'Open record details'"
          class="btn-small btn"
          @click="$router.push(`/detail/${record.id}`)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
// import { computed } from '@vue/composition-api';

export default {
  props: {
    records: {
      type: Array,
      require: true,
    },
  },
  // setup(props, ctx) {
  //   const currencies = ['RUB', 'USD', 'EUR'];
  //   // eslint-disable-next-line max-len
  //   const base = computed(() => ctx.root.$store.getters.info.bill /
  // props.rates.RUB / props.rates.EUR);
  //   const getCurrency = (currency) => Math.floor(base.value * props.rates[currency]);

  //   return {
  //     currencies,
  //     base,
  //     getCurrency,
  //   };
  // },
};
</script>
