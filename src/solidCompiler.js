import { transform } from "@babel/standalone";
import solidPreset from "babel-preset-solid";

export default (code) => transform(code, { presets: [solidPreset] });
