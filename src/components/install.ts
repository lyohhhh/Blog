import * as components from "./components";
import { register } from "./register";

console.log(Object.keys(components));

export default register({
  prefix: "",
  components: Object.keys(components).map(
    (key) => components[key as keyof typeof components]
  ),
});
