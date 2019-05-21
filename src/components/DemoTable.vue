<template>
  <hot-table ref="table"
             :data="hotData"
             :settings="settings"
  />
</template>

<script>
import { clone } from '../utils/object'
import { Columns, Settings } from '../plugins/handsontable/index'

const settings = {
  columns: [
    {
      title: 'ID',
      data: 'id',
      editor: 'text',
    },
    Columns.settlementDate,
    Columns.collateral
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
