import { defineComponent, reactive } from "vue";
import List, { Props } from "@/components/list";
import { http } from "@/api";
export default defineComponent({
  setup() {
    const list: Props[] = reactive([]);
    http("/api/article").then((res) => {
      list.push(...res.data);
    });
    return {
      list,
    };
  },
  render() {
    return (
      <>
        <div class="main w-full flex justify-between">
          <div class="content w-full  bg-white dark:bg-gray-900 dark:shadow-gray-700 md:w-9/12">
            <List class="box-border" list={this.list}></List>
          </div>
          <div class="slide w-3/12 ml-10 bg-white rounded-md box-border dark:bg-gray-900 dark:shadow-gray-700 hidden md:block"></div>
        </div>
      </>
    );
  },
});
