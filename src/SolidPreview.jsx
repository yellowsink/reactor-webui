import solidCompiler from "./solidCompiler";
import eseval from "./eseval.js";

import * as solidjs from "solid-js";
import * as solidjsweb from "solid-js/web";
import { createEffect, createSignal, Show } from "solid-js";
import { render } from "solid-js/web";

import { throttle } from "lodash";
import MonacoEditor from "./MonacoEditor";

export default (props) => {
  const transformed = () => solidCompiler(props.code).code;
  const transformedDebounced = throttle(transformed, 250);

  const [err, setErr] = createSignal();

  const evaled = () => {
    props.code;
    try {
      return eseval(transformedDebounced(), {
        "solid-js": solidjs,
        "solid-js/web": solidjsweb,
      }).default;
    } catch (e) {
      setErr(e);
    }
  };

  const refCb = (ref) => {
    const root = ref.attachShadow({ mode: "open" });

    let unrender;
    createEffect(() => {
      try {
        const component = evaled();
        if (!component) return;

        unrender?.();
        unrender = render(component, root);
        setErr(null);
      } catch (e) {
        setErr(e);
      }
    });
  };

  return (
    <>
      <div ref={refCb} style={{ display: err() ? "none" : "" }} />

      <Show when={err()}>
        <MonacoEditor value={err() + ""} readonly={true} />
      </Show>
    </>
  );
};
