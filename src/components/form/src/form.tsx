import {
  defineComponent,
  onMounted,
  provide,
  ref,
  renderSlot,
  defineExpose,
} from "vue";
import props from "./form-props";
import { Validate, FormItem, key } from "./shared";
import { emitter } from "@/components/[shared]/emitter";
import formStyle from "../styles/form.module.scss";

const Form = defineComponent({
  name: "Form",
  props,
  setup(props, { slots }) {
    const items = ref<FormItem[]>([]);

    const validate = (cb: Validate) => {
      const tasks = items.value.map((item) => item.validate());

      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    };

    onMounted(() => {
      emitter.on("formItem", (item) => {
        items.value.push(item);
      });
    });
    if (props.model) {
      provide(key, {
        model: props.model,
        rules: props.rules,
      });
    }

    defineExpose({
      validate,
    });

    return () => (
      <form class={["form", props.inline && formStyle["form__inline"]]}>
        {renderSlot(slots, "default")}
      </form>
    );
  },
});

export default Form;
