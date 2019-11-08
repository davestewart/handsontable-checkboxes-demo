import Handsontable from 'handsontable'
import { EditorState } from 'handsontable/es/editors/_baseEditor'
import TextEditor from 'handsontable/es/editors/textEditor'
// import { isMetaKey } from 'handsontable/es/helpers/unicode'
// import { addClass } from 'handsontable/es/helpers/dom/element'
import Vue from 'vue'
import Component from './SelectView'

const { dom } = Handsontable
/**
 * @private
 * @editor SelectEditor
 * @class SelectEditor
 */
export default class SelectEditor extends TextEditor {
  init () {
    this.onInput = this.onInput.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.setValue = this.setValue.bind(this)
    this.clear = this.clear.bind(this)
  }

  createElements () {
    super.createElements()
    this.addInput()
    this.addClear()
    this.addWrapper()
    this.addView()
    this.wrapper.style.display = 'none'
  }

  addInput () {
    this.TEXTAREA = document.createElement('input')
    this.TEXTAREA.tabIndex = -1
    this.TEXTAREA.className = 'handsontableInput'
    Object.assign(this.TEXTAREA.style, {
      width: 0,
      height: 0,
      overflow: 'hidden',
    })
    this.TEXTAREA_PARENT.innerHTML = ''
    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA)
  }

  addClear () {
    const close = document.createElement('span')
    close.className = 'anSelect__clear'
    close.innerHTML = ''
    close.addEventListener('click', this.clear)
    this.TEXTAREA_PARENT.appendChild(close)
  }

  addWrapper () {
    const wrapper = this.wrapper = document.createElement('div')
    wrapper.className = 'anSelect__container'
    Object.assign(wrapper.style, {
      top: 0,
      left: 0
    })
    document.body.appendChild(this.wrapper)
  }

  addView () {
    // mount
    const mounter = document.createElement('div')
    this.wrapper.appendChild(mounter)

    // components
    const ComponentCtor = Vue.extend(Component)
    this.editor = new ComponentCtor({})
      .$mount(mounter)
      .$on('update', this.onUpdate)
  }

  prepare (row, col, prop, td, originalValue, cellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties)
    let options = this.cellProperties.editorOptions
    options = typeof options === 'function'
      ? options(this.row, this.col, this.prop)
      : options

    Object.assign(this.editor, options)
    this.editor.selected = originalValue
  }

  getValue () {
    return this.editor.value
  }

  setValue (value) {
    this.TEXTAREA.value = value
    this.editor.input = value
  }

  setFocus (dir) {
    this.editor.setFocus(dir)
  }

  clear () {
    this.setValue('')
    this.editor.selected = ''
  }

  open (event) {
    super.open()

    const offset = this.TD.getBoundingClientRect()
    const top = parseInt(window.pageYOffset + offset.top + dom.outerHeight(this.TD)) + 1
    const left = parseInt(window.pageXOffset + offset.left)

    this.wrapper.style.top = top + 'px'
    this.wrapper.style.left = left + 'px'
    this.wrapper.style.display = ''

    this.TEXTAREA.addEventListener('input', this.onInput)
  }

  close () {
    this.wrapper.style.display = 'none'
    this.TEXTAREA.removeEventListener('input', this.onInput)
    this.editor.clear()
    super.close()
  }

  onInput (event) {
    this.editor.input = event.target.value
  }

  onUpdate (value) {
    this.setValue(value)
  }

  onBeforeKeyDown (event) {
    if (this.state === EditorState.EDITING) {
      const { key } = event
      const cancel = function () {
        event.preventDefault()
        event.stopImmediatePropagation()
      }

      if (key === 'ArrowUp') {
        this.setFocus(-1)
        return cancel()
      }
      if (key === 'ArrowDown') {
        this.setFocus(1)
        return cancel()
      }
    }

    super.onBeforeKeyDown(event)
  }
}
