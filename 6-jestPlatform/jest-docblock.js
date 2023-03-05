const code = `
/**
 * Everything is awesome!
 *
 * @everything is:awesome
 * @flow
 */

 export const everything = Object.create(null);
 export default function isAwesome(something) {
   return something === everything;
 }
`;

const {
	extract,
	strip,
	parse,
	parseWithComments,
	print,
} = require('jest-docblock');

const docblock = extract(code);
console.log(docblock); // "/**\n * Everything is awesome!\n * \n * @everything is:awesome\n * @flow\n */"

const stripped = strip(code);
console.log(stripped); // "export const everything = Object.create(null);\n export default function isAwesome(something) {\n return something === everything;\n }"

const pragmas = parse(docblock);
console.log(pragmas); // { everything: "is:awesome", flow: "" }

const parsed = parseWithComments(docblock);
console.log(parsed); // { comments: "Everything is awesome!", pragmas: { everything: "is:awesome", flow: "" } }

console.log(print({ pragmas, comments: 'hi!' })); // /**\n * hi!\n *\n * @everything is:awesome\n * @flow\n */;
