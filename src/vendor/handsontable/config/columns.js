import options from '../../../config'

export const select = {
  title: 'Select Editor',
  data: 'select',
  type: 'text',
  width: 150,
  renderer: 'text',
  editor: 'select',
  editorOptions: function (row, col, prop) {
    return {
      keyLabel: 'label',
      keyValue: 'value',
      // filter: 'value',
      source (query, callback) {
        const result = options.map(item => {
          return {
            label: item.name,
            value: item.code,
          }
        })
        setTimeout(() => callback(result), 500)
      }
    }
  }
}

export const checkboxes = {
  title: 'Checkboxes editor',
  data: 'checkboxes',
  type: 'text',
  width: 150,
  renderer: 'options',
  editor: 'checkboxes',
  editorOptions: function (row, col, prop) {
    return options.map(item => {
      return {
        label: item.name,
        value: item.code,
      }
    })
  }
}
