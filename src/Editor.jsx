import { createEffect, createSignal, Show } from "solid-js";
import Monaco from "monaco-solid";
import ReactPreview from "./ReactPreview.jsx";
import transform from "./swc.js";
import SolidPreview from "./SolidPreview.jsx";

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
      {/* react code */}
      <CustomMonaco value={text()} valOut={setText} />

      {/* solid code */}
      <CustomMonaco value={error() ?? transformed()} readonly={true} />

      <ReactPreview code={text()} />

      <SolidPreview code={transformed()} />
    </div>
  );
};
