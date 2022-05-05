import { createSignal, onMount, Show } from "solid-js";
import { render } from "solid-js/web";

import "virtual:windi.css";
import "virtual:windi-devtools";

import { initSwc } from "./transform";
import ReactorEditor from "./ReactorEditor";

function App() {
  const [swcIsInited, setSwcInited] = createSignal(false);

  onMount(() => initSwc(setSwcInited));

  return (
    <div class="w-screen h-screen grid grid-cols-2">
      <Show when={swcIsInited()} fallback="SWC is initing, please wait...">
        <ReactorEditor />
      </Show>
    </div>
  );
}

render(() => <App />, document.getElementById("root"));
