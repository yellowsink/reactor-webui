import { transformer } from "./transform.js";
import { createSignal } from "solid-js";

export default (props) => {
  const [err, setErr] = createSignal(false);

  const transformed = () => {
    try {
      const res = transformer(props.code, {
        jsc: {
          target: "es2022",
          parser: {
            syntax: "ecmascript",
            jsx: true
          }
        }
      });
      setErr();
      return res.code;
    } catch (e) {
      setErr(e);
    }
  };

  // TODO: bundle to iife to eval
  return <div>{transformed() ?? err()}</div>;
};
