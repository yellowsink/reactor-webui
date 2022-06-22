// makes an es module an IIFE then evals it

const funnyEvalCopy = eval;

export default (code, deps) => {
	if (!code) return;

  // doesnt support `as` lmao
  const regexed = code
    .replaceAll(
      /import\s+(.+),\s*{(.*)}\s+from\s+"(.*)"/g,
      "const { default: $1, $2 } = $3"
    )
    .replaceAll(/import\s+{(.*)}\s+from\s+"(.*)"/g, "const { $1 } = $2")
    .replaceAll(/import\s+(.*)\s+from\s+"(.*)"/g, "const $1 = $2")
	  .replaceAll("export default", "const $$ESEVAL_DEFAULT =");

  const depKeys = Object.keys(deps ?? {}).join(", ");

	const finalCode = `(({${depKeys}} = {}) => {${regexed}
return $ESEVAL_DEFAULT
})`;
	return funnyEvalCopy(finalCode)(deps);
};
