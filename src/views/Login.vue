<template>
  <form
    class="card auth-card"
    @submit.prevent="submit"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
            :class="{
              invalid: isEmailInvalid,
            }"
            v-model.trim="emailField"
        >

        <label for="email">Email</label>

        <small
          v-if="isEmailInvalid"
          class="helper-text invalid"
        >
          Email incorrect
        </small>
      </div>

      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            :class="{
              invalid: isPasswordInvalid,
            }"
            v-model.trim="passwordField"
        >

        <label for="password">Пароль</label>

        <small
          v-if="isPasswordInvalid"
          class="helper-text invalid"
        >
          Password incorrect
        </small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link
          tag="a"
          to="/register"
        >
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  setup(props, ctx) {
    const emailField = ref('');
    const passwordField = ref('');

    const $v = useVuelidate(
      {
        emailField: { email, required, $autoDirty: true },
        passwordField: { required, minLength: minLength(6), $autoDirty: true },
      },
      { emailField, passwordField },
    );

    const isEmailInvalid = computed(() => $v.emailField.$dirty && $v.emailField.$invalid);
    const isPasswordInvalid = computed(() => $v.passwordField.$dirty && $v.passwordField.$invalid);

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      const formData = {
        email: emailField.value,
        password: passwordField.value,
      };

      try {
        await ctx.root.$store.dispatch('login', formData);
        ctx.root.$router.push('/');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    onMounted(() => {
      if (messages[ctx.root.$route.query.message]) {
        ctx.root.$message(messages[ctx.root.$route.query.message]);
      }
    });

    return {
      emailField,
      passwordField,
      submit,
      isEmailInvalid,
      isPasswordInvalid,
      $v,
    };
  },
};
</script>
