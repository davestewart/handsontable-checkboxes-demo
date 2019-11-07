import config from '../../../config'

export const settlementDate = {
  title: 'Settlement Date',
  data: 'settlementDate',
  type: 'date',
  width: 110,
  dateFormat: 'YYYY-MM-DD',
}

export const collateral = {
  title: 'Collateral Baskets',
  data: 'collateralBasketIds',
  type: 'text',
  width: 150,
  renderer: 'collateral',
  editor: 'checkboxes',
  editorOptions: function (row, col, prop) {
    return config.collateral.map(item => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  }
}
