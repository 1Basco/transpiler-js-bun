export async function writeOutput(filename: string, data: any) {
  await Bun.write(filename, data);
}

export async function evalOutput(filename: string) {
  const content = await Bun.file(filename).text();

  eval(content);
}
