<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row shadow">
        <q-table
          title="Tickets"
          :data="data"
          :columns="columns"
          row-key="_id"
          selection="single"
          :selected.sync="selected"
        ></q-table>
      </div>
      <div class="row shadow">
        <q-btn color="white" text-color="black" label="Refresh" @click="setup()" ></q-btn>
        <q-btn color="accent" text-color="white" label="Add" :to="{ name: 'addTicket' }" ></q-btn>
        <q-btn color="primary" text-color="white" label="Delete" @click="deleteTicket(selected[0])" ></q-btn>
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
  name: 'Tickets',
  data () {
    return {
      url: '/api/tickets',
      selected: [],
      data: [],
      columns: [
        /* Actual Model
            subject: String,
            description: String,
            children: [String], // Will need to use JSON.parse to change into an object
            status: String,
            date: Date,
            public: Boolean,
            parent_id: String,
            type: String,
            priority: String,
            severity: String,
            groups: [String],
            tags: [String],
            lead: String,
            actions: [String]
        */
        { name: 'subject', label: 'Subject', field: 'subject', sortable: true },
        { name: 'description', label: 'Description', field: 'description' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'date', label: 'Date', field: 'date' },
        { name: 'severity', label: 'Severity', field: 'severity' },
        { name: 'type', label: 'Type', field: 'type' },
        { name: 'tags', label: 'Tags', field: 'tags' },
        { name: 'lead', label: 'Lead', field: 'lead' }
      ]
    }
  },
  methods: {
      deleteTicket (rec) {
        console.log('record', rec)
        const config = {
          url: `/api/tickets/${ rec._id }`,
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
            if (error.response.status == '401') {
              this.$router.push({name: 'login'})
            }
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
            if (error.response.status == '401') {
              this.$router.push({name: 'login'})
            }
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
