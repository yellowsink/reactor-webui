import Monaco from "monaco-solid";

export default (props) => (
	<Monaco
		value={props.value}
		lang="javascript"
		valOut={props.valOut}
		width="unset"
		height="unset"
		theme="Dracula"
		readonly={props.readonly}
		otherCfg={{ automaticLayout: true }}
	/>
);