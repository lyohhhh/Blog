import {
  defineComponent,
  inject,
  onMounted,
  ref,
  renderSlot,
  provide,
  toRefs,
  Transition,
  reactive,
} from "vue";
import { default as FormItemProp } from "./form-item-props";
import itemStyles from "../styles/formItem.module.scss";
import { FormItem as FormItemType, key } from "./shared";
import Schema from "async-validator";
import { Events, emitter as emitBus } from "@/components/[shared]/emitter";
import mitt from "mitt";
import { useExpose } from "@/hooks/useExpose";

const FormItem = defineComponent({
  name: "FormItem",
  props: FormItemProp,
  setup(props, { slots }) {
    const error = ref<string>("");
    const isError = ref<boolean>(false);
    const formProp = inject(key);
    const emitter = mitt<Events>();
    const isRequired = ref<boolean>(false);

    for (const rule in props.rules) {
      if (props.rules[rule]?.required) {
        isRequired.value = !!props.rules?.required;
        break;
      }
    }

    // debugger;
    const validate = () => {
      if (formProp?.rules === undefined) {
        return Promise.resolve({ result: true });
      }
      const prop = props.prop as string;
      const rule = formProp.rules[prop];
      if (!rule) {
        return Promise.resolve({ result: true });
      }
      const value = formProp.model[prop];
      const schema = new Schema({ [prop]: rule });

      return schema.validate({ [prop]: value }, (err) => {
        if (err) {
          isError.value = true;
          error.value = rule[0].message || "效验错误";
        } else {
          isError.value = false;
          error.value = "";
        }
      });
    };

    const params: FormItemType = {
      validate,
    };

    useExpose({
      params,
    });

    onMounted(() => {
      if (props.prop) {
        emitter.on("validate", () => {
          validate();
        });
        emitBus.emit("formItem", params);
      }
    });

    const formItemProvide = reactive({
      ...toRefs(props),
      emitter,
      validate,
    });

    provide("formItemProvide", formItemProvide);

    // label 属性
    const renderLabelAttr = () => {
      const attr: {
        for?: string;
      } = {};
      if (props.prop) attr.for = props.prop;
      return attr;
    };

    return () => (
      <>
        <div
          class={[
            "form-item mb-6 flex",
            isError.value && itemStyles["is-error"],
          ]}
        >
          <label
            {...renderLabelAttr()}
            class={[
              "form-item__label flex text-gray-500 text-sm mb-1 justify-end items-center pr-3 dark:text-gray-300",
              (props.required || isRequired) && itemStyles["is-required"],
            ]}
            style={{ width: props.labelWidth || "60px" }}
          >
            {props.label}
          </label>
          <div class="form-item__inner flex-1 relative transition-all duration-300">
            {renderSlot(slots, "default")}

            <Transition
              enterFromClass={itemStyles["fade-enter"]}
              leaveToClass={itemStyles["fade-enter"]}
              enterActiveClass={itemStyles["fade-active"]}
              leaveActiveClass={itemStyles["fade-active"]}
            >
              {isError.value ? (
                <span class="form-item__error absolute text-xs pt-0.5 text-themeerrorcolor-400">
                  {error.value}
                </span>
              ) : null}
            </Transition>
          </div>
        </div>
      </>
    );
  },
});

export default FormItem;
