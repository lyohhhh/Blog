import { defineComponent, PropType } from "vue";

export interface Props {
  title: string;
  content: string;
  time: string;
  author: string;
}

export default defineComponent({
  props: {
    list: {
      type: [] as PropType<Props[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
  render() {
    console.log(this.$props);

    return (
      <div class="article-list">
        {this.$props.list.map((item) => (
          <div class="article-item">{item.content}</div>
        ))}
      </div>
    );
  },
});
