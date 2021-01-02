<template>
  <div class="field">
    <label :for="fieldId" class="label" v-if="label">
      {{ `${label}${required ? " *" : ""}` }}
    </label>
    <p :class="`control${isLoading ? ' ' + loadingClasses : ''}`">
      <textarea
        :class="`${classes}${' ' + statusClasses}`"
        :placeholder="`${placeholder}${required ? ' *' : ''}`"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :id="fieldId"
        :value="value"
        v-on:input="updateValue($event.target.value)"
        :required="required"
      />
    </p>
    <p :class="`help ${statusClasses}`" v-if="isSuccess || isError">
      {{ successMessage || errorMessage }}
    </p>
  </div>
</template>

<script>
import { random } from 'lodash';

export default {
  name: 'TextArea',
  props: {
    value: String,
    label: String,
    placeholder: String,
    isSmall: Boolean,
    isNormal: Boolean,
    isMedium: Boolean,
    isLarge: Boolean,
    isRounded: Boolean,
    isLoading: Boolean,
    isHovered: Boolean,
    isFocused: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    rows: String,
    fixedSize: Boolean,
    isSuccess: Boolean,
    isError: Boolean,
    successMessage: String,
    errorMessage: String,
    required: Boolean,
    isStatic: Boolean,
  },
  data() {
    return {
      randomId: null,
      classNames: {
        isSmall: 'is-small',
        isNormal: 'is-normal',
        isMedium: 'is-medium',
        isLarge: 'is-large',
        isRounded: 'is-rounded',
        isHovered: 'is-hovered',
        isFocused: 'is-focused',
        isStatic: 'is-static',
        fixedSize: 'has-fixed-size',
      },
      loadingSizes: {
        isSmall: 'is-small',
        isNormal: 'is-normal',
        isMedium: 'is-medium',
        isLarge: 'is-large',
      },
      status: {
        isSuccess: 'is-success',
        isError: 'is-danger',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['textarea', this.fieldId];
      Object.keys(this.classNames).forEach((key) => {
        if (this[key]) {
          classes.push(this.classNames[key]);
        }
      });
      return classes.join(' ');
    },

    loadingClasses() {
      const classes = ['is-loading'];
      Object.keys(this.loadingSizes).forEach((key) => {
        if (this[key]) {
          classes.push(this.loadingSizes[key]);
        }
      });
      return classes.join(' ');
    },

    statusClasses() {
      const classes = [];
      Object.keys(this.status).forEach((key) => {
        if (this[key]) {
          classes.push(this.status[key]);
        }
      });
      return classes.join(' ');
    },

    fieldId() {
      return `textarea-${this.randomId}`;
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
  },
  created() {
    this.randomId = random(10000);
  },
};
</script>
