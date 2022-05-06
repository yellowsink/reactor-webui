import { createEffect, createSignal, Show } from "solid-js";
import Ace from "./Ace";
import SolidPreview from "./SolidPreview";
import transform from "./transform";

export default (props) => {
  const [text, setText] = createSignal("");
  const [transformed, setTransformed] = createSignal("");
  const [error, setError] = createSignal();

  if (props.solidOut) createEffect(() => props.solidOut(text()));
  if (props.reactOut) createEffect(() => props.reactOut(transformed()));

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
      {/* solid editor */}
      <Ace textOut={setText} />

      {/* react code */}
      <Ace textIn={transformed()} readOnly={true} />

      {/* solid preview */}
      <SolidPreview code={text()} />

      {/* error view or react output */}
      <Show when={error()}>
        <Ace textIn={error()} readOnly={true} />
      </Show>
    </div>
  );
};
