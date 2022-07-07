import init, { printSync, parseSync, transformSync } from "@swc/wasm-web";
import { jsxTransform } from "emitkit";
import reactorPlugin from "https://cdn.esm.sh/solid-reactor?bundle";

const internalJsxTransformer = jsxTransform({ printSync, parseSync });

let inited;
const wrapF = (f) => (c, o) => inited ? f(c, o) : { code: "" };

export const transformer = wrapF(transformSync);
export const jsxTransformer = wrapF(internalJsxTransformer);

export const reactor = (code) => jsxTransformer(code, { plugin: reactorPlugin });

export const initSwc = async (setInitSignal) => {
  await init();
  setInitSignal(true);
  inited = true;
};
