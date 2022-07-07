import { createSignal, onMount } from "solid-js";
import { render } from "solid-js/web";

import "virtual:windi.css";
import "virtual:windi-devtools";

import { initSwc } from "./swc.js";
import App from "./App.jsx";
import DisplayShow from "./DisplayShow";

render(() => {
  const [swcIsInited, setSwcInited] = createSignal(false);

  onMount(() => initSwc(setSwcInited));

  return (
    <DisplayShow when={swcIsInited()} fallback="SWC is initing, please wait...">
      <App />
    </DisplayShow>
  );
}, document.getElementById("root"));
