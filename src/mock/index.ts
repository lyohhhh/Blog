import { MockMethod } from 'vite-plugin-mock';
import { category } from './data';
export default [
	{
		url: '/api/article',
		method: 'get',
		response: () => {
			return {
				code: 200,
				'data|10': [
					{
						'id|+1': 1,
						title: '@cword(3,50)',
						content: '@cword(100,500)',
						time: '@date(yyyy-MM-dd)',
						author: '@cname',
						img: '@image(175x84)',
					},
				],
				message: 'success',
			};
		},
	},
	{
		url: '/api/category',
		method: 'get',
		response: () => {
			return {
				code: 200,
				data: category,
				message: 'success',
			};
		},
	},
	{
		url: '/api/details',
		method: 'get',
		response: () => {
			return {
				code: 200,
				data: {
					title: '@cword(3,50)',
					content: '@cword(300,1000)',
					time: '@date(yyyy-MM-dd)',
					author: '@cname',
				},
				message: 'success',
			};
		},
	},
] as MockMethod[];
