import { createSignal, onMount, Show } from "solid-js";
import { render } from "solid-js/web";

import "virtual:windi.css";
import "virtual:windi-devtools";

import { initSwc } from "./swc.js";
import Editor from "./Editor";

function App() {
  const [swcIsInited, setSwcInited] = createSignal(false);

  onMount(() => initSwc(setSwcInited));

  return (
    <Show when={swcIsInited()} fallback="SWC is initing, please wait...">
      <Editor />
    </Show>
  );
}

render(() => <App />, document.getElementById("root"));
