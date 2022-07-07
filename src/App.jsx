import { createEffect, createSignal } from "solid-js";
import { reactor } from "./swc.js";
import MonacoEditor from "./MonacoEditor.jsx";
import ReactPreview from "./ReactPreview.jsx";
import SolidPreview from "./SolidPreview.jsx";

export default () => {
  const [text, setText] = createSignal("");
  const [transformed, setTransformed] = createSignal("");
  const [error, setError] = createSignal();

  createEffect(() => {
    try {
      const { code } = reactor(text());
      setTransformed(code);
      setError();
    } catch (e) {
      setError(e + "");
    }
  });

  return (
    <div class="w-screen h-screen grid grid-cols-2 grid-rows-2">
      {/* react code */}
      <MonacoEditor value={text()} valOut={setText} />

      {/* solid code */}
      <MonacoEditor value={error() ?? transformed()} readonly={true} />

      <ReactPreview code={text()} />

      <SolidPreview code={transformed()} />
    </div>
  );
};
