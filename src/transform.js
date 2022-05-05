import init, { printSync, parseSync } from "@swc/wasm-web";
import { jsxTransform } from "emitkit";
import reactor from "../../solid-reactor";

export default (code) =>
  jsxTransform({ printSync, parseSync })(code, { plugin: reactor });

export const initSwc = async (setInitSignal) => {
  await init();
  setInitSignal(true);
};
