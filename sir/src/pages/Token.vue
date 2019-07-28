<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row shadow">
        <q-table
          title="Tokens"
          :data="data"
          :columns="columns"
          row-key="token"
          selection="single"
          :selected.sync="selected"
        ></q-table>
      </div>
      <div class="row shadow">
        <q-btn color="white" text-color="black" label="Refresh" @click="setup()" ></q-btn>
        <q-btn color="primary" text-color="white" label="Delete" @click="deleteToken(selected[0])" ></q-btn>
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
  name: 'Tokens',
  data () {
    return {
      url: '/api/tokens',
      selected: [],
      data: [],
      columns: [
        { name: 'name', label: 'Role', field: 'name', sortable: true },
        { name: 'token', label: 'Token', field: 'token' },
        { name: 'roles', label: 'Roles', field: 'roles' },
      ]
    }
  },
  methods: {
      deleteToken (rec) {
        const config = {
          url: `/api/tokens/${ rec._id }`,
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
            console.log(`This is ${JSON.stringify(data)}`)
            this.data = data.data
          })
          .catch(error => {
            console.log(`have error`)
            console.log(`In Status Setup-Error. ${error}`)
          })
          .finally(() => { console.log('completing setup.') })
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
