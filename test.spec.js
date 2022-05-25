/**
 * jest 测试
 */

const say = (name, fn) => {
	console.log(`name is ${name}`);
	fn();
};

test('测试两数是否相等', () => {
	expect(1 + 2).toBe(3);
});

test('测试函数', () => {
	const fn = jest.fn();
	say('Tom', fn);
	expect(fn).toHaveBeenCalled();
});
