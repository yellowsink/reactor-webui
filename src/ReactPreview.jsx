import { swcTransformer } from "./transform.js";
import { createSignal } from "solid-js";

export default (props) => {
  const [err, setErr] = createSignal(false);

  const transformed = () => {
    try {
      const res = swcTransformer(props.code, {});
      setErr();
      return res.code;
    } catch (e) {
      setErr(e);
    }
  };

  // TODO: bundle to iife to eval
  return <div>TODO react preview</div>;
};
