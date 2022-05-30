import useScroll from '@/hooks/useScroll';
import { nextTick } from 'vue';

let scroll = useScroll();
export default {
	mounted() {
		scroll = useScroll();
	},
	methods: {
		resetScroll() {
			nextTick(() => {
				scroll.value.resetScroll();
			});
		},
		scrollTo(x: string | number, y: string | number) {
			nextTick(() => {
				scroll.value.scrollTo(x, y);
			});
		},
		getScroll() {
			return scroll.value.getScroll();
		},
	},
};
