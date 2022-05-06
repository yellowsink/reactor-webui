import { createSignal, onMount, Show } from "solid-js";
import { render } from "solid-js/web";

import "virtual:windi.css";
import "virtual:windi-devtools";

import { initSwc } from "./transform";
import Editor from "./Editor";

function App() {
  const [swcIsInited, setSwcInited] = createSignal(false);

  const [solid, setSolid] = createSignal("");
  const [react, setReact] = createSignal("");

  onMount(() => initSwc(setSwcInited));

  return (
    <Show when={swcIsInited()} fallback="SWC is initing, please wait...">
      <Editor solidOut={setSolid} reactOut={setReact} />
    </Show>
  );
}

render(() => <App />, document.getElementById("root"));
