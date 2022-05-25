import request from '@/utils/http';
import { AxiosRequestConfig } from 'axios';

interface RequestOpt {
	'/api/article': null;
	'/api/category': null;
	'/api/details': {
		id: string;
	};
}

export class Request {
	static get<T extends keyof RequestOpt>(url: T, params: RequestOpt[T]) {
		return new Promise<HttpResponse>((resolve, reject) => {
			request
				.get(url, params as AxiosRequestConfig<RequestOpt[T]>)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	static post<T extends keyof RequestOpt>(url: T, params: RequestOpt[T]) {
		return new Promise<HttpResponse>((resolve, reject) => {
			request
				.post(url, params as AxiosRequestConfig<RequestOpt[T]>)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}
