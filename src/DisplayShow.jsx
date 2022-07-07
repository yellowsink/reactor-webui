// like <Show> but both elements are mounted on the DOM at all times
// used here to allow monaco to init while swc is loading
// this removes the annoying pause betweeen swc init msg going away and editors appearing
// hence making the app feel faster

export default (props) => (
	<>
		<div style={{display: props.when ? "contents" : "none"}}>{props.children}</div>
		<div style={{display: props.when ? "none" : "contents"}}>{props.fallback}</div>
	</>
);