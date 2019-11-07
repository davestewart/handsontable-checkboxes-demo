import Vue from 'vue'
import 'handsontable/dist/handsontable.full.css'
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'

// styles
import './styles/styles.scss'

// settings
import Settings from './config/settings.js'
import * as Columns from './config/columns.js'

// grid
import CheckboxesEditor from './editors/CheckboxesEditor'
import CollateralRenderer from './renderers/CollateralRenderer'

// renderers
Handsontable.editors.registerEditor('checkboxes', CheckboxesEditor)
Handsontable.renderers.registerRenderer('collateral', CollateralRenderer)

// table
Vue.component('hot-table', HotTable)

// settings
export {
  Settings,
  Columns,
}
