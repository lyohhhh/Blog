import { defineComponent, renderSlot } from "vue";
import props from "./form-props";

import formStyle from "../styles/form.modules.scss";

const Form = defineComponent({
  name: "Form",
  props,
  setup(props, { slots }) {
    return () => (
      <form class={["form", props.inline && formStyle["form__inline"]]}>
        {renderSlot(slots, "default")}
      </form>
    );
  },
});

export default Form;
