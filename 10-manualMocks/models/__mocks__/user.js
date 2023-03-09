const user = jest.createMockFromModule('../user');

user.getAuthenticated = () => ({
	age: 622,
	name: 'Mock name',
});

export default user;
