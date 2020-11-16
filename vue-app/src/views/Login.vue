<template>
  <div class="bg-gradient-primary">
    <div class="login-dark" style="height: 100vh;">
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">Firstname</label>
          <InputText id="firstname" type="text" />
        </div>
        <div class="p-field">
          <label for="lastname">Lastname</label>
          <InputText id="lastname" type="text" />
        </div>
      </div>
      <Password v-model="value" />

      <!--<b-form id="form" method="POST" style="background-color: #ffffff;" v-on:submit.prevent="login">
        <h2 class="sr-only">Login Form</h2>
        <div class="illustration">
          <b-icon icon="shield-lock" scale="1.5" style="color: rgb(78,115,223);"></b-icon>
        </div>
        <div class="form-group">
          <b-input id="email" v-model="input.email" class="form-control" name="email"
                   placeholder="Email" style="color: rgb(0,0,0);"
                   type="email"/>
        </div>
        <div class="form-group">
          <b-input id="password" v-model="input.password" class="form-control" name="password"
                   placeholder="Password" style="color: rgb(0,0,0);"
                   type="password"/>
        </div>
        <div class="form-group">
          <button id="submitLogin"
                  class="btn btn-primary btn-block"
                  style="background-color: rgb(78,115,223);"
                  type="submit"
          >
            <span v-if="!loading">Log In</span>
            <span v-else>
              <b-spinner label="Logging in..." small>
              </b-spinner>
              Logging in...
            </span>
          </button>
        </div>
      </b-form>-->
    </div>
  </div>
</template>

<script>
import {userService} from '@/utils/user-service.js';
import {isEmpty} from "@/utils/string-helpers.js";
import {environmentType, requireRecaptcha} from '@/utils/api-url'
import Password from 'primevue/password';

export default {
  name: 'Login',
  components:{
    Password
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
@import '../assets/fonts/ionicons.min.css';
@import '../assets/css/login-form-dark.css';
</style>