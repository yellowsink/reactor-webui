import init, { printSync, parseSync } from "@swc/wasm-web";
import { jsxTransform } from "emitkit";
import reactor from "https://cdn.esm.sh/solid-reactor";

export const swcTransformer = jsxTransform({ printSync, parseSync });

export default (code) => swcTransformer(code, { plugin: reactor });

export const initSwc = async (setInitSignal) => {
  await init();
  setInitSignal(true);
};
