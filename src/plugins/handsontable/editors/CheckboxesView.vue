<template>

  <div @keydown.enter="onEnter"
       @keydown.down.prevent.stop="onDown"
       @keydown.up.prevent.stop="onUp"
       @keydown.esc="onCancel"
  >
    <el-checkbox-group
      v-model="input"
      class="vertical"
      @input="onInput"
    >
      <el-checkbox ref="checkbox"
                   v-for="option in options"
                   :label="option[keyValue]"
                   :key="option[keyValue]"
      >
        {{ option[keyLabel] || 'Invalid `keyLabel` prop'}}
      </el-checkbox>
    </el-checkbox-group>
    <hr>
    <div class="button-holder">
      <el-button @click="onEnter" type="primary">Update All</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </div>
  </div>

</template>

<script>
function item (value, label) {
  return { label, value }
}

export default {

  props: {
    options: {
      type: Array,
      default () {
        return [
          item(1, 'One'),
          item(2, 'Two'),
          item(3, 'Three'),
        ]
      }
    },

    value: {
      type: Array,
      default () {
        return [2]
      }
    },

    keyLabel: {
      type: String,
      default: 'label'
    },

    keyValue: {
      type: String,
      default: 'value'
    },
  },

  data () {
    return {
      focusIndex: 0,
      input: [],
    }
  },

  computed: {
    output () {
      return this.options
        .map(option => option[this.keyValue])
        .filter(value => this.input.includes(value))
    }
  },

  watch: {
    value (value) {
      this.input = value
    },
  },

  methods: {
    onInput () {
      this.$emit('input', this.output)
    },

    onEnter () {
      this.focusIndex = 0
      this.$emit('enter')
    },

    onCancel () {
      this.focusIndex = 0
      this.$emit('cancel')
    },

    onUp () {
      this.focusIndex--
      if (this.focusIndex < 0) {
        this.focusIndex = this.options.length - 1
      }
      this.focus()
    },

    onDown () {
      this.focusIndex++
      if (this.focusIndex >= this.options.length) {
        this.focusIndex = 0
      }
      this.focus()
    },

    focus () {
      this.$refs.checkbox[this.focusIndex].$el.focus()
    },

    clear () {
      this.input = []
      this.focusIndex = 0
    },

  }
}
</script>

<style lang="scss">
.htCheckboxesEditor {
  border: 1px solid #DDD;
  position: absolute;
  background: #FFF;
  padding: 7px 10px;
  z-index: 500;
  line-height: 1.7em;

  hr {
    height: 1px;
    border: none;
    background: #EEE
  }

  .button-holder {
    display: flex;

    > button {
      flex: 1;
    }
  }

  // disable animation as it's weird when the checkboxes fade in when the dropdown shows
  .el-checkbox__inner,
  .el-checkbox__inner:after {
    transition: none !important;
  }

}

</style>
