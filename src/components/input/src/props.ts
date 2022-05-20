export default {
  placeholder: {
    type: String,
    default: "请输入",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorPlaceholder: {
    type: String,
    default: "请输入",
  },
  prefix: String,
  suffix: String,
  modelValue: {
    type: [String, Number],
    required: true,
  },
};
