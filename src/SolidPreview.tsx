import solidCompiler from "./solidCompiler";

export default (props) => {
  const transformed = () => {
    const compiled = solidCompiler(props.code);
    console.log(compiled);
    return compiled.code;
  };

  return <div>{transformed()}</div>;
};
