import { defineComponent, renderSlot } from "vue";
import props from "./form-item-props";

import itemStyles from "../styles/formItem.module.scss";
console.log(itemStyles);

const FormItem = defineComponent({
  name: "FormItem",
  props,
  setup(props, { slots }) {
    // label 属性
    const renderLabelAttr = () => {
      const attr: {
        for?: string;
      } = {};
      if (props.prop) attr.for = props.prop;
      return attr;
    };
    console.log(props.required);
    return () => (
      <>
        <div class="form-item mb-4">
          <label
            {...renderLabelAttr()}
            class={[
              "form-item__label block text-gray-500 text-sm mb-1",
              props.required && itemStyles["is-required"],
            ]}
          >
            {props.label}
          </label>
          <div class="form-item__inner">{renderSlot(slots, "default")}</div>
        </div>
      </>
    );
  },
});

export default FormItem;
