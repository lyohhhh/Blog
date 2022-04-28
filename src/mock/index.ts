import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/article",
    method: "get",
    response: () => {
      return {
        code: 200,
        "data|10": [
          {
            "id|+1": 1,
            title: "@cword(3,50)",
            content: "@cword(100,500)",
            time: "@date(yyyy-MM-dd)",
            author: "@cname",
            img: "@image",
          },
        ],
        message: "success",
      };
    },
  },
] as MockMethod[];
