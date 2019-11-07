export default function (instance, td, row, col, prop, values, cellProperties) {
  td.innerHTML = values
    ? values.split('|').join(' ')
    : ''
}
