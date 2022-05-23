import { PropType } from "vue";

export default {
  model: {
    type: Object as PropType<{ [key: string]: any }>,
  },
  rules: {
    type: Object as PropType<{ [key: string]: any }>,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String as PropType<"left" | "right" | "top">,
    default: "right",
  },
  labelWidth: {
    type: String,
  },
  labelSuffix: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
};
