import { evalOutput, writeOutput } from "./helpers";
import TreeTraversalVisitor from "./visitor";

/**
 * Initializes the function by grabbing the rinha json from the specified path.
 *
 * @param {string} path - The path of AST file.
 * @return {Promise<void>} A promise that resolves when the function completes.
 */
export default async function init(path: string) {
  const filePath = "./output/index.js";

  const astJSON = await Bun.file(path).text();

  const ast = JSON.parse(astJSON);
  const treeTranspiler = new TreeTraversalVisitor();
  const transpiled = [];

  for (const key in ast) {
    transpiled.push(treeTranspiler.visit(ast[key]));
  }

  await writeOutput(filePath, transpiled);
  await evalOutput(filePath);
}
