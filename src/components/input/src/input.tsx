import { IconFont } from "@/components/components";
import { defineComponent, InputHTMLAttributes, ref, renderSlot } from "vue";
import props from "./props";
import { debounce } from "@/utils";
import inputStyles from "../styles/input.module.scss";
inputStyles;
export default defineComponent({
  name: "Input",
  props,
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const inputEl = ref<HTMLElement>();

    const renderPrefixIcon = () => {
      const prefixClass =
        "bottom-0 left-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400";
      if (slots.prefix)
        return (
          <span class={["input--prefix", prefixClass]}>
            {renderSlot(slots, "prefix")}
          </span>
        );
      if (props.prefixIcon)
        return (
          <span class={["input--prefix__icon", prefixClass]}>
            <IconFont icon={props.prefixIcon}></IconFont>
          </span>
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
      if (slots.suffix)
        return (
          <span class="input--suffix bottom-0 right-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400">
            {renderSlot(slots, "suffix")}
          </span>
        );
      if (props.suffixIcon)
        return (
          <span class="input--suffix__icon">
            <IconFont icon={props.suffixIcon}></IconFont>
          </span>
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
      <div
        class={[
          "input group relative",
          props.disabled && inputStyles["is-disabled"],
        ]}
      >
        {renderPrefixIcon()}
        <input
          class={[
            "input__inner outline-none bg-white block w-full rounded border px-4 py-2 text-sm focus:border-themetextcolor-500 placeholder-gray-300 transition-all text-gray-600 dark:bg-themebgcolor-800 dark:border-themebgcolor-600 caret-themebgcolor-400",
            props.error && inputStyles["input__error"],
            (props.prefixIcon || slots.prefix) && "pl-8",
            (props.clearable || props.suffixIcon || slots.suffix) && "pr-8",
          ]}
          type={props.type}
          placeholder={props.placeholder}
          value={props.modelValue}
          v-model={props.modelValue}
          onInput={emitInput}
          disabled={props.disabled}
          ref={inputEl}
        />
        {renderSuffix()}
      </div>
    );
  },
});
