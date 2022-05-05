import { createEffect, onMount } from "solid-js";
import Ace from "ace-builds";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";

export default (props) => {
  let aceEditor;
  let ref;

  onMount(() => {
    aceEditor = Ace.edit(ref);

    aceEditor.setTheme("ace/theme/one_dark");

    aceEditor.getSession().setMode("ace/mode/javascript");

    if (props.readOnly) aceEditor.setReadOnly(true);

    aceEditor.on("change", () => {
      if (!props.textOut) return;

      props.textOut(aceEditor.getValue());
    });
  });

  createEffect(() => {
    if (!props.textIn) return;

    aceEditor?.setValue(props.textIn());
    aceEditor?.clearSelection();
  });

  return <div ref={ref} class="font-mono text-code" />;
};
