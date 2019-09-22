<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row form">
        <q-input outlined v-model="data.detection" label="Name" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.actor" label="Actor" ></q-input>
      </div>
      <div class="row form">
        <q-toggle
          v-model="data.is_starred"
          checked-icon="star"
          color="yellow-9"
          unchecked-icon="clear"
          label="Star"
          left-label
        ></q-toggle>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.subject" label="Subject" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.severity" label="Severity" ></q-input>
      </div>
      <div class="row form">
        <q-toggle
          v-model="data.is_incident"
          checked-icon="warning"
          color="red-9"
          unchecked-icon="clear"
          label="Incident"
          left-label
        ></q-toggle>
      </div>
      <div class="row form">
        <q-toggle
          v-model="data.is_major"
          checked-icon="warning"
          color="red-9"
          unchecked-icon="clear"
          label="Major Issue"
          left-label
        ></q-toggle>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.status" label="Status" ></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.category" label="Category" ></q-input>
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
      data: {
        detection: 1,
        actor: '',
        plan: 'none',
        file_set: '[]',
        is_starred: false,
        subject: '',
        severity: 5,
        is_incident: false,
        is_major: false,
        status: '',
        category: 5
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
