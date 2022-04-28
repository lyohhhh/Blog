import { defineComponent, reactive } from "vue";
import List, { Props } from "@/components/List";
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
          <div class="content w-9/12 mr-10 bg-white">
            <List class="box-border" list={this.list}></List>
          </div>
          <div class="slide w-3/12 bg-white rounded-md box-border"></div>
        </div>
      </>
    );
  },
});
