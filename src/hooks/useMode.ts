import { useTailWind } from '@/store/tailwind';
import { ref } from 'vue';

const MODEMAP = {
	0: 'light',
	1: 'dark',
};

const ROOT = document.getElementsByTagName('html')[0];

const SETMODE = (mode: number) => {
	ROOT.setAttribute('class', MODEMAP[mode]);
};

export const useMode = () => {
	const tailwind = useTailWind();
	const mode = ref(tailwind.MODE);
	SETMODE(mode.value);
	const changeTailWindMode = () => {
		tailwind.SET_TAILWIND_MODE(mode.value == 1 ? 0 : 1);
		mode.value = tailwind.MODE;
		SETMODE(mode.value);
	};
	return {
		mode,
		changeTailWindMode,
	};
};
