import {
	defineComponent,
	reactive,
	ref,
	toRefs,
	onActivated,
	getCurrentInstance,
	ComponentInternalInstance,
} from 'vue';
import { Props } from '@/components/list/src';
import { Request } from '@/api';
import { Skeleton, LoadingMore, List, RAside } from '@/components/components';
import { onBeforeRouteLeave } from 'vue-router';
import scrollMixins from '@/mixins/scroll';
interface LoadOpts {
	loading: boolean;
	finished: boolean;
	pageSize: number;
	pageIndex: number;
}

export default defineComponent({
	mixins: [scrollMixins],
	setup() {
		const { proxy } = getCurrentInstance() as ComponentInternalInstance as {
			[key: string]: any;
		};

		const scrollValue = ref<{
			x: number;
			y: number;
		}>({
			x: 0,
			y: 0,
		});
		onActivated(() => {
			proxy.resetScroll();
			proxy.scrollTo(scrollValue.value.x, scrollValue.value.y);
		});

		onBeforeRouteLeave(() => {
			scrollValue.value = proxy.getScroll();
		});

		const list: Props[] = reactive([]);
		const skeletonLoading = ref<boolean>(true);
		const loadOpts = reactive<LoadOpts>({
			loading: false,
			finished: false,
			pageSize: 10,
			pageIndex: 1,
		});
		const fetch = () => {
			loadOpts.loading = true;
			Request.get('/api/article', null)
				.then(res => {
					if (res.code == 200) {
						list.push(...res.data);
						loadOpts.pageIndex++;
						if (loadOpts.pageIndex > 4) {
							loadOpts.finished = true;
						}
					}
				})
				.finally(() => {
					loadOpts.loading = false;
					proxy.resetScroll();
					setTimeout(() => {
						skeletonLoading.value = false;
						proxy.resetScroll();
					}, 1500);
				});
		};

		fetch();

		return {
			list,
			fetch,
			skeletonLoading,
			...toRefs(loadOpts),
		};
	},
	render() {
		return (
			<>
				<div class='main w-full flex justify-between justify-self-start px-4 sm:px-0'>
					<div class='content shadow-lg w-full bg-white dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700 lg:w-9/12 '>
						<Skeleton image loading={this.skeletonLoading} items={3}>
							<LoadingMore loading={this.loading} finished={this.finished} onLoad={this.fetch}>
								<List class='box-border' list={this.list}></List>
							</LoadingMore>
						</Skeleton>
					</div>
					<RAside></RAside>
				</div>
			</>
		);
	},
});
