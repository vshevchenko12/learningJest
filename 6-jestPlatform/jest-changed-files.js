const { getChangedFilesForRoots } = require('jest-changed-files');

// print the set of modified files since last commit in the current repo
getChangedFilesForRoots(['../'], {
	// lastCommit: true,
	// withAncestor: true,
	changedSince: 'main',
}).then((result) => console.log(result));
