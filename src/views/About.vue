<template>
  <div class="about">
    <div>Counter: {{ count }}</div>
    <div>
      <button
        class="btn"
        @click="increment"
      >
        increment
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value += 1;
    };

    return {
      count,
      increment,
    };
  },
};
</script>
