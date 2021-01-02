<template>
  <div class="field">
    <label :for="fieldId" class="label" v-if="label && type !== 'hidden'">
      {{ `${label}${required ? " *" : ""}` }}
    </label>
    <p
      :class="`control${iconLeft ? ' has-icons-left' : ''}${
        iconRight || isError || isSuccess ? ' has-icons-right' : ''
      }`"
    >
      <input
        :class="`${classes}${' ' + statusClasses}`"
        :type="type"
        :placeholder="`${placeholder}${required ? ' *' : ''}`"
        :disabled="disabled"
        :readonly="readonly"
        :id="fieldId"
        :value="value"
        v-on:input="updateValue($event.target.value)"
        :required="required"
      />

      <span class="icon is-lef" v-if="iconLeft">
        <Icon :name="iconLeft" />
      </span>

      <span class="icon is-right" v-if="iconRight && !isError && !isSuccess">
        <Icon :name="iconRight" />
      </span>

      <span class="icon is-right" v-if="isSuccess">
        <Icon name="check" />
      </span>

      <span class="icon is-right" v-if="isError">
        <Icon name="exclamation-triangle" />
      </span>
    </p>
    <p :class="`help ${statusClasses}`" v-if="isSuccess || isError">
      {{ successMessage || errorMessage }}
    </p>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon/Icon.vue';
import { random } from 'lodash';

export default {
  name: 'Input',
  components: {
    Icon,
  },
  props: {
    value: String,
    label: String,
    type: {
      type: String,
      default: 'Text',
    },
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
    isStatic: Boolean,
    iconLeft: String,
    iconRight: String,
    isSuccess: Boolean,
    isError: Boolean,
    successMessage: String,
    errorMessage: String,
    required: Boolean,
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
        isLoading: 'is-loading',
        isHovered: 'is-hovered',
        isFocused: 'is-focused',
        isStatic: 'is-static',
      },
      status: {
        isSuccess: 'is-success',
        isError: 'is-danger',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['input', this.fieldId];
      Object.keys(this.classNames).forEach((key) => {
        if (this[key]) {
          classes.push(this.classNames[key]);
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
      return `input-${this.randomId}`;
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
