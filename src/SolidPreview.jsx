import solidCompiler from "./solidCompiler";
import eseval from "./eseval.js";

import * as solidjs from "solid-js";
import * as solidjsweb from "solid-js/web";
import { createEffect } from "solid-js";
import { render } from "solid-js/web";

import {throttle} from "lodash"

export default (props) => {
  const transformed = () => solidCompiler(props.code).code;
  const transformedDebounced = throttle(transformed, 250);

  const evaled = () => {
    props.code;
    try {
      return eseval(transformedDebounced(), {
        "solid-js": solidjs,
        "solid-js/web": solidjsweb,
      }).default;
    } catch {}
  };

  let unrender, ref;
  createEffect(() => {
    try {
      const component = evaled();
      if (!component || !ref) return;

      unrender?.();
      unrender = render(component, ref);
    } catch {}
  });

  return <div ref={ref} />;
};