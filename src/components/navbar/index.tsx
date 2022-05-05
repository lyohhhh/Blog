import { defineComponent, reactive } from "vue";
import { http } from "@/api";
export default defineComponent({
  name: "navbar",
  setup() {
    const category = reactive<Tree[]>([]);
    const slideBooleanList = reactive<boolean[]>([]);
    http("/api/category").then(({ data }) => {
      category.push(...data);
      slideBooleanList.push(...new Array(data.length).fill(false));
    });

    const slideShow = (i: number) => {
      for (let item of slideBooleanList) {
        console.log(item);
        item = false;
      }
      slideBooleanList[i] = true;
    };
    const slideHide = (i: number) => {
      slideBooleanList[i] = false;
    };

    return {
      c: category,
      slideShow,
      slideHide,
      slideBooleanList,
    };
  },
  render() {
    const main = createTree.call(this, this.c);
    return (
      <div>
        {/* <div class="side-nav-bar-masker absolute w-full h-full bg-black opacity-50 lg:hidden"></div> */}
        <div class="main">
          <ul class="flex relative pr-6 ">{main}</ul>
        </div>
      </div>
    );
  },
});

function createTree(this: any, tree: Tree[]): JSX.Element | null {
  if (!tree.length) return null;
  return (
    <>
      {tree.map((item, index) => {
        return (
          <li
            class="p-4 cursor-pointer relative group"
            onMouseover={this.slideShow.bind(this, index)}
            onMouseout={this.slideHide.bind(this, index)}
          >
            <span
              class={[
                "text-sm inline-block border-themetextcolor-500 cursor-pointer box-border group-hover:border-b-2 dark:border-themetextcolor-300",
                // item.children ? "group-hover:border-b-2" : null,
              ]}
            >
              {item.name}
            </span>
            {item.children ? (
              <ul
                class={[
                  "flex-col absolute top-3/4 mt-2 py-2 rounded-md bg-white left-1/2 -translate-x-1/2 border-gray-200 border dark:bg-themebgcolor-900 dark:border-themebgcolor-500",
                  this.slideBooleanList[index] ? "block" : "hidden",
                ]}
              >
                {item.children.map((c) => (
                  <li class="whitespace-nowrap px-4 text-sm py-1.5 hover:text-themetextcolor-500 dark:hover:text-themetextcolor-300">
                    {c.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </>
  );
}
