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
            detection: Number,
            actor: String,
            plan: String,
            file_set: [String],
            date: Date,
            is_starred: Boolean,
            subject: String,
            description: String,
            severity: Number,
            is_incident: Boolean,
            is_major: Boolean,
            status: String,
            confidentiality: Number,
            category: Number,
            opened_by: Number,
            concerned_business_lines: [String]
        */
        { name: 'detection', label: 'Reference', field: 'detection', sortable: true },
        { name: 'actor', label: 'Actor', field: 'actor' },
        { name: 'is_starred', label: 'Focus', field: 'is_starred' },
        { name: 'subject', label: 'Subject', field: 'subject' },
        { name: 'severity', label: 'Severity', field: 'severity' },
        { name: 'is_incident', label: 'Incident', field: 'is_incident' },
        { name: 'is_major', label: 'Major', field: 'is_major' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'category', label: 'Category', field: 'category' }
      ]
    }
  },
  methods: {
      deleteTicket (rec) {
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
