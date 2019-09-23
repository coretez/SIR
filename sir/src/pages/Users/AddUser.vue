<template>
  <q-page class="flex flex-center">
    <div class="column" style="width: 80%;">
      <div class="row form">
        <q-input outlined v-model="data.username"
          label="Full Name"
          class="unit-6"
          hint="Full name of the user"
        ></q-input>
      </div>
      <div class="row form">
        <q-input v-model="data.password" filled :type="isPwd ? 'password' : 'text'" hint="Toggle to view">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.email"
          label="Email"
          class="unit-6"
          hint="Used for notification and login."
        ></q-input>
      </div>
      <div class="row shadow">
        <q-btn color="accent" text-color="white" label="Add" @click="addUser()" ></q-btn>
        <q-btn color="primary" text-color="white" label="Cancel" :to="{ name: 'users' }" ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

.form {
  padding: 10px 15px 10px 0px;
}

.q-btn {
  margin:  5px;
}

.unit-4 {
  width: 400px;
}

.unit-6 {
  width: 600px;
}

.local-select {
  width: 200px;
  padding: 5px 10px 5px 0px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'AddUser',
  data () {
    return {
      url: '/api/users',
      isPwd: true,
      data: {
        url: '',
        username: '',
        password: '',
        email: '',
        groups: []
      },
      columns: [
        { name: 'username', label: 'Name', field: 'username', sortable: true },
        { name: 'email', label: 'eMail', field: 'email' },
        { name: 'groups', label: 'Groups', field: 'groups' },
      ]
    }
  },

  methods: {
      addUser () {
        const config = {
          url: `/api/users/`,
          method: 'post',
          headers: { 
            'Content-Type': 'application/json',
            'Token': this.$store.state.token 
          },
          data: JSON.stringify(this.data)
        }

        axios
          .request(config)
          .then((data) => {
            this.$q.notify(`User ${this.data.username} has been added`)
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(`have error`)
            console.log(`In Add User. ${error}`)
          })
      },

      setup () {
        // Page Set Up, If needed.
    }
  },
  mount () {
    this.setup()
  },
  created () {
    this.setup()
  }  
}
</script>
