// Copyright (c) Meta Platforms, Inc. and affiliates.. All Rights Reserved.

'use strict';

import renderer from 'react-test-renderer';
import Link from '../Link';

it('renders correctly', () => {
	const tree = renderer
		.create(<Link page="https://example.com">Example Site</Link>)
		.toJSON();
	expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://example.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Example Site
</a>
`);
});
