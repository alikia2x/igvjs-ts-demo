Please put the (compiled) dev `igv.js` source tree in `../igv.js`

[src/index.ts](src/index.ts) is a purposefully badly written code that can barely stumble through the Javascript engine. I have annotated all the errors TypeScript caught in the code.

With '@ts-expect-error' magic string,
TypeScript will check that statements that are valid are accepted and those that are invalid are rejected.
Otherwise the build will fail.

To (type-test) and build the project, run:

```bash
npm install
npm run build
```

To start dev server, run:

```bash
npm install
npm run dev
```

then start a web server in the project root directory and open `index.html` in a browser.

