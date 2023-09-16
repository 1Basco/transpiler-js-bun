import { evalOutput, writeOutput } from "./helpers";
import TreeTraversalVisitor from "./visitor";

/**
 * Initializes the function by grabbing the rinha json from the specified astName.
 *
 * @param {string} astName - The name of the AST file to grab the rinha json from.
 * @return {Promise<void>} A promise that resolves when the function completes.
 */
export default async function init(astName: string) {
  const filePath = "./output/index.js";
  // grab the rinha json
  const astJSON = await Bun.file(`./rinha/${astName}.rinha.json`).text();

  const ast = JSON.parse(astJSON);
  const treeTranspiler = new TreeTraversalVisitor();
  const transpiled = [];

  for (const key in ast) {
    transpiled.push(treeTranspiler.visit(ast[key]));
  }

  await writeOutput(filePath, transpiled);
  await evalOutput(filePath);
}
