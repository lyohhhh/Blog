import { defineStore } from 'pinia';

export const useGlobal = defineStore('Global', {
	state() {
		return {
			user: null,
		};
	},
	getters: {},

	actions: {},
});
