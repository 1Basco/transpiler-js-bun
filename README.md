# interp

To install dependencies:

```bash
bun install
```

To run:
* Add a new AST on to the rinha folder like so > {filename}.rinha.json
* Change the string that identifies the file in the init Function on the index.ts file Eg:..
```typescript
init("filename");
```
* Run:
```bash
bun run start
```
* It will create a transpiled version and run the same. The output should be a js file on the output folder named index.js
* If you're using the Dockerfile just change the init function. Build and run;
This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
