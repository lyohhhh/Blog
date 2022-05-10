import { defineComponent, KeepAlive, reactive, toRefs } from "vue";
import List, { Props } from "@/components/list";
import LoadingMore from "@/components/loading";
import { http } from "@/api";

interface LoadOpts {
  loading: boolean;
  finished: boolean;
  pageSize: number;
  pageIndex: number;
}

export default defineComponent({
  setup() {
    const list: Props[] = reactive([]);
    const loadOpts = reactive<LoadOpts>({
      loading: false,
      finished: false,
      pageSize: 10,
      pageIndex: 1,
    });
    const fetch = () => {
      loadOpts.loading = true;
      http("/api/article")
        .then((res) => {
          if (res.code == 200) {
            list.push(...res.data);
            loadOpts.pageIndex++;
            if (loadOpts.pageIndex > 4) {
              loadOpts.finished = true;
            }
          }
        })
        .finally(() => {
          loadOpts.loading = false;
        });
    };

    return {
      list,
      fetch,
      ...toRefs(loadOpts),
    };
  },
  render() {
    return (
      <>
        <div class="main w-full flex justify-between justify-self-start">
          <div class="content w-full bg-white dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700 lg:w-9/12">
            <LoadingMore
              loading={this.loading}
              finished={this.finished}
              onLoad={this.fetch}
            >
              <List class="box-border" list={this.list}></List>
            </LoadingMore>
          </div>
          <div class="slide w-3/12 ml-10 bg-white rounded-md box-border sticky h-128 top-24 dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700 hidden lg:block"></div>
        </div>
      </>
    );
  },
});
