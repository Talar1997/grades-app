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
                      <InputText id="email" type="text" v-model="input.email"/>
                    </div>
                    <div class="p-field">
                      <label for="password">Password</label>
                      <Password v-bind:feedback="false" id="password" v-model="input.password"/>
                    </div>
                  </template>
                  <template #footer>
                    <Button icon="pi pi-check" label="Login" id="submitLogin" type="submit"/>
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
    <Toast></Toast>
  </div>
</template>

<script>
import {isEmpty} from "@/utils/string-helpers.js";
import {mapGetters, mapState} from 'vuex'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import {useToast} from "vue-toastification";

export default {
  name: 'Login',
  components: {
    Password,
    InputText,
    Card,
    Button,
    Toast
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

  setup() {
    const toast = useToast();
    return {toast}
  },

  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isActive: 'user/isActive',
      loggedUser: 'user/getUser',
    }),
  },

  methods: {
    //FIXME: ...mapActions nie działa, await this.login(); - powinno działać a też nie działa
    /*...mapActions('user', [
      'login'
    ]),*/

    async login() {
      const email = this.input.email;
      const password = this.input.password;
      this.loading = true;

      if (!isEmpty(email) && !isEmpty(password)) {
        await this.$store.dispatch('user/login', {email, password})
            .then(() => this.loading = false)

        if (this.isLoggedIn && !this.isActive) this.toast.error("Konto nie jest aktywne")

        if (!this.isLoggedIn) this.toast.error("Wprowadzone dane są nieprawidłowe")
        else {
          this.toast.success("Zalogowano pomyślnie")
          await this.$router.push('dashboard');
        }
      } else this.toast.error("Wprowadź dane")
    },
  },
}
</script>

<style scoped>
@import '../assets/css/login-form.css';
</style>