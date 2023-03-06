it('will fail every time', () => {
	Date.now = jest.fn(() => 1482363367071);

	const user = {
		createdAt: Date.now(),
		id: Math.floor(Math.random() * 20),
		name: 'Bond... James Bond',
	};

	expect(user).toMatchInlineSnapshot({
  id: expect.any(Number)
}, `
{
  "createdAt": 1482363367071,
  "id": Any<Number>,
  "name": "Bond... James Bond",
}
`);
});
