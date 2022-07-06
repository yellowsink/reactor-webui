import { transform } from "@babel/standalone";
import solidPreset from "babel-preset-solid";

window.test = (code) => transform(code, { presets: [solidPreset] });

export default (code) => transform(code, { presets: [solidPreset] });
