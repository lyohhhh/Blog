import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log(1);

    return () => 1;
  },
});
