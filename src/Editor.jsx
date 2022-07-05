import { createEffect, createSignal, Show } from "solid-js";
import Monaco from "monaco-solid";
import ReactPreview from "./ReactPreview.jsx";
import transform from "./swc.js";
import SolidPreview from "./SolidPreview";

const CustomMonaco = (props) => (
  <Monaco
    value={props.value}
    lang="javascript"
    valOut={props.valOut}
    width="unset"
    height="unset"
    theme="Dracula"
    readonly={props.readonly}
    otherCfg={{ automaticLayout: true }}
  />
);

export default () => {
  const [text, setText] = createSignal("");
  const [transformed, setTransformed] = createSignal("");
  const [error, setError] = createSignal();

  createEffect(() => {
    try {
      const { code } = transform(text());
      setTransformed(code);
      setError();
    } catch (e) {
      setError(e);
    }
  });

  return (
    <div class="w-screen h-screen grid grid-cols-2 grid-rows-2">
      {/* solid code */}
      <CustomMonaco value={text()} valOut={setText} />

      {/* react code */}
      <CustomMonaco value={transformed()} readonly={true} />

      <ReactPreview code={text()} />

      {/* error view or react output */}
      <Show when={error()} fallback={<SolidPreview code={transformed()} />}>
        <CustomMonaco value={error()} readonly={true} />
      </Show>
    </div>
  );
};
