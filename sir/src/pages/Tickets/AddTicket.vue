<template>
  <q-page class="flex flex-center">
    <div class="column" style="width: 80%;">
      <div class="row form">
        <q-input outlined v-model="data.subject" label="Subject" class="unit-4"></q-input>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.description" label="Description" class="unit-6"></q-input>
      </div>
      <div class="row form">
        <q-select outlined class="local-select"
          v-model="data.type"
          :options="typeOptions"
          label="Type"
          hint="Determines Workflow"
        ></q-select>
        <q-select outlined class="local-select"
          v-model="data.severity"
          :options="severityOptions"
          label="Severity"
          hint="Impact to Operations"
        ></q-select>
        <q-select outlined class="local-select"
          v-model="data.priority"
          :options="priorityOptions"
          label="Priority"
          hint="Order of Work"  
        ></q-select>
      </div>
      <div class="row form">
        <q-input outlined v-model="data.lead" label="Lead" class="unit-4"></q-input>
        <q-toggle
          class="local-select"
          v-model="data.is_starred"
          checked-icon="check"
          color="green-9"
          unchecked-icon="clear"
          label="Public"
          left-label
        ></q-toggle>
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

.unit-4 {
  width: 400px;
}

.unit-6 {
  width: 600px;
}

.local-select {
  width: 200px;
  padding: 5px 10px 15px 0px;
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
      },
      severityOptions: ['low', 'medium', 'high', 'critical'],
      priorityOptions: ['debug', 'low', 'medium', 'high'],
      typeOptions: ['ticket', 'incident', 'violation']
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
