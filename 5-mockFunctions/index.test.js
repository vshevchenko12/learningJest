function forEach(items, callback) {
	for (let index = 0; index < items.length; index++) {
		callback(items[index]);
	}
}

/** Using a mock function */

it('forEach mock function', () => {
	const mockCallback = jest.fn((x) => 42 + x);

	forEach([0, 1], mockCallback);

	// The mock function was called twice
	expect(mockCallback.mock.calls).toHaveLength(2);

	// The first argument of the first call to the function was 0
	expect(mockCallback.mock.calls[0][0]).toBe(0);

	// The first argument of the second call to the function was 1
	expect(mockCallback.mock.calls[1][0]).toBe(1);

	// The return value of the first call to the function was 42
	expect(mockCallback.mock.results[0].value).toBe(42);

	// The return value of the second call to the function was 43
	expect(mockCallback.mock.results[1].value).toBe(43);

	// console.log(mockCallback.mock);
	/**{
      calls: [ [ 0 ], [ 1 ] ],
      contexts: [ undefined, undefined ],
      instances: [ undefined, undefined ],
      invocationCallOrder: [ 1, 2 ],
      results: [ { type: 'return', value: 42 }, { type: 'return', value: 43 } ],
      lastCall: [ 1 ]
    } */
});

/** .mock property */

it('this', () => {
	const myMock1 = jest.fn();
	const a = new myMock1();
	a.name = 'a';
	console.log(myMock1.mock.instances);
	// > [ {name: 'a'} ]
	// console.log(myMock1.mock);
	/**{
      calls: [ [] ],
      contexts: [ mockConstructor { name: 'a' } ],
      instances: [ mockConstructor { name: 'a' } ],
      invocationCallOrder: [ 3 ],
      results: [ { type: 'return', value: undefined } ],
      lastCall: []
    } */

	const myMock2 = jest.fn();
	const b = {};
	b.name = 'b';
	const bound = myMock2.bind(b); //bind means replace `this` instance
	bound();
	console.log(myMock2.mock.contexts);
	// > [ {name: 'b'} ]
	// console.log(myMock2.mock);
	/**{
      calls: [ [] ],
      contexts: [ { name: 'b' } ],
      instances: [ { name: 'b' } ],
      invocationCallOrder: [ 4 ],
      results: [ { type: 'return', value: undefined } ],
      lastCall: []
    } */
});

it('someMockFunction', () => {
	const someMockFunction = jest.fn(() => 'return value');

	someMockFunction('first arg', 'second arg');

	// The function was called exactly once
	expect(someMockFunction.mock.calls).toHaveLength(1);

	// The first arg of the first call to the function was 'first arg'
	expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

	// The second arg of the first call to the function was 'second arg'
	expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

	// The return value of the first call to the function was 'return value'
	expect(someMockFunction.mock.results[0].value).toBe('return value');

	// console.log(someMockFunction.mock);
	/**{
      calls: [ [ 'first arg', 'second arg' ] ],
      contexts: [ undefined ],
      instances: [ undefined ],
      invocationCallOrder: [ 5 ],
      results: [ { type: 'return', value: 'return value' } ],
      lastCall: [ 'first arg', 'second arg' ]
    } */

	const MockFunction = jest.fn();

	const b = `element`;
	const bound = MockFunction.bind(b);
	bound();

	// The function was called with a certain `this` context: the `element` object.
	expect(MockFunction.mock.contexts[0]).toBe('element');

	// console.log(MockFunction.mock);
	/**{
      calls: [ [] ],
      contexts: [ 'element' ],
      instances: [ 'element' ],
      invocationCallOrder: [ 6 ],
      results: [ { type: 'return', value: undefined } ],
      lastCall: []
    } */

	const someMockConstractor = jest.fn();

	const a = new someMockConstractor();
	a.name = 'test';

	new someMockConstractor('test');

	// This function was instantiated exactly twice
	expect(someMockConstractor.mock.instances.length).toBe(2);

	// The object returned by the first instantiation of this function
	// had a `name` property whose value was set to 'test'
	expect(someMockConstractor.mock.instances[0].name).toBe('test');

	// The first argument of the last call to the function was 'test'
	expect(someMockConstractor.mock.lastCall[0]).toBe('test');

	// console.log(someMockConstractor.mock);
	/**{
      calls: [ [], [ 'test' ] ],
      contexts: [ mockConstructor { name: 'test' }, mockConstructor {} ],
      instances: [ mockConstructor { name: 'test' }, mockConstructor {} ],
      invocationCallOrder: [ 7, 8 ],
      results: [
        { type: 'return', value: undefined },
        { type: 'return', value: undefined }
      ],
      lastCall: [ 'test' ]
    } */
});

/** Mock Return Values */

it('return value', () => {
	const myMock = jest.fn();
	console.log(myMock());
	// > undefined

	myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

	console.log(myMock(), myMock(), myMock(), myMock());
	// > 10, 'x', true, true
});

it('filtertest', () => {
	const filterTestFn = jest.fn();

	// Make the mock return `true` for the first call,
	// and `false` for the second call
	filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

	// const result = [11, 12].filter(filterTestFn); // [ [ 11, 0, [ 11, 12 ] ], [ 12, 1, [ 11, 12 ] ] ]
	const result = [11, 12].filter((num) => filterTestFn(num)); // [ [ 11 ], [ 12 ] ]

	console.log(result);
	// > [11]
	console.log(filterTestFn.mock.calls[0][0]); // 11
	console.log(filterTestFn.mock.calls[1][0]); // 12
	// console.log(filterTestFn.mock);
	/**{
      calls: [ [ 11 ], [ 12 ] ],
      contexts: [ undefined, undefined ],
      instances: [ undefined, undefined ],
      invocationCallOrder: [ 14, 15 ],
      results: [ { type: 'return', value: true }, { type: 'return', value: false } ],
      lastCall: [ 12 ]
    } */
});

/** Mock Implementations */

it('mockImplementation', () => {
	const myMockFn = jest.fn((cb) => cb(null, true));

	myMockFn((err, val) => console.log(val));
	// > true
});

it('mockImplementationOnce', () => {
	const myMockFn = jest
		.fn()
		.mockImplementationOnce((cb) => cb(null, true))
		.mockImplementationOnce((cb) => cb(null, false));

	myMockFn((err, val) => console.log(val));
	// > true

	myMockFn((err, val) => console.log(val));
	// > false
});

it('mockImplementationOnce', () => {
	const myMockFn = jest
		.fn(() => 'default')
		.mockImplementationOnce(() => 'first call')
		.mockImplementationOnce(() => 'second call');

	console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
	// > 'first call', 'second call', 'default', 'default'
});

it('return this', () => {
	const myObj = {
		myMethod: jest.fn().mockReturnThis(),
	};

	// is the same as

	const otherObj = {
		myMethod: jest.fn(function () {
			return this;
		}),
	};

	// console.log(myObj.myMethod());
	/**{
      myMethod: [Function: mockConstructor] {
        _isMockFunction: true,
        getMockImplementation: [Function (anonymous)],
        mock: [Getter/Setter],
        mockClear: [Function (anonymous)],
        mockReset: [Function (anonymous)],
        mockRestore: [Function (anonymous)],
        mockReturnValueOnce: [Function (anonymous)],
        mockResolvedValueOnce: [Function (anonymous)],
        mockRejectedValueOnce: [Function (anonymous)],
        mockReturnValue: [Function (anonymous)],
        mockResolvedValue: [Function (anonymous)],
        mockRejectedValue: [Function (anonymous)],
        mockImplementationOnce: [Function (anonymous)],
        withImplementation: [Function: bound withImplementation],
        mockImplementation: [Function (anonymous)],
        mockReturnThis: [Function (anonymous)],
        mockName: [Function (anonymous)],
        getMockName: [Function (anonymous)]
      }
    } */
	// console.log(otherObj.myMethod());
	/**{
      myMethod: [Function: mockConstructor] {
        _isMockFunction: true,
        getMockImplementation: [Function (anonymous)],
        mock: [Getter/Setter],
        mockClear: [Function (anonymous)],
        mockReset: [Function (anonymous)],
        mockRestore: [Function (anonymous)],
        mockReturnValueOnce: [Function (anonymous)],
        mockResolvedValueOnce: [Function (anonymous)],
        mockRejectedValueOnce: [Function (anonymous)],
        mockReturnValue: [Function (anonymous)],
        mockResolvedValue: [Function (anonymous)],
        mockRejectedValue: [Function (anonymous)],
        mockImplementationOnce: [Function (anonymous)],
        withImplementation: [Function: bound withImplementation],
        mockImplementation: [Function (anonymous)],
        mockReturnThis: [Function (anonymous)],
        mockName: [Function (anonymous)],
        getMockName: [Function (anonymous)]
      }
    } */
});

/** Mock Names */

it('mock name', () => {
	const myMockFn = jest
		.fn()
		.mockReturnValue('default')
		.mockImplementation((scalar) => 42 + scalar)
		.mockName('add42');

	// expect(myMockFn).toHaveBeenCalled();
});

/** Custom Matchers */

it('custom matchers', () => {
	const mockFunc = jest.fn();

	const arg1 = 'arg1';
	const arg2 = 'arg2';

	mockFunc(arg1, arg2);

	// The mock function was called at least once
	expect(mockFunc).toHaveBeenCalled();

	// The mock function was called at least once with the specified args
	expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

	// The last call to the mock function was called with the specified args
	expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

	// All calls and the name of the mock is written as a snapshot
	expect(mockFunc).toMatchSnapshot();
});

it('common matchers', () => {
	const mockFunc = jest.fn().mockName('a mock name');

	const arg1 = 42;
	const arg2 = 'arg2';

	mockFunc(arg1, arg2);

	// The mock function was called at least once
	expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

	// The mock function was called at least once with the specified args
	expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

	// The last call to the mock function was called with the specified args
	expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
		arg1,
		arg2,
	]);

	// The first arg of the last call to the mock function was `42`
	// (note that there is no sugar helper for this specific of an assertion)
	expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

	// A snapshot will check that a mock was invoked the same number of times,
	// in the same order, with the same arguments. It will also assert on the name.
	expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
	expect(mockFunc.getMockName()).toBe('a mock name');
});
