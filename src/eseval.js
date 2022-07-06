// makes an es module an IIFE then evals it
// special thanks to creatable - this file has kinda been a team effort -- yellowsink

const funnyEvalCopy = eval;

// todo: make regex account for single quotes
const importRegex = /import\s+(.*?)\s+from\s+"(.*?)"/g;
const alphaNumericRegex = /^[a-z0-9]+$/i;

/*function getEsmShVersion(dep) {
	if (!dep.startsWith("http:") && !dep.startsWith("https:"))
		return "https://esm.sh/" + dep;

	return dep;
}*/

function getImports(code, deps) {
  const importList = [...code.matchAll(importRegex)].map((i) => [
    i[1].split(/,(?=[^}]*(?:{|$))/g).map((i) => {
      const imp = i.trim();

      const allImport = imp.split("* as");
      if (allImport.length > 1)
        return `{ ...${allImport[1].split("}")[0].trim()} }`;

      if (imp.includes(" as ")) return imp.replaceAll(" as ", ": ");

      if (alphaNumericRegex.test(imp)) return `{ default: ${imp} }`;

      return imp;
    }),
    i[2],
  ]);

  const resolvedImports = [];
  const resolvedUrlImports = {};

  for (const imps of importList) {
    let dep = imps[1];

    if (!deps?.[dep] && !resolvedUrlImports[dep]) {
      const id = "$ESVALURLIMPORT_" + Math.random().toString(36).slice(2);
      resolvedUrlImports[dep] = id;
      dep = id;
    }

    for (const imp of imps[0])
      resolvedImports.push(
        `const ${imp} = ${
          dep.startsWith("$ESVALURLIMPORT_") ? dep : `deps["${dep}"]`
        };`
      );
  }

  return [resolvedImports, resolvedUrlImports];
}

const processExports = (code) =>
  code
    .replaceAll("export default", "$$$$$$exp.default=")
    .replaceAll(/export const (.*?)\s*=/g, "$$$$$$exp['$1']=")
    .replaceAll(/export function (.*?)\(/g, "$$$$$$exp['$1']=function(");

export default (code, deps = {}) => {
  if (!code) return;

  const [resolvedImports, resolvedUrlImports] = getImports(code, deps);

  /*const urlImportCode = Object.entries(resolvedUrlImports).map(
		(urlImp, val) =>
			`const ${val} = await import("${getEsmShVersion(urlImp)}");`
	);*/

  const resolvedImportCode = resolvedImports.join("");

  const userCode = processExports(
    code.replaceAll(/import\s+(.*)\s+from\s+"(.*)"[;]?[\n]?/g, "")
  );

  let finalCode = `(/*async*/ (deps) => {
    let $$$exp = {};
${/*urlImportCode*/ ""}${resolvedImportCode}${userCode}
return $$$exp;
})`;

  return funnyEvalCopy(finalCode)(deps);
};
