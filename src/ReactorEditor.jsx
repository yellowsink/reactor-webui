import { createEffect, createSignal } from "solid-js";
import Editor from "./Editor";
import transform from "./transform";

export default () => {
  const [text, setText] = createSignal("");
  const [transformed, setTransformed] = createSignal("");

  createEffect(() => {
    try {
      const { code } = transform(text());
      setTransformed(code);
    } catch {}
  });

  return (
    <>
      <Editor textOut={setText} />
      <Editor textIn={transformed} readOnly={true} />
    </>
  );
};
