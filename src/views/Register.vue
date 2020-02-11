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
            v-model.trim="emailField"
            class="validate"
            :class="{
              invalid: isEmailInvalid,
            }"
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

      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            :class="{
              invalid: isNameInvalid,
            }"
            v-model.trim="nameField"
        >

        <label for="name">Имя</label>

        <small
          v-if="isNameInvalid"
          class="helper-text invalid"
        >
          Name incorrect
        </small>
      </div>

      <p>
        <label>
          <input
            type="checkbox"
            v-model="agreeCheckbox"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link
          tag="a"
          to="/login"
        >
          Войти!
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  setup(props, ctx) {
    const emailField = ref('');
    const passwordField = ref('');
    const nameField = ref('');
    const agreeCheckbox = ref(false);

    const $v = useVuelidate(
      {
        emailField: { email, required, $autoDirty: true },
        passwordField: { required, minLength: minLength(6), $autoDirty: true },
        nameField: { required, $autoDirty: true },
        agreeCheckbox: { checked: (v) => v },
      },
      {
        emailField, passwordField, nameField, agreeCheckbox,
      },
    );

    const isEmailInvalid = computed(() => $v.emailField.$dirty && $v.emailField.$invalid);
    const isPasswordInvalid = computed(() => $v.passwordField.$dirty && $v.passwordField.$invalid);
    const isNameInvalid = computed(() => $v.nameField.$dirty && $v.nameField.$invalid);

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      const formData = {
        email: emailField.value,
        password: passwordField.value,
        name: nameField.value,
      };

      try {
        await ctx.root.$store.dispatch('register', formData);
        ctx.root.$router.push('/');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    return {
      emailField,
      passwordField,
      nameField,
      agreeCheckbox,
      submit,
      isEmailInvalid,
      isPasswordInvalid,
      isNameInvalid,
      $v,
    };
  },
};
</script>
