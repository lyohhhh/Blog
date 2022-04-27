import { defineComponent } from "vue";
import List from "@/components/List";
import { Props } from "@/components/List";
export default defineComponent({
  setup() {
    const list: Props[] = [
      {
        title: "test1",
        time: new Date().toLocaleString(),
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestiae necessitatibus sequi numquam officia sit cum vitae fuga inventore quis eum odit repudiandae ad repellat eaque iusto optio, culpa cupiditate ipsa ea amet est atque? Dolore earum quis animi laboriosam quam nobis veniam, culpa sequi voluptas ducimus, voluptatum, perferendis vel?`,
        author: "superAdmin",
      },
    ];
    return {
      list,
    };
  },
  render() {
    return (
      <>
        <List list={this.list}></List>
      </>
    );
  },
});
