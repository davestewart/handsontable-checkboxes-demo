import Vue from 'vue'

/**
 * Helper function to make settings object for HOT table
 *
 * @param   {{columns: Array<object>}}  settings    Additional settings. Expects at least a columns property
 * @param   {Vue}                       vm          The Vue object the table is mounted in
 * @return  {object}
 */
function make (settings, vm) {

  const defaults = {

    licenseKey: 'non-commercial-and-evaluation',

    // layout
    width: 'auto',
    rowHeight: 32,
    rowHeaders: true,
    minSpareRows: 1,

    // features
    selectionMode: 'range',

    // not sure if using this any more...
    contextMenu: ['copy', 'cut', '---------', 'remove_row'],

    // apply classes from columns
    cells (row, col, name) {
      const column = settings.columns[col]

      // arguments are undefined when calling getCellMeta()
      if (column) {
        let className = column.className || ''
        if (column.readOnly) {
          className += ' htReadOnly'
        }
        return {
          className
        }
      }
      return {}
    },

    // update cells
    afterBeginEditing (row, column) {
      const cell = this.getCell(row, column)
      const htEditor = this.getActiveEditor()
      const editor = htEditor.TEXTAREA

      // restyle text editor
      if (editor) {
        // override editor width
        const w = cell.clientWidth
        const width = (w - (w % 2 === 0 ? 16 : 16)) + 'px'
        editor.style.minWidth = width
        editor.style.maxWidth = width

        // append cell classes to editor
        editor.className = 'handsontableInput htPadded ' + cell.className
      }

    },

    // emit changes
    afterChange (changes, source) {
      if (source !== 'loadData') {
        update(changes)

        // debug
        // changes.forEach(([row, prop, oldValue, newValue]) => {
        //   console.log(row, prop, oldValue, newValue)
        // })
      }
    },

    afterRemoveRow () {
      update()
    },
  }

  // mix in settings
  settings = {
    ...defaults,
    ...settings,
  }

  // sanity check
  if (!settings.columns) {
    throw new Error('Parameter "settings" expects a "columns" array of objects')
  }

  /**
   * Update function
   *
   * This function is an attempt to centralise all the emit logic in once place.
   *
   * Currently it relies on a certain architecture, so is brittle in that sense,
   * but simplifies the code
   *
   * @param changes
   */
  function update (changes) {
    vm.$nextTick(() => {
      // grab table reference
      const table = vm.$refs[settings.ref || 'table']
      if (!table) {
        throw new Error('Unable to locate HOT table reference')
      }

      // grab source data
      let data = table.hotInstance.getSourceData()
      if (settings.minSpareRows) {
        data = data.slice(0, -settings.minSpareRows)
      }

      // tell the world the data has changed
      vm.$emit('update', data, changes)
    })
  }

  return settings
}

export default {
  make
}
