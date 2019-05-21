<template>
  <div>
    <h1>Demo</h1>
    <DemoTable :data="data" @update="onUpdate"/>
    <pre>updates: {{ updates }}</pre>
  </div>
</template>

<script>
import DemoTable from './DemoTable'

export default {
  components: {
    DemoTable
  },

  data () {
    return {
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      updates: [],
    }
  },

  methods: {
    onUpdate (data, changes) {
      this.updates = data
    }
  }
}
</script>
