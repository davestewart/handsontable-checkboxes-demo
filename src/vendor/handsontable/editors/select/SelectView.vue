<template>

  <div class="anSelect__list" :data-value-position="'after'">
    <ul class="el-select-dropdown__list" v-loading="isLoading">
      <template v-if="filtered.length">
        <li
            v-for="(option, index) in filtered"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :class="getOptionClass(option, index)"
            class="el-select-dropdown__item"
            @mousedown="onOptionClick(option)"
        >
          <span class="anSelect__item--label">{{ option[keyLabel] }}</span>
          <span class="anSelect__item--value">{{ option[keyValue] }}</span>
        </li>
      </template>
      <li v-else class="el-select-dropdown__item">
        <span class="anSelect__item--label">No results</span>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: {
    input: {
      type: String,
      default: '',
    },

    selected: {
      type: String,
      default: '',
    },

    source: {
      type: [Array, Function],
      default () {
        return [
          { label: 'No data!', value: '' }
        ]
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

    filter: {
      type: String,
      default: 'label'
    },

    showValue: {
      string: 'right',
      validator (value) {
        return ['after', 'below'].includes(value)
      }
    }
  },

  data () {
    return {
      value: '',
      options: [],
      focused: '',
      isLoading: false
    }
  },

  computed: {
    filtered () {
      if (this.filter) {
        const input = this.input.toLowerCase()
        return this.options.filter(option => option[this.filter].toLowerCase().includes(input))
      }
      return this.options
    },
  },

  watch: {
    source: 'updateOptions',
    input: 'updateOptions',
    focused: 'update',
    selected (value) {
      this.focused = value
    },
  },

  methods: {
    update () {
      const option = this.getOption(this.focused)
      this.value = option
        ? option[this.keyValue]
        : ''
    },

    updateOptions () {
      const source = this.source
      if (typeof source === 'function') {
        source(this.input, options => {
          this.options = options
          this.update()
        })
      } else {
        this.options = source
        this.update()
      }
    },

    setFocus (value) {
      // specific item
      if (typeof value === 'string'){
        this.focused = value
      }

      // prev / next
      else if (typeof value === 'number') {
        // items
        const filtered = this.filtered

        // no items to focus
        if (filtered.length === 0) {
          return
        }

        // focus something...
        const option = this.getOption(this.focused) || this.getOption(this.selected)
        let index = filtered.indexOf(option)

        // no currently-focused item
        if (index === -1) {
          index = value < 0
            ? filtered.length - 1
            : 0
          this.focused = filtered[index].value
        }

        // currently-focused
        else {
          index += value
          if (index > filtered.length - 1) {
            index = 0
          }
          if (index < 0) {
            index = filtered.length - 1
          }
          this.focused = filtered[index].value
        }
      }
    },

    getOption (value) {
      return this.filtered.find(option => option[this.keyValue] === value)
    },

    getOptionClass (option, index) {
      return {
        selected: option.value === this.selected,
        hover: option.value === this.focused,
      }
    },

    onOptionClick (option) {
      this.selected = option.value
    },

    clear () {
      this.input = ''
      this.value = ''
      this.focused = ''
      this.selected = ''
    }

  }
}
</script>

<style lang="scss">
.anSelect {

  &__container {
    position: absolute;
    z-index: 9999;
    width: auto;
    border: 1px solid #DDD;
    border-top: none;
    background: white;
    box-shadow: 0 5px 10px #00000022;
  }

  &__item--value {
    color: #AAA;
    display: none;
  }

  &__list[data-value-position="after"] &__item--value {
    display: block;
    float: right;
    padding-left: 20px
  }

  &__list[data-value-position="below"] {

    .el-select-dropdown__item {
      height: 50px;
    }

    .anSelect__item--value {
      display: block;
      font-size: 0.8em;
      line-height: 0.7em;
    }
  }

}
</style>
