import { Request } from "@/api";
import { Skeleton } from "@/components/components";
import { defineComponent, onActivated, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    const details = ref<{
      title: string;
      content: string;
      time: string;
      author: string;
    }>();
    const loading = ref<boolean>(true);

    onActivated(() => {
      const id = ref<string>(route.params.id as string);
      loading.value = true;
      Request.get("/api/details", {
        id: id.value,
      })
        .then((res) => {
          details.value = res.data;
        })
        .finally(() => {
          setTimeout(() => {
            loading.value = false;
          }, 1500);
        });
    });
    return {
      details,
      loading,
    };
  },

  render() {
    return (
      <div class="details__wrapper shadow-lg mx-4 bg-white p-4 pb-8 dark:bg-themebgcolor-900 md:mx-0 dark:shadow-themebgcolor-700">
        <Skeleton rows={5} title loading={this.loading}>
          <main
            class={["p-0 md:px-4 md:py-2 text-gray-700 dark:text-gray-400"]}
          >
            <h2 class="text-xl mb-3 font-semibold  md:text-2xl">
              {this.details?.title}
            </h2>
            <span class="inline-block mb-3 text-xs md:text-sm">
              {this.details?.time}
            </span>
            <span
              class={[
                "text-sm leading-loose tracking-wide inline-block md:tracking-widest md:text-base",
              ]}
              style={{ textIndent: "2em" }}
            >
              {this.details?.content}
            </span>
          </main>
        </Skeleton>
      </div>
    );
  },
});
