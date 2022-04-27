import { defineComponent, PropType } from "vue";

export interface Props {
  title: string;
  content: string;
  time: string;
  author: string;
}

export default defineComponent({
  props: {
    list: [] as PropType<Props[]>,
    default: () => [],
  },
  setup() {
    return {};
  },
  render() {
    return (
      <div class="article-list">
        <div class="article-item">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Exercitationem pariatur quidem tenetur corporis repellendus architecto
          modi non repellat beatae facilis temporibus quam in cum aliquam, quo
          quisquam molestias omnis voluptatem sapiente. Voluptate cum eligendi
          exercitationem illum repellat pariatur perspiciatis omnis, dolores
          magnam rerum reprehenderit sunt dolorum veritatis veniam doloremque,
          amet, necessitatibus at consectetur ex saepe. Architecto quaerat,
          nesciunt, modi ratione magnam corrupti necessitatibus repudiandae a
          ipsum et ad officiis sint dignissimos odio repellendus beatae harum
          voluptas distinctio ullam eius commodi ea! Fugiat eveniet natus
          delectus cumque illum, pariatur ad accusamus architecto excepturi
          reprehenderit amet eius sit distinctio voluptatum inventore a!
        </div>
      </div>
    );
  },
});
