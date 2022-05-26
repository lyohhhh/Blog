import { useExpose } from '@/hooks/useExpose';
import { throttle } from '@/utils';
import { defineComponent, onMounted, reactive, renderSlot, toRefs } from 'vue';

export default defineComponent({
	name: 'Scroll',
	props: {
		height: {
			type: String,
			default: '100%',
		},
		slotColor: {
			type: String,
			default: 'transparent',
		},
		class: {
			type: String,
			default: '',
		},
	},

	setup() {
		const scroll = reactive<{
			wrap: undefined | HTMLElement;
			main: undefined | HTMLElement;
			barSlot: undefined | HTMLElement;
			barThumb: undefined | HTMLElement;
			wrapHeight: number;
			mainHeight: number;
			barThumbHeight: string;
			scrollX: string;
		}>({
			wrap: undefined,
			main: undefined,
			barSlot: undefined,
			barThumb: undefined,
			wrapHeight: 0,
			mainHeight: 0,
			barThumbHeight: '0%',
			scrollX: '0',
		});

		onMounted(() => {
			resetScroll();
		});

		const resetScroll = () => {
			const { wrap, main } = scroll;
			scroll.wrapHeight = wrap?.clientHeight || 0;
			scroll.mainHeight = main?.clientHeight || 0;
			const rate = (scroll.wrapHeight / scroll.mainHeight) * 100;
			scroll.barThumbHeight = `${rate >= 100 ? 0 : rate}%`;
		};

		const scrollY = (top: number, dot = '%') => {
			scroll.scrollX = `${top}${dot}`;
		};

		const scrollEvent = throttle(
			() => {
				const { wrap, mainHeight, barSlot, barThumb } = scroll;
				const scrollTop = wrap?.scrollTop || 0,
					slotHeight = barSlot?.clientHeight || 0,
					thumbHeight = barThumb?.clientHeight || 0;
				const scrollYVal = (((scrollTop / mainHeight) * slotHeight) / thumbHeight) * 100;
				scrollY(scrollYVal);
			},
			60 / 1000,
			true
		);

		useExpose({
			resetScroll,
		});

		return {
			...toRefs(scroll),
			scrollEvent,
		};
	},
	render() {
		const props = this.$props;
		return (
			<>
				<div class={['scroll-wrapper relative']}>
					<div
						class={['scroll-main w-full overflow-auto', props.class]}
						ref='wrap'
						style={{ height: `calc(100vh - 128px)` }}
						onScroll={this.scrollEvent}
					>
						<div class='scroll-main__view' ref='main'>
							{renderSlot(this.$slots, 'default')}
						</div>
					</div>
					{/* <div class='scroll-bar is-horizontal'>
					<div
						class='scroll-bar__thumb'
						style={{ height: props.hBarheight, background: props.hBarColor }}
					></div>
				</div> */}
					<div
						class='scroll-bar is-vertical absolute right-0.5 top-1 bottom-1 text-right'
						ref='barSlot'
					>
						<div
							class='scroll-bar__thumb rounded-md w-2 bg-gray-300 active:bg-gray-400 inline-block cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity dark:bg-gray-800 dark:active:bg-gray-900'
							ref='barThumb'
							style={{
								height: this.barThumbHeight,
								transform: `translateY(${this.scrollX})`,
							}}
						></div>
					</div>
				</div>
			</>
		);
	},
});
