import { addClass } from 'handsontable/es/helpers/dom/element'
import BaseEditor, { EditorState } from 'handsontable/es/editors/_baseEditor'
import Vue from 'vue'
import Component from './CheckboxesView'

/**
 * @private
 * @editor SelectEditor
 * @class SelectEditor
 */
export default class CheckboxesEditor extends BaseEditor {
  // wrapper
  // vm

  /**
   * Returns select's value.
   *
   * @returns {*}
   */
  getValue () {
    return JSON.stringify(this.vm.output)
  }

  /**
   * Sets value in the select element.
   *
   * @param {*} value A new select's value.
   */
  setValue (value) {
    this.vm.value = JSON.parse(value || '[]')
  }

  /**
   * Opens the editor and adjust its size.
   */
  open () {
    this._opened = true
    this.refreshDimensions()
    this.wrapper.style.display = ''
    this.vm.focus()
    // this.addHook('beforeKeyDown', () => this.onBeforeKeyDown())
  }

  /**
   * Closes the editor.
   */
  close () {
    this._opened = false
    this.vm.value = []
    this.wrapper.style.display = 'none'
    this.clearHooks()
  }

  /**
   * Sets focus state on the select element.
   */
  focus () {
    // not needed
    // this.select.focus()
  }

  /**
   * Initializes editor instance, DOM Element and mount hooks.
   */
  init () {
    // dom elements
    const wrapper = this.hot.rootDocument.createElement('DIV')
    const mounter = this.hot.rootDocument.createElement('DIV')
    addClass(wrapper, 'htCheckboxesEditor')
    wrapper.style.display = 'none'
    wrapper.appendChild(mounter)

    this.hot.view.TBODY.addEventListener('focus', console.log, true)

    console.log(this.TD)

    // vm
    const ComponentCtor = Vue.extend(Component);
    const vm = new ComponentCtor({})
      .$mount(mounter)
      .$on('input', this.onInput.bind(this))
      .$on('enter', this.onEnter.bind(this))
      .$on('cancel', this.onCancel.bind(this))

    // class properties
    this.wrapper = wrapper
    this.vm = vm

    // debug
    window.vm = vm

    // mount etc
    this.hot.rootElement.appendChild(wrapper)
    this.registerHooks()
  }

  onInput (value) {
    this.getEditedCell().focus()
  }

  onEnter () {
    this.finishEditing(false, true)
  }

  onCancel () {
    this.finishEditing(true)
  }

  /**
   * Binds hooks to refresh editor's size after scrolling of the viewport or resizing of columns/rows.
   *
   * @private
   */
  registerHooks () {
    this.addHook('afterScrollHorizontally', () => this.refreshDimensions())
    this.addHook('afterScrollVertically', () => this.refreshDimensions())
    this.addHook('afterColumnResize', () => this.refreshDimensions())
    this.addHook('afterRowResize', () => this.refreshDimensions())
  }

  /**
   * Prepares editor's meta data and a list of available options.
   *
   * @param {Number} row
   * @param {Number} col
   * @param {Number|String} prop
   * @param {HTMLTableCellElement} td
   * @param {*} originalValue
   * @param {Object} cellProperties
   */
  prepare (row, col, prop, td, originalValue, cellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties)

    // options
    const editorOptions = this.cellProperties.editorOptions
    this.vm.options = typeof editorOptions === 'function'
      ? editorOptions(this.row, this.col, this.prop)
      : editorOptions
  }

  /**
   * Refreshes editor's value using source data.
   *
   * @private
   */
  refreshValue () {
    const sourceData = this.hot.getSourceDataAtCell(this.row, this.prop)
    this.originalValue = sourceData
    this.setValue(sourceData)
    this.refreshDimensions()
  }

  /**
   * Refreshes editor's size and position.
   *
   * @private
   */
  refreshDimensions () {
    if (this.state !== EditorState.EDITING) {
      return
    }

    this.TD = this.getEditedCell()

    // TD is outside of the viewport.
    if (!this.TD) {
      this.close()
      return
    }

    const style = this.wrapper.style
    style.top = this.TD.offsetTop + this.TD.offsetHeight - 1 + 'px'
    style.left = this.TD.offsetLeft - 1 + 'px'

  }

  /**
   * Gets HTMLTableCellElement of the edited cell if exist.
   *
   * @private
   * @returns {HTMLTableCellElement|undefined}
   */
  getEditedCell () {
    const { wtOverlays } = this.hot.view.wt
    const editorSection = this.checkEditorSection()
    let editedCell

    switch (editorSection) {
      case 'top':
        editedCell = wtOverlays.topOverlay.clone.wtTable.getCell({
          row: this.row,
          col: this.col
        })
        this.wrapper.style.zIndex = 101
        break
      case 'corner':
        editedCell = wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
          row: this.row,
          col: this.col
        })
        this.wrapper.style.zIndex = 103
        break
      case 'left':
        editedCell = wtOverlays.leftOverlay.clone.wtTable.getCell({
          row: this.row,
          col: this.col
        })
        this.wrapper.style.zIndex = 102
        break
      default:
        editedCell = this.hot.getCell(this.row, this.col)
        this.wrapper.style.zIndex = ''
        break
    }

    return editedCell < 0 ? void 0 : editedCell
  }

}
