<template>
  <div class="bg-gradient-primary">
    <div class="login-dark" style="height: 100vh;">

      <!--      FIXME: któraś z klas: p-grid p-ai-center vertical-container powoduje, ze pojawia sie scroll na stronie-->
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
                    <div class="p-grid p-ai-center vertical-container full-height">
                      <div class="p-col">
                        <div class="box"></div>
                      </div>
                      <div class="p-col">
                        <div class="box"><i class="pi pi-user card-header"></i></div>
                      </div>
                      <div class="p-col">
                        <div class="box"></div>
                      </div>
                    </div>
                  </template>
                  <template #content>
                    <div class="p-field">
                      <label for="email">Email address</label>
                      <InputText id="email" type="text" v-model="input.email"/>
                    </div>
                    <div class="p-field">
                      <label for="password">Password</label>
                      <Password :feedback="false" id="password" v-model="input.password"/>
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
  </div>
</template>

<script>
import {userService} from '@/utils/user-service.js';
import {isEmpty} from "@/utils/string-helpers.js";
import {environmentType, requireRecaptcha} from '@/utils/api-url'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: 'Login',
  components: {
    Password,
    InputText,
    Card,
    Button
  },
  data() {
    return {
      loading: false,
      input: {
        email: "",
        password: "",
      },
      environment: environmentType,
      requireRecaptcha: requireRecaptcha,
    }
  },

  //FIXME: dostosować do vuex store pattern
  // https://www.digitalocean.com/community/tutorials/handling-authentication-in-vue-using-vuex
  methods: {
    async login() {
      if (!isEmpty(this.input.email) && !isEmpty(this.input.password)) {
        let user;
        try {
          this.loading = true;
          user = await userService.login(this.input.email, this.input.password);
        } catch (error) {
          console.log(error);
        }

        this.loading = false;
        if (!user) this.loginError();
        else if (!user.data.user.active) this.userInactive();
        else {
          this.loginSuccess();
          await this.$router.push('dashboard');
        }
      } else {
        this.promptEmptyError();
      }
    },
  },

  //FIXME: Notyfikacje muszą być zmienione i dostosowane do vuex store pattern
  // https://www.youtube.com/watch?v=blGp6vslw7s
  notifications: {
    promptEmptyError: {
      title: 'Login Failed',
      message: 'Please provide data.',
      type: 'error'
    },
    loginError: {
      title: 'Login Failed',
      message: 'Email or password is incorrect',
      type: 'error'
    },
    userInactive: {
      title: 'Login Failed',
      message: 'Your account is inactive. Please contact with administrator',
      type: 'error'
    },
    loginSuccess: {
      title: 'Login Success',
      message: () => {
        let welcomeArray = [
          'Have a nice day :)',
          'Good to see you again :)',
          'How’s it going?',
          'Howdy!'
        ];
        return welcomeArray[Math.floor(Math.random() * welcomeArray.length)];
      },
      type: 'success'
    }
  }
}
</script>

<style scoped>
@import '../assets/css/login-form-dark.css';
</style>