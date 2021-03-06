<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item :size="size" :required="isRequired" :error="errors[0]">
      <template v-slot:label>
        <span>{{ label }}</span>
        <span v-if="tooltip">
          <el-tooltip :content="tooltip" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
      </template>
      <component
        v-if="isSelect"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <el-option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </el-option>
      </component>
      <component
        v-else-if="isRadio"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <el-radio v-for="item in items" :key="item.value" :label="item.value">
          {{ item.text }}
        </el-radio>
      </component>
      <component
        v-else-if="isCheckbox"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <el-checkbox
          v-for="item in items"
          :key="item.value"
          :label="item.value"
        >
          {{ item.text }}
        </el-checkbox>
      </component>
      <component
        v-else
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
      </component>
      <div class="el-form-item__tip" v-if="tip">{{ tip }}</div>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss">
.el-form-item__tip {
  font-size: 12px;
  line-height: 12px;
  padding: 10px 0 5px 0;
  color: #737373;
}
</style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'el-form-adaptor',

  props: {
    tip: String,
    tooltip: String,
    name: String,
    size: {
      type: String,
      default: 'medium'
    },
    label: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    props: {
      type: Object,
      default() {
        return {};
      },
      required: false
    },
    items: {
      type: Array,
      default() {
        return [];
      },
      required: false
    },
    extend: {
      type: Object,
      default() {
        return {};
      }
    },
    metadata: {
      type: Object,
      default() {
        return {};
      }
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);
    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  },

  computed: {
    component() {
      return this.extend.component || 'el-input';
    },

    isSelect() {
      return this.component === 'el-select';
    },

    isMultipleSelect() {
      return this.isSelect && this.props.multiple;
    },

    isRadio() {
      return this.component === 'el-radio-group';
    },

    isCheckbox() {
      return this.component === 'el-checkbox-group';
    }
  },

  created() {
    const { localValue, isMultipleSelect, isCheckbox } = this;

    if (localValue == null) {
      if (isMultipleSelect || isCheckbox) {
        this.setInitialValue([]);
      }
    }
  }
};
</script>
