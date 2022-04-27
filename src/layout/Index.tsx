import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useMode } from "@/hooks/useMode";

export default defineComponent({
  setup() {
    return {
      ...useMode(),
    };
  },
  render() {
    return (
      <>
        <header class="header shadow-xl">
          <div class="flex-row"></div>
        </header>
        <div class="container  m-auto">
          <RouterView></RouterView>
          {/* <button onClick={this.changeTailWindMode}>切换模式</button> */}
        </div>
      </>
    );
  },
});
