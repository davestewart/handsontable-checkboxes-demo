import { get } from '../../../utils/collection'
import config from '../../../config'

export default function (instance, td, row, col, prop, values, cellProperties) {
  values = JSON.parse(values || '[]')
  td.innerHTML = values.map(key => {
    const name = get(config.collateral, key).name
    const initials = name.match(/\b\w/g)
    return initials.join('')
  }).join(' ')
}
