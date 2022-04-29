import { defineComponent, reactive } from "vue";
import List, { Props } from "@/components/list";
import LoadingMore from "@/components/loading";
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
        <div class="main w-full flex justify-between justify-self-start">
          <div class="content w-full  bg-white dark:bg-gray-900 dark:shadow-gray-700 lg:w-9/12">
            <LoadingMore loading={true} finished={false}>
              <List class="box-border" list={this.list}></List>
            </LoadingMore>
          </div>
          <div class="slide w-3/12 ml-10 bg-white rounded-md box-border sticky h-128 top-24 dark:bg-gray-900 dark:shadow-gray-700 hidden lg:block"></div>
        </div>
      </>
    );
  },
});
