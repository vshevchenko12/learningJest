function fetchDataPromise() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('peanut butter');
		}, 100);
	});
}

function fetchDataPromiseWithError() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error('error'));
		}, 100);
	});
}

function fetchDataPromiseWithErrorMessage() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('error');
		}, 100);
	});
}

/* Promises */

// Be sure to return (or await) the promise - if you omit the return/await statement, your test will complete before the promise returned from fetchData resolves or rejects.

it('the data is peanut butter', () => {
	return fetchDataPromise().then((data) => {
		expect(data).toBe('peanut butter');
	});
});

it('the fetch fails with error', () => {
	expect.assertions(1);
	return fetchDataPromiseWithErrorMessage().catch((e) =>
		expect(e).toMatch('error')
	);
});

/* Async/Await */

it('the data is peanut butter', async () => {
	const data = await fetchDataPromise();
	expect(data).toBe('peanut butter');
});

it('the fetch fails with an error', async () => {
	expect.assertions(1);
	try {
		await fetchDataPromiseWithErrorMessage();
	} catch (e) {
		expect(e).toMatch('error');
	}
});

/* .resolves / .rejects */

// does not require to use `expect.assertions(1)`

test('the data is peanut butter  with resolve', async () => {
	await expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error  with reject', async () => {
	await expect(fetchDataPromiseWithErrorMessage()).rejects.toMatch('error');
});

test('the fetch fails with an error  with reject', async () => {
	await expect(fetchDataPromiseWithError()).rejects.toThrow('error');
});
/* Callbacks */

// Jest will throw an error, if the same test function is passed a done() callback and returns a promise. This is done as a precaution to avoid memory leaks in your tests.

function fetchData(callback) {
	setTimeout(() => {
		callback('peanut butter');
	}, 1000);
}

// // Don't do this!
// test('the data is peanut butter', () => {
//   function callback(error, data) {
//     if (error) {
//       throw error;
//     }
//     expect(data).toBe('peanut butter');
//   }

//   fetchData(callback);
// });

it('the data is peanut butter with callback', (done) => {
	// function callback(error, data) {
	//   if (error) {
	//     done(error);
	//     return;
	//   }
	function callback(data) {
		try {
			expect(data).toBe('peanut butter');
			done();
		} catch (error) {
			done(error);
		}
	}

	fetchData(callback);
});
