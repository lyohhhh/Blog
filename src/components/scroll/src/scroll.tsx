import { stopDefault } from '@/components/[shared]/mouse';
import { useExpose } from '@/hooks/useExpose';
import { throttle } from '@/utils';
import { defineComponent, nextTick, onMounted, reactive, ref, renderSlot, toRefs } from 'vue';
import scrollStyles from '../styles/scroll.module.scss';
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
		const isMove = ref<boolean>(false);
		const scroll = reactive<{
			wrap: undefined | HTMLElement;
			main: undefined | HTMLElement;
			barSlot: undefined | HTMLElement;
			barThumb: undefined | HTMLElement;
			wrapHeight: number;
			mainHeight: number;
			barThumbHeight: string;
			scrollY: string;
			maxScrollY: number;
			startY: number;
		}>({
			wrap: undefined,
			main: undefined,
			barSlot: undefined,
			barThumb: undefined,
			wrapHeight: 0,
			mainHeight: 0,
			barThumbHeight: '0%',
			scrollY: '0',
			maxScrollY: 0,
			startY: 0,
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

			nextTick(() => {
				const { slotHeight, thumbHeight } = getValue();
				if (thumbHeight != 0) {
					scroll.maxScrollY = ((slotHeight - thumbHeight) / thumbHeight) * 100;
				}
			});
		};

		const setScrollY = (top: number, dot = '%') => {
			scroll.scrollY = `${top}${dot}`;
		};

		const getValue = () => {
			const { wrap, mainHeight, barSlot, barThumb } = scroll;
			const scrollTop = wrap?.scrollTop || 0,
				slotHeight = barSlot?.clientHeight || 0,
				thumbHeight = barThumb?.clientHeight || 0;

			return {
				scrollTop,
				slotHeight,
				thumbHeight,
				mainHeight,
			};
		};

		const scrollEvent = throttle(
			() => {
				const { scrollTop, mainHeight, slotHeight, thumbHeight } = getValue();
				const scrollYVal = (((scrollTop / mainHeight) * slotHeight) / thumbHeight) * 100;
				setScrollY(scrollYVal);
			},
			60 / 1000,
			true
		);

		const scrollToBySlot = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			const y = e.clientY;
			const { thumbHeight, mainHeight, slotHeight } = getValue();
			const barScrollTop = ((y - thumbHeight / 2) / thumbHeight) * 100;
			setScrollY(
				barScrollTop < 0 ? 0 : barScrollTop > scroll.maxScrollY ? scroll.maxScrollY : barScrollTop
			);
			if (scroll.wrap) {
				scroll.wrap.scrollTo(0, (y / slotHeight) * mainHeight - scroll.wrap.clientHeight);
			}
		};

		const setStartY = (e: MouseEvent) => {
			const scrollY = +scroll.scrollY.replace('%', '') / 100 || 0;
			const { thumbHeight } = getValue();
			scroll.startY = e.clientY - scrollY * thumbHeight;
			setMoveStatus(true);
		};

		const setMoveStatus = (move: boolean) => {
			isMove.value = move;
			if (isMove.value) {
				window.addEventListener('mousemove', moveByMouse);
				window.addEventListener('mouseup', () => {
					isMove.value = false;
					window.removeEventListener('mousemove', moveByMouse);
				});
			}
		};
		const moveByMouse = throttle(
			(e: MouseEvent) => {
				if (!isMove.value) return;
				stopDefault(e);
				const { startY, barSlot } = scroll;
				const { thumbHeight } = getValue();
				const scrollYVal = (e.clientY - startY) / thumbHeight;

				setScrollY(
					scrollYVal < 0
						? 0
						: scrollYVal * 100 + scrollY > scroll.maxScrollY
						? scroll.maxScrollY
						: scrollYVal * 100 + scrollY
				);
				if (scroll.wrap) {
					scroll.wrap.scrollTo(
						0,
						((scrollYVal * thumbHeight) / (barSlot?.clientHeight || 0)) *
							(scroll.main?.clientHeight || 0)
					);
				}
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
			scrollToBySlot,
			setMoveStatus,
			moveByMouse,
			setStartY,
			isMove,
		};
	},
	render() {
		const props = this.$props;
		return (
			<>
				<div class={['scroll-wrapper relative', this.isMove && 'select-none']}>
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
						onClick={this.scrollToBySlot}
					>
						<div
							class={[
								'scroll-bar__thumb rounded-md w-2 bg-gray-300 active:bg-gray-400 hover:bg-gray-400 inline-block cursor-pointer opacity-0 group-hover:opacity-100 dark:bg-gray-800 dark:active:bg-gray-900 dark:hover:bg-gray-900',
								scrollStyles['transition'],
							]}
							ref='barThumb'
							onClick={stopDefault}
							onMousedown={this.setStartY}
							onMouseup={this.setMoveStatus.bind(this, false)}
							// onMousemove={this.moveByMouse}
							style={{
								height: this.barThumbHeight,
								transform: `translateY(${this.scrollY})`,
							}}
						></div>
					</div>
				</div>
			</>
		);
	},
});
