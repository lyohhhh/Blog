import { Masker, Button } from "@/components/components";
import { defineComponent, renderSlot, Teleport } from "vue";

export default defineComponent({
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    closeOnModal: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
      default: "10vh",
    },
    cancelLoading: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    cancelDisabled: {
      type: Boolean,
      default: false,
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["confirm", "cancel", "update:modelValue"],
  setup(props, { emit }) {
    const hideDialog = () => {
      emit("update:modelValue", false);
    };

    const emitConfirm = () => {
      emit("confirm");
      hideDialog();
    };

    const emitCancel = () => {
      emit("cancel");
      hideDialog();
    };

    return { hideDialog, emitConfirm, emitCancel };
  },
  render() {
    return (
      <Teleport to="body">
        {this.modelValue ? (
          <div
            class="dialog fixed bg-white rounded-md w-72 left-1/2 -translate-x-2/4 z-30 md:w-6/12 lg:w-4/12"
            style={{ top: this.top }}
          >
            <div class="dialog-title text-center p-4 text-lg font-semibold">
              {this.$slots.title ? renderSlot(this.$slots, "title") : "提示"}
            </div>
            <div class="dialog-content px-4">
              {this.$slots.default
                ? renderSlot(this.$slots, "default")
                : "content"}
            </div>
            <div class="dialog-footer p-4">
              {this.$slots.footer ? (
                renderSlot(this.$slots, "footer")
              ) : (
                <div class="flex justify-end items-center">
                  {this.showCancel && (
                    <Button
                      loading={this.cancelLoading}
                      disabled={this.cancelDisabled}
                      onClick={this.emitCancel}
                    >
                      取消
                    </Button>
                  )}
                  <Button
                    loading={this.confirmLoading}
                    disabled={this.confirmDisabled}
                    onClick={this.emitConfirm}
                    type="primary"
                  >
                    确定
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : null}
        <Masker
          show={this.modelValue}
          onChange={() => {
            this.closeOnModal ? this.hideDialog : null;
          }}
        ></Masker>
      </Teleport>
    );
  },
});