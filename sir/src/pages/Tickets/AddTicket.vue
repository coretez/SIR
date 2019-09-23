<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row form">
        <q-input outlined v-model="data.subject" label="Subject" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.description" label="Description" ></q-input>
      </div>
      <div class="row form">
        <q-toggle
          v-model="data.is_starred"
          checked-icon="check"
          color="green-9"
          unchecked-icon="clear"
          label="Public"
          left-label
        ></q-toggle>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.severity" label="Severity" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.type" label="Type" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.priority" label="Priority" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.severity" label="Severity" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.lead" label="Lead" ></q-input>
      </div>
      <div class="row shadow">
        <q-btn color="accent" text-color="white" label="Add" @click="addUser()" ></q-btn>
        <q-btn color="primary" text-color="white" label="Cancel" :to="{ name: 'tickets' }" ></q-btn>
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
</style>

<script>
import axios from 'axios'

export default {
  name: 'AddUser',
  data () {
    return {
      url: '/api/users',
      selected: [],
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
      data: {
        subject: '',
        description: '',
        status: 'open',
        public: false,
        type: 'ticket',
        priority: 'low',
        severity: 'low',
        groups: [],
        tags: [],
        lead: ''
      }
    }
  },

  methods: {
      addUser () {
        const config = {
          url: `/api/tickets/`,
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
            this.$q.notify(`User ${this.data.subject} has been added`)
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(`have error`)
            console.log(`In Add Ticket. ${error}`)
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
