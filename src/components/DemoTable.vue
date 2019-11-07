<template>
  <hot-table ref="table"
             :data="hotData"
             :settings="settings"
  />
</template>

<script>
import { clone } from '../utils/object'
import { Columns, Settings } from '../vendor/handsontable/index'

const settings = {
  minSpareRows: 0,
  columns: [
    Columns.select,
    Columns.checkboxes,
  ]
}

export default {
  props: {
    data: Array,
  },

  data () {
    return {
      hotData: clone(this.data),
      settings: Settings.make(settings, this),
    }
  }
}
</script>
