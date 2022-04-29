import { defineComponent, onBeforeMount, reactive } from "vue";
import { http } from "@/api";

export default defineComponent({
  name: "navbar",
  setup() {
    const category = reactive<Tree[]>([]);

    http("/api/category").then(({ data }) => {
      category.push(...data);
    });

    return {
      c: category,
    };
  },
  render() {
    const main = createTree(this.c);
    return (
      <div>
        <div class="side-nav-bar-masker absolute w-full h-full bg-black opacity-50 lg:hidden"></div>
        <div class="main">
          <ul class="flex relative">{main}</ul>
        </div>
      </div>
    );
  },
});

function createTree(tree: Tree[]): JSX.Element | null {
  if (!tree.length) return null;
  return (
    <>
      {tree.map((item) => {
        return (
          <li class="p-4">
            <span>{item.name}</span>
            <div class="flex-col absolute ">
              {item.children ? createTree(item.children) : null}
            </div>
          </li>
        );
      })}
    </>
  );
}
