import { defineComponent, PropType } from "vue";
import { http } from "@/api";
export interface Props {
  id: number;
  title: string;
  content: string;
  time: string;
  author: string;
  img?: string;
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
    return (
      <ul class="article-list divide-y shadow-sm divide-gray-200 dark:text-gray-300">
        {this.$props.list.map((item) => (
          <li class="article-item p-5 cursor-pointer hover:bg-gray-50">
            <p class="article-title text-2xl mb-2">{item.title}</p>
            <div class="article-content">{item.content}</div>
          </li>
        ))}
      </ul>
    );
  },
});
