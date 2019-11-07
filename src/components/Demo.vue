<template>
  <div>
    <h1>Demo</h1>
    <DemoTable :data="data" @update="onUpdate"/>
    <pre>updates: {{ updates }}</pre>
  </div>
</template>

<script>
import DemoTable from './DemoTable'

function field () {
  return {
    select: '',
    checkboxes: '',
  }
}
export default {
  components: {
    DemoTable
  },

  data () {
    return {
      data: [
        field(),
        field(),
        field(),
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
