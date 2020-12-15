<template>
  <div class="bg-gradient-primary">
    <div class="login-dark" style="height: 100vh;">
      <div class="p-grid p-ai-center vertical-container full-height">
        <div class="p-col">
          <div class="box"></div>
        </div>
        <div class="p-col">
          <div class="box">
            <div class="p-fluid">
              <form method="POST" v-on:submit.prevent="login">
                <Card class="login-card">
                  <template #header>
                    <div class="card-image-wrapper">
                      <i class="pi pi-user card-header"></i>
                    </div>
                  </template>
                  <template #content>
                    <div class="p-field">
                      <label for="email">Email address</label>
                      <InputText id="email" v-model="input.email" type="text"/>
                    </div>
                    <div class="p-field">
                      <label for="password">Password</label>
                      <Password id="password" v-model="input.password" v-bind:feedback="false"/>
                    </div>
                  </template>
                  <template #footer>
                    <Button id="submitLogin" icon="pi pi-check" label="Login" type="submit"/>
                  </template>
                </Card>
              </form>
            </div>
          </div>
        </div>
        <div class="p-col">
          <div class="box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmpty} from "@/utils/string-helpers.js";
import {mapActions, mapGetters} from 'vuex'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';
import {notificationMixin} from "@/mixins/notificationMixin";

export default {
  name: 'Login',
  components: {
    Password,
    InputText,
    Card,
    Button,
  },
  data() {
    return {
      loading: false,
      input: {
        email: "",
        password: "",
      },
    }
  },

  mixins: [
    notificationMixin
  ],

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isActive: 'user/isActive',
      loggedUser: 'user/getUser',
    }),
  },

  methods: {
    ...mapActions({
      loginToApi: 'user/login',
    }),

    async login() {
      const email = this.input.email;
      const password = this.input.password;
      this.loading = true;

      if (!isEmpty(email) && !isEmpty(password)) {
        await this.loginToApi({email, password})
            .then(() => this.loading = false)

        if (this.isLoggedIn && !this.isActive) this.pushError("Błąd", "Konto nie jest aktywne")

        if (!this.isLoggedIn) this.pushError("Błąd", "Wprowadzone dane są nieprawidłowe")
        else {
          this.pushSuccess("Sukces", "Zalogowano pomyślnie")
          await this.$router.push('dashboard');
        }
      } else this.pushError("Błąd", "Wprowadź dane")
    },
  },
}
</script>

<style scoped>
@import '../assets/css/login-form.css';
</style>