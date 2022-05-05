import { createEffect, createSignal, Show } from "solid-js";
import Editor from "./Editor";
import transform from "./transform";

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
    <>
      <Editor textOut={setText} />
      {/* put in class so windi finds it, but use classList to toggle it */}
      <div class="grid grid-rows-2" classList={{ "grid-rows-2": error() }}>
        <Editor textIn={transformed} readOnly={true} />
        <Show when={error()}>
          <Editor textIn={error} readOnly={true} />
        </Show>
      </div>
    </>
  );
};
