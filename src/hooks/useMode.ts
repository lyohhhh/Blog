import { useTailWind } from "@/store/tailwind";

const MODEMAP = {
  0: "light",
  1: "dark",
};

const ROOT = document.getElementsByTagName("html")[0];

const SETMODE = (mode: number) => {
  ROOT.setAttribute("class", MODEMAP[mode]);
};

export const useMode = () => {
  const tailwind = useTailWind();
  let mode = tailwind.MODE;
  SETMODE(mode);
  const changeTailWindMode = () => {
    tailwind.SET_TAILWIND_MODE(mode == 1 ? 0 : 1);
    mode = tailwind.MODE;
    SETMODE(mode);
  };
  return {
    mode,
    changeTailWindMode,
  };
};
