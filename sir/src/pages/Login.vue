<template>
  <q-layout>
    <div class="l-login flex column justify-center items-center">
      <div class="b-login">
          <div class="center-logo">
            <img src="/statics/logo.png" />
          </div>
          <div class="login-content">
            <div class="text-center">Sign In</div>
            <q-input
              required
              v-model="username"
              type="email"
              label="Email"
            />
            <q-input
              required
              v-model="password"
              type="password"
              @keyup.enter.native="login()"
              label="Password"
            />
            <div class="b-login__btnWrapper body-change">
              <q-btn color="secondary increase-height" class="full-width" @click="login()">Login</q-btn>
            </div>
          </div>
      </div>
    </div>
  </q-layout>

</template>

<script>
import {
  event,
  openURL,
  QLayout,
  QBtn,
  QInput,
  QIcon
} from 'quasar'

import { loginCall } from '../apis/restApi'
const { position } = event

export default {
  name: 'index',
  components: {
    QLayout,
    QBtn,
    QInput,
    QIcon
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      loginCall(this.username, this.password)
      .then(data => {
        this.$store.state.token = data.data.token
        console.log(`Data store contains: ${this.$store.state.token}`)
        this.$router.push({ name: 'tokens' })
      }).catch(error => {
        console.log(error.message)
        if (error.message === 'Request failed with status code 401') {
          this.$q.notify({ 
            type: 'negative',
            message: `Incorrent Username or Password`
            })
        } else {
          this.$q.notify({ 
            type: 'negative',
            message: `Error Occured: ${error.message}`
            })
        }
      })
    }
  }
}
</script>

<style>
.center-logo {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.body-change {
  line-height: 4;
}
.increase-height {
  height: 40px;
}
</style>
