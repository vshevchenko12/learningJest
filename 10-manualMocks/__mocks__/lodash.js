const lodash = jest.createMockFromModule('lodash');

lodash.head = (arr) => 5;

export default lodash;
