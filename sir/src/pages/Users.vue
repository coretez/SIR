<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row shadow">
        <q-table
          title="Users"
          :data="data"
          :columns="columns"
          row-key="_id"
          selection="single"
          :selected.sync="selected"
        ></q-table>
      </div>
      <div class="row shadow">
        <q-btn color="white" text-color="black" label="Refresh" @click="setup()" ></q-btn>
        <q-btn color="accent" text-color="white" label="Add" :to="{ name: 'addUser' }" ></q-btn>
        <q-btn color="primary" text-color="white" label="Delete" @click="deleteUser(selected[0])" ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<style>
.shadow {
  padding: 10px 15px;
  background: rgba(86,61,124,.15);
  border: 1px solid rgba(86,61,124,.2);
}

.q-btn {
  margin:  5px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  data () {
    return {
      url: '/api/users',
      selected: [],
      data: [],
      columns: [
        { name: 'username', label: 'Name', field: 'username', sortable: true },
        { name: 'email', label: 'eMail', field: 'email' },
        { name: 'groups', label: 'Groups', field: 'groups' },
      ]
    }
  },
  methods: {
      deleteUser (rec) {
        const config = {
          url: `/api/users/${ rec._id }`,
          method: 'delete',
          headers: { 
            'Content-Type': 'application/json',
            'Token': this.$store.state.token 
          }
        }

        axios
          .request(config)
          .then((data) => {
            this.selected = []
            this.setup()
          })
          .catch(error => {
            console.log(`have error`)
            console.log(`In Status Setup-Error. ${error}`)
          })
          .finally(() => { console.log('Token Deleted.') })
      },

      setup () {

        const config = {
          url: this.url,
          method: 'get',
          headers: { 
            'Content-Type': 'application/json',
            'Token': this.$store.state.token 
          }
        }

        axios
          .request(config)
          .then((data) => {
            this.data = data.data
          })
          .catch(error => {
            console.log(`have error`)
            console.log(`In Status Setup-Error. ${error}`)
          })
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
