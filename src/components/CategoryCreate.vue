<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form
        @submit.prevent="submit"
      >
        <div class="input-field">
          <input
              id="title-create"
              type="text"
              :class="{
                invalid: isTitleInvalid,
              }"
              v-model="titleField"
          >

          <label for="name">Название</label>

          <span
            v-if="isTitleInvalid"
            class="helper-text invalid"
          >
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit-create"
              type="number"
              :class="{
                invalid: isLimitInvalid,
              }"
              v-model.number="limitField"
          >

          <label for="limit">Лимит</label>

          <span
            v-if="isLimitInvalid"
            class="helper-text invalid"
          >
            Минимальная величина
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  // eslint-disable-next-line no-unused-vars
  setup(props, ctx) {
    const titleField = ref('-');
    const limitField = ref(100);

    const $v = useVuelidate(
      {
        titleField: { required, $autoDirty: true },
        limitField: { minValue: minValue(100), $autoDirty: true },
      },
      { titleField, limitField },
    );

    const isTitleInvalid = computed(() => $v.titleField.$dirty && $v.titleField.$invalid);
    const isLimitInvalid = computed(() => $v.limitField.$dirty && $v.limitField.$invalid);

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      const formData = {
        title: titleField.value,
        limit: limitField.value,
      };

      try {
        await ctx.root.$store.dispatch('createCategory', formData);

        titleField.value = '-';
        limitField.value = 100;

        $v.titleField.$reset();
        $v.limitField.$reset();

        ctx.root.$message('Category created');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    onMounted(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });

    return {
      titleField,
      limitField,
      submit,
      isTitleInvalid,
      isLimitInvalid,
      $v,
    };
  },
};
</script>
