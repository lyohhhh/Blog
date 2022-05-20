import { IconFont } from "@/components/components";
import { defineComponent, InputHTMLAttributes, ref, renderSlot } from "vue";
import props from "./props";
import { debounce } from "@/utils";
import inputStyles from "../styles/input.module.scss";

export default defineComponent({
  name: "Input",
  props,
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const inputEl = ref<HTMLElement>();
    const renderPrefixIcon = () => {
      if (slots.prefix) return renderSlot(slots, "prefix");
      if (props.prefix)
        return (
          <div class="input--prefix">
            <IconFont icon={props.prefix}></IconFont>
          </div>
        );
      return null;
    };

    const renderSuffix = () => {
      if (props.clearable)
        return (
          <IconFont
            v-show={props.modelValue}
            onClick={() => {
              inputEl.value?.focus();
              emit("update:modelValue", "");
              inputEl.value?.focus();
            }}
            icon="roundclose"
            class="absolute hidden z-10 text-gray-300 right-0 top-0 h-full w-8  justify-center items-center cursor-pointer hover:text-gray-400 group-active:flex group-focus:flex group-hover:flex"
          ></IconFont>
        );
      if (slots.suffix) return renderSlot(slots, "suffix");
      if (props.suffix)
        return (
          <div class="input--suffix">
            <IconFont icon={props.suffix}></IconFont>
          </div>
        );
      return null;
    };

    const emitInput = debounce(
      (e: Event) => {
        const target = e.target as InputHTMLAttributes;
        emit("update:modelValue", target.value);
      },
      100,
      false
    );

    return () => (
      <div class="input group relative">
        {renderPrefixIcon()}
        <input
          class={[
            "input__inner outline-none block w-full rounded border px-4 py-2 text-sm focus:border-themetextcolor-500 placeholder-gray-300 transition-all",
            props.error && inputStyles["input__error"],
            props.clearable && "pr-8",
          ]}
          type={props.type}
          placeholder={props.placeholder}
          value={props.modelValue}
          v-model={props.modelValue}
          onInput={emitInput}
          ref={inputEl}
        />
        {renderSuffix()}
      </div>
    );
  },
});
