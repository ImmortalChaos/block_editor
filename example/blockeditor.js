// Default Values
let currentBlock;
let momentElementId = '';

// Callback Functions
let linkCallbackFunc = undefined;

let callbackTimerID;
let editor_selection;

let dialogHandler = undefined;

// Defines
const paragraph_element = "p";

function getSvgDefines() {
const svgDefines = `
	<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
		<symbol id="icon_section" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M11 5v7H9.5C7.6 12 6 10.4 6 8.5S7.6 5 9.5 5H11m8-2H9.5C6.5 3 4 5.5 4 8.5S6.5 14 9.5 14H11v7h2V5h2v16h2V5h2V3z"></path>
		</symbol>
		<symbol id="align_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M12 5V3H3v2h9zm5 4V7H3v2h14zm-5 4v-2H3v2h9zm5 4v-2H3v2h14z"></path>
		</symbol>
		<symbol id="align_center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M14 5V3H6v2h8zm3 4V7H3v2h14zm-3 4v-2H6v2h8zm3 4v-2H3v2h14z"></path>
		</symbol>
		<symbol id="align_right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M17 5V3H8v2h9zm0 4V7H3v2h14zm0 4v-2H8v2h9zm0 4v-2H3v2h14z"></path>
		</symbol>
		<symbol id="icon_bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M6 4v13h4.54c1.37 0 2.46-.33 3.26-1 .8-.66 1.2-1.58 1.2-2.77 0-.84-.17-1.51-.51-2.01s-.9-.85-1.67-1.03v-.09c.57-.1 1.02-.4 1.36-.9s.51-1.13.51-1.91c0-1.14-.39-1.98-1.17-2.5C12.75 4.26 11.5 4 9.78 4H6zm2.57 5.15V6.26h1.36c.73 0 1.27.11 1.61.32.34.22.51.58.51 1.07 0 .54-.16.92-.47 1.15s-.82.35-1.51.35h-1.5zm0 2.19h1.6c1.44 0 2.16.53 2.16 1.61 0 .6-.17 1.05-.51 1.34s-.86.43-1.57.43H8.57v-3.38z"></path>
		</symbol>
		<symbol id="icon_italic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M14.78 6h-2.13l-2.8 9h2.12l-.62 2H4.6l.62-2h2.14l2.8-9H8.03l.62-2h6.75z"></path>
		</symbol>
		<symbol id="icon_link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M17.74 2.76c1.68 1.69 1.68 4.41 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61.76-.77.76-.76c.84-.84.84-2.2 0-3.04-.84-.85-2.2-.85-3.04 0l-.77.76-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53c1.69-1.68 4.42-1.68 6.1 0zM8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52.44.43 1.13.39 1.52 0zm-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53c-1.69 1.68-4.41 1.68-6.1 0-1.68-1.68-1.68-4.42 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05.84.84 2.2.84 3.04 0z"></path>
		</symbol>
		<symbol id="icon_more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
		</symbol>
		<symbol id="nav_up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
			<polygon points="9,4.5 3.3,10.1 4.8,11.5 9,7.3 13.2,11.5 14.7,10.1 "></polygon>
		</symbol>
		<symbol id="nav_move" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
			<path d="M13,8c0.6,0,1-0.4,1-1s-0.4-1-1-1s-1,0.4-1,1S12.4,8,13,8z M5,6C4.4,6,4,6.4,4,7s0.4,1,1,1s1-0.4,1-1S5.6,6,5,6z M5,10 c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S5.6,10,5,10z M13,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S13.6,10,13,10z M9,6 C8.4,6,8,6.4,8,7s0.4,1,1,1s1-0.4,1-1S9.6,6,9,6z M9,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S9.6,10,9,10z"></path>
		</symbol>
		<symbol id="nav_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
			<polygon points="9,13.5 14.7,7.9 13.2,6.5 9,10.7 4.8,6.5 3.3,7.9 "></polygon>
		</symbol>
		<symbol id="edit_pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M20.1 5.1L16.9 2 6.2 12.7l-1.3 4.4 4.5-1.3L20.1 5.1zM4 20.8h8v-1.5H4v1.5z"></path>		
		</symbol>
		<symbol id="edit_undo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"></path>
		</symbol>
		<symbol id="edit_redo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"></path>
		</symbol>
		<symbol id="infomation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"></path>
		</symbol>
		<symbol id="icon_heading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M6.2 5.2v13.4l5.8-4.8 5.8 4.8V5.2z"></path>
		</symbol>
		<symbol id="icon_listmode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path>
		</symbol>
		<symbol id="icon_bullet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
		</symbol>
		<symbol id="icon_numbering" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"></path>
		</symbol>
		<symbol id="icon_outdent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-4-4.6l-4 4 4 4 1-1-3-3 3-3-1-1z"></path>
		</symbol>
		<symbol id="icon_indent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"></path>
		</symbol>
		<symbol id="icon_h1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></path>
		</symbol>
		<symbol id="icon_h2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z"></path>
		</symbol>
		<symbol id="icon_h3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"></path>
		</symbol>
		<symbol id="icon_h4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z"></path>
		</symbol>
		<symbol id="icon_h5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z"></path>
		</symbol>
		<symbol id="icon_h6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"></path>
		</symbol>
		<symbol id="table" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"></path>
		</symbol>
		<symbol id="icon_image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"></path>
		</symbol>
		<symbol id="tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M20.1 11.2l-6.7-6.7c-.1-.1-.3-.2-.5-.2H5c-.4-.1-.8.3-.8.7v7.8c0 .2.1.4.2.5l6.7 6.7c.2.2.5.4.7.5s.6.2.9.2c.3 0 .6-.1.9-.2.3-.1.5-.3.8-.5l5.6-5.6c.4-.4.7-1 .7-1.6.1-.6-.2-1.2-.6-1.6zM19 13.4L13.4 19c-.1.1-.2.1-.3.2-.2.1-.4.1-.6 0-.1 0-.2-.1-.3-.2l-6.5-6.5V5.8h6.8l6.5 6.5c.2.2.2.4.2.6 0 .1 0 .3-.2.5zM9 8c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"></path>
		</symbol>
		<symbol id="imagetext" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 17h7V6H4v11zm9-10v1.5h7V7h-7zm0 5.5h7V11h-7v1.5zm0 4h7V15h-7v1.5z"></path>
		</symbol>
		<symbol id="imageleft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 18h6V6H4v12zm9-10v1.5h7V8h-7zm0 7.5h7V14h-7v1.5z"></path>
		</symbol>
		<symbol id="imageright" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M14 6v12h6V6h-6zM4 9.5h7V8H4v1.5zm0 6h7V14H4v1.5z"></path>
		</symbol>
		<symbol id="icon_code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"></path>
		</symbol>
		<symbol id="separate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path>
		</symbol>
		<symbol id="icon_gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M20.2 8v11c0 .7-.6 1.2-1.2 1.2H6v1.5h13c1.5 0 2.7-1.2 2.7-2.8V8h-1.5zM18 16.4V4.6c0-.9-.7-1.6-1.6-1.6H4.6C3.7 3 3 3.7 3 4.6v11.8c0 .9.7 1.6 1.6 1.6h11.8c.9 0 1.6-.7 1.6-1.6zM4.5 4.6c0-.1.1-.1.1-.1h11.8c.1 0 .1.1.1.1V12l-2.3-1.7c-.3-.2-.6-.2-.9 0l-2.9 2.1L8 11.3c-.2-.1-.5-.1-.7 0l-2.9 1.5V4.6zm0 11.8v-1.8l3.2-1.7 2.4 1.2c.2.1.5.1.8-.1l2.8-2 2.8 2v2.5c0 .1-.1.1-.1.1H4.6c0-.1-.1-.2-.1-.2z"></path>
		</symbol>
		<symbol id="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 13h8v-1.5H8V13z"></path>
		</symbol>
		<symbol id="archive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M19 6.2h-5.9l-.6-1.1c-.3-.7-1-1.1-1.8-1.1H5c-1.1 0-2 .9-2 2v11.8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8.2c0-1.1-.9-2-2-2zm.5 11.6c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h5.8c.2 0 .4.1.4.3l1 2H19c.3 0 .5.2.5.5v9.5zM8 12.8h8v-1.5H8v1.5zm0 3h8v-1.5H8v1.5z"></path>
		</symbol>
		<symbol id="quote" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z"></path>
		</symbol>
		<symbol id="link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path>
		</symbol>
		<symbol id="web" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M9 0C4.03 0 0 4.03 0 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM1.11 9.68h2.51c.04.91.167 1.814.38 2.7H1.84c-.403-.85-.65-1.764-.73-2.7zm8.57-5.4V1.19c.964.366 1.756 1.08 2.22 2 .205.347.386.708.54 1.08l-2.76.01zm3.22 1.35c.232.883.37 1.788.41 2.7H9.68v-2.7h3.22zM8.32 1.19v3.09H5.56c.154-.372.335-.733.54-1.08.462-.924 1.255-1.64 2.22-2.01zm0 4.44v2.7H4.7c.04-.912.178-1.817.41-2.7h3.21zm-4.7 2.69H1.11c.08-.936.327-1.85.73-2.7H4c-.213.886-.34 1.79-.38 2.7zM4.7 9.68h3.62v2.7H5.11c-.232-.883-.37-1.788-.41-2.7zm3.63 4v3.09c-.964-.366-1.756-1.08-2.22-2-.205-.347-.386-.708-.54-1.08l2.76-.01zm1.35 3.09v-3.04h2.76c-.154.372-.335.733-.54 1.08-.464.92-1.256 1.634-2.22 2v-.04zm0-4.44v-2.7h3.62c-.04.912-.178 1.817-.41 2.7H9.68zm4.71-2.7h2.51c-.08.936-.327 1.85-.73 2.7H14c.21-.87.337-1.757.38-2.65l.01-.05zm0-1.35c-.046-.894-.176-1.78-.39-2.65h2.16c.403.85.65 1.764.73 2.7l-2.5-.05zm1-4H13.6c-.324-.91-.793-1.76-1.39-2.52 1.244.56 2.325 1.426 3.14 2.52h.04zm-9.6-2.52c-.597.76-1.066 1.61-1.39 2.52H2.65c.815-1.094 1.896-1.96 3.14-2.52zm-3.15 12H4.4c.324.91.793 1.76 1.39 2.52-1.248-.567-2.33-1.445-3.14-2.55l-.01.03zm9.56 2.52c.597-.76 1.066-1.61 1.39-2.52h1.76c-.82 1.08-1.9 1.933-3.14 2.48l-.01.04z"></path>
		</symbol>
	</svg>	
`;
	return svgDefines;
}

function countCharacter(s, c) { 
  var result = 0, i = 0;
  for(i;i<s.length;i++) {
  	if(s[i]==c) {
  		if(c.length>1) i+=c.length-1;
  		result++;
  	}
  }

  return result;
};

function isEmptyEditBlock(blockEl) {
	if(blockEl==undefined) {
		return true;
	}
	if($(blockEl).text().trim()=="") {
		return true;
	}
	return false;
}

function hideToolBarSubMenu() {
	const submenu = $('.editor-toolbar-submenu');
	if(submenu!=undefined && !submenu.hasClass('editor-hide-menu')) {
		submenu.addClass('editor-hide-menu');
	}

	const submenu2 = $('.editor-toolbar-section');
	if(submenu2!=undefined && !submenu2.hasClass('editor-hide-menu')) {
		submenu2.addClass('editor-hide-menu');
	}	
}

function hideToolBar() {	
	$('.editor-toolbar').css("display", "none");
	$('.editor-block').removeClass('is-selected');
	if(currentBlock!=undefined && isEmptyEditBlock(currentBlock)) {
		$(currentBlock).addClass('editor-editable');
	}
	hideToolBarSubMenu();
}

function hideFocusoutObjects(clickX, clickY, elemId) {
	const submenu = $(elemId);
	// for delete dialog
	if(submenu.length && elemId=='.editor-dialog') {
		if(momentElementId==elemId) {
			momentElementId = "";
			return;
		}		
		const rect = submenu[0].getBoundingClientRect();
		if(!(rect.x <= clickX && clickX <= rect.x + rect.width &&
		     rect.y <= clickY && clickY <= rect.y + rect.height)) {
			$('.editor-dialog').remove();
			deleteSelectionBox();
		}
		return;
	} else
	// for hiding
	if(submenu.length && !submenu.hasClass('editor-hide-menu')) {
		// 상위 엘리먼트를 클릭해서 창이 열리자 마자 닫히는 현상을 막기 위한 코드
		if(momentElementId==elemId) {
			momentElementId = "";
			return;
		}
		// 클릭된 위치가 현재 visible인 개체의 범위를 벗어났다면 숨김 처리한다.
		const rect = submenu[0].getBoundingClientRect();
		if(!(rect.x <= clickX && clickX <= rect.x + rect.width &&
		     rect.y <= clickY && clickY <= rect.y + rect.height)) {
			submenu.addClass('editor-hide-menu');
		}
	}
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

function showSelectionBox(selRange) {
	let rects = window.getSelection().getRangeAt(0).getClientRects();
	for(let i=0; i<rects.length; i++) {
		let div = document.createElement('div');
		div.classList.add('editor-selection');
		const lineSpacing = (rects[i].height/4).toFixed();
		$(div).css({top:rects[i].top-lineSpacing, left:rects[i].left, width:rects[i].width, height:rects[i].height+lineSpacing*2});
		document.body.appendChild(div);
		console.log(rects[i]);
	}
}

function deleteSelectionBox() {
	$('.editor-selection').remove();
}

function createCommonDialog(dialogId) {
	let parentDiv = document.getElementById(dialogId);
	let div = document.createElement('div');
	div.setAttribute("id", "test");
	div.classList.add('editor-dialog');
	parentDiv.appendChild(div);

	return div;
}

function setHyperlink(newLink) {
	restoreSelection(editor_selection);
	if (window.getSelection().toString()) {
		if(callbackTimerID!=undefined) {
			clearTimeout(callbackTimerID);
		}
		deleteSelectionBox();
		let link = newLink;
		if(!link.startsWith('http://') && !link.startsWith('https://')) {
			if( countCharacter(link, '.')==1 ) {
				link = 'www.' + link;
			}
			link = 'http://' + link;
		}

		var a = document.createElement('a');
		a.href = link;
		if($('#chkbox').is(':checked')) {
			a.target = '_blank';
		}
		a.title = 'go ' + link;

		$('.editor-dialog').remove();
		window.getSelection().getRangeAt(0).surroundContents(a);
	}
}

function createLinkDialogPage(dialog) {
	// Search Query
	let div1 = document.createElement('div'); // for input
	let div2 = document.createElement('div'); // for callback
	let div3 = document.createElement('div'); // for button

	let inp = document.createElement('input');
	inp.setAttribute('type', 'input');
	inp.classList.add('editor-link-control__input')
	div1.appendChild(inp);
	dialog.appendChild(div1);

	div2.setAttribute('id', 'callback_area');
	div2.classList.add('editor-callback-area');
	dialog.appendChild(div2);

	div3.classList.add('editor-link-control__bottom')

	// for open in new tab
	let label = document.createElement('label');
	label.classList.add('editor-form-switch-button');

	let blankCheck = document.createElement('input');
	//blankCheck.classList.add('components-form-toggle__input')
	blankCheck.setAttribute('type', 'checkbox');
	blankCheck.setAttribute('id', 'chkbox');
	blankCheck.checked = true;

	let spanCheck = document.createElement('span');
	spanCheck.classList.add('onoff-switch');
	label.appendChild(blankCheck);
	label.appendChild(spanCheck);

	let label2 = document.createElement('label');
	label2.classList.add('editor-form-switch-label');
	label2.appendChild(document.createTextNode('Open in new tab'));
	label2.setAttribute('for', 'chkbox');

	div3.appendChild(label);
	div3.appendChild(label2);
	dialog.appendChild(div3);

	$(inp).bind('keydown', function(e) {
		if(e.key=='Escape') {
			deleteSelectionBox();
			$('.editor-dialog').remove();
			if(editor_selection!=undefined) {
				restoreSelection(editor_selection);
			}
			$(currentBlock).focus();
			e.preventDefault();
		} else if(e.key=='Enter' && this.value!="") {
			setHyperlink($(inp).val());
			e.preventDefault();
		}
	});

	$(inp).bind('input', function(e) {
		if(callbackTimerID!=undefined) {
			clearTimeout(callbackTimerID);
		}
		let webLinkTitle = document.getElementById('editor-web-link');
		if(webLinkTitle!=undefined) {
			let link = this.value;
			if(!link.startsWith('http://') && !link.startsWith('https://')) {
				link = 'http://' + link;
			}			
			$(webLinkTitle).text(link);
		} else {
			createDialogLinkItem(div2, this.value, 'Press ENTER to add this link', 'URL');
		}

		if(linkCallbackFunc!=undefined) {
			callbackTimerID = setTimeout(linkCallbackFunc, 2000, this.value);
		}
		//dialogHandler.appendLink(this.value, 'http://' + this.value, 'URL');
	});

	showSelectionBox(editor_selection);
	momentElementId = ".editor-dialog";
	$(inp).focus();
}

function showEditorDialog(targetEl, menuid, dialogId) {
	let dialog = createCommonDialog('editor-dialogs');
	editor_selection = saveSelection();

	if(menuid=='setLink') {
		createLinkDialogPage(dialog);
	}

	const parentEl = $(targetEl).parent();
	const elOffset = parentEl.offset();
	const startX = elOffset.left + parentEl.width() + 3 + "px";
	const startY = elOffset.top - 1 + "px";
	const submenu = $('.editor-dialog');
	submenu.css({left:startX, top:startY});
}

function showEditorPopupMenu(buttonEl, submenuClass) {

	const parentEl = $(buttonEl).parent();
	const elOffset = parentEl.offset();
	const startX = elOffset.left + parentEl.width() + 3 + "px";
	const startY = elOffset.top - 1 + "px";
	const submenu = $(submenuClass);
	submenu.css({left:startX, top:startY});
	momentElementId = submenuClass;
	submenu.removeClass('editor-hide-menu');
}

function redrawToolbar(blockItem) {
	var myHeight = $(blockItem)[0].getBoundingClientRect().height;
	var centerPosition = (myHeight<72)?(42 - (72 - myHeight)/2):43;

	var newPosition = $(blockItem).offset().top - 45;

	$('.editor-toolbar').offset({top:newPosition});
	$('.editor-toolbar').css("display", "block");
	$('.editor-block-mover').css("top", centerPosition + "px");	
}

function focusBlockItem(e) {
	// for editor-editable > span-placeholder
	if(this!=currentBlock && currentBlock!=undefined && isEmptyEditBlock(currentBlock)) {
		$(currentBlock).addClass('editor-editable');
	}

	$('.editor-toolbar').css("display", "none");
	$('.editor-block').removeClass('is-selected');
	$(this).addClass('is-selected'); 
	currentBlock = this;
	$(this).removeClass('editor-editable');

	// 왼쪽 이동바의 위치를 텍스트 영역 높이에 맞춰 보정한다.
	var myHeight = $(this)[0].getBoundingClientRect().height;
	var centerPosition = (myHeight<72)?(42 - (72 - myHeight)/2):43;

	$('.editor-toolbar').offset({top:$(this).offset().top});
	$('.editor-toolbar').css("display", "block");
	$('.editor-block-mover').css("top", centerPosition + "px");

	// 빈 블록이면 커서를 맨 뒤로 이동시킨다.
	// span-placeholder를 클릭했을때 커서가 없어지기 때문에 이를 방지하기 위함이다.
	if(isEmptyEditBlock(currentBlock)) {
		window.getSelection().collapse(this, 1);
	}

}

function keydownBlockItem(e) {
	if(e.key=='Backspace') {
		if(currentBlock!=undefined && isEmptyEditBlock(currentBlock)) {
			if(currentBlock.previousSibling) {
				let prevBlock = currentBlock.previousSibling;
				$(currentBlock).remove();
				currentBlock = prevBlock;
				if($(currentBlock).last()) {
					$(currentBlock).last().focus();
				} else {
					$(currentBlock).focus();
				}
				window.getSelection().collapse(currentBlock, 1);
			}
			e.preventDefault();
		}
	}
}

function appendSection(targetEl, isChild, firstElement) {
	let placeholderStr = '글쓰기로 시작하거나 / 키를 눌러 블럭을 선택합니다.';
	let newBlock = document.createElement('section');
	let firstEl = document.createElement(firstElement);
	let currentEl = firstEl;

	if(firstElement=='ul' || firstElement=='ol') {
		placeholderStr = '목록을 이곳에 적어주세요.';
		let subEl = document.createElement('li');
		firstEl.appendChild(subEl);
		currentEl = subEl;
	}

	var spanEl = document.createElement('span');
	spanEl.setAttribute('data-rich-text-placeholder',placeholderStr);
	spanEl.setAttribute('contenteditable', 'false');
	spanEl.classList.add('span-placeholder');
	newBlock.setAttribute('contentEditable','true');
	newBlock.classList.add('editor-block');
	newBlock.classList.add('editor-block-layout');
	newBlock.classList.add('editor-styles-wrapper');
	newBlock.classList.add('editor-editable');
	newBlock.appendChild(firstEl); // div가 없으면 :after의 박스 하단선이 개행이 없을때 글자랑 겹치는 문제가 있어서 div를 생성한다.
	currentEl.appendChild(spanEl);
	
	if(firstElement!='ul' && firstElement!='ol') {
		let br = document.createElement('br'); // spanEl이 hiiden되면 박스가 찌그러지지 않게 빈 개행을 넣어둔다.
		firstEl.appendChild(br);
	}

	$(newBlock).bind('focus', focusBlockItem);
	$(newBlock).bind('keydown', keydownBlockItem);
	if(isChild) {
		targetEl.appendChild(newBlock);
	} else {
		console.log(targetEl.nextSibling);
		targetEl.parentNode.insertBefore(newBlock, targetEl.nextSibling);
	}
}

function appendParagraph(targetEl, isChild) {
	appendSection(targetEl, isChild, paragraph_element);
}

function appendHeader(targetEl, isChild) {
	appendSection(targetEl, isChild, 'h1');
}

function appendBullet(targetEl, isChild) {
	appendSection(targetEl, isChild, 'ul');
}

function appendNumbering(targetEl, isChild) {
	appendSection(targetEl, isChild, 'ol');
}

function enableToolBarSubMenu(slotId, iconId) {
	const slotObj = $(slotId);
	if(slotObj.hasClass('editor-hide-slot')) {
		slotObj.removeClass('editor-hide-slot');
	}
}

function transformHeading(currentBlock) {
	let html = "";
	$(currentBlock).children().each(function(index, rootEl) {
		html += "<h1>" + $(rootEl).html() + "</h1>"; 
	});
	$(currentBlock).html(html);
	enableToolBarSubMenu('#slot-heading', 'icon_h1');
	hideToolBar();
}

function getDialogCommonHTML() {
	return "<div class=\"editor-dialog\">\
				<div class=\"editor-dialog-header\">Insert Link</div>\
				<div class=\"editor-dialog-body\">\
					<input type=\"text\" placeholder=\"Text\"/>\
				</div>\
				<div class=\"editor-dialog-fooler\">\
					<button type=\"button\">OK</button>\
				</div>\
			</div>";
}

class Editor {
	constructor(container) {
		this.createSvgDefine(container);
		this.createToolBar(container);
		this.createEditor(container);
		this.createDialog(container);
		this.bindEvent();
		this.initEditor();
	}

	click(target) {
		console.log($(target));
	}

	initEditor() {
		document.execCommand("defaultParagraphSeparator", false, paragraph_element);
	}

	bindEvent() {
		$('.be-container').bind('click', function(e) {
			if($(e.target).hasClass('be-container')) {
				hideToolBar();				
			}
		});
		$('.editor-block').bind('focus', focusBlockItem);
		$('.editor-block').bind('change', function(e){
			console.log('size changed!');
		});
		$('.btn').bind('focus', function(){
			console.log("button");
		});
		$('.editor-toolbar-button').bind('click', function(){
			const selection = window.getSelection();
			const range = selection.getRangeAt(0);
			const elemId = $(this)[0].id;
			if(elemId==="setbold") {
				document.execCommand('bold',false,null);
			} else if(elemId==="setitalic") {
				document.execCommand('italic',false,null);		
			} else if(elemId==="transformHeading") {
				transformHeading(currentBlock);
			} else if(elemId==="addSection") {
				appendParagraph(currentBlock, false);
				hideToolBarSubMenu();
			} else if(elemId==="addHeading") {
				appendHeader(currentBlock, false);
				hideToolBarSubMenu();
			} else if(elemId==="addBullet") {
				appendBullet(currentBlock, false);
				hideToolBarSubMenu();
			} else if(elemId==="addNumbering") {
				appendNumbering(currentBlock, false);
				hideToolBarSubMenu();				
			} else if(elemId==="setLink") {
				showEditorDialog(this, elemId, ".editor-dialog")
			} else if(elemId==="setSection") {
				showEditorPopupMenu(this, ".editor-toolbar-section");
			} else if(elemId==="moreMenu") {
				showEditorPopupMenu(this, ".editor-toolbar-submenu");
			}
		});		
	}

	createSvgDefine(container) {
		let div = document.createElement('div');
		div.setAttribute('display', 'none');
		//$(div).load("/svgdefine.svg");
		div.innerHTML = getSvgDefines();
		container.appendChild(div);
	}

	createEditor(container) {
		let div = document.createElement('div');
		div.setAttribute('id', 'editor-contents');
		container.appendChild(div);

		appendParagraph(div, true);

		return div;
	}

	createDialog(container) {
		let div = document.createElement('div');
		div.setAttribute('id', 'editor-dialogs');
		container.appendChild(div);

		return div;		
	}

	createToolBarSlot(parentEl, slotId, isVisible) {
		let div = document.createElement('div');
		div.classList.add('editor-toolbar-slot');
		if(!isVisible) {
			div.classList.add('editor-hide-slot');
		}
		div.setAttribute('id', slotId);
		parentEl.appendChild(div);

		return div;
	}

	createSvgIcon(parentEl, iconId, iconSize) {
		let svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgEl.setAttribute('width', iconSize);
		svgEl.setAttribute('height', iconSize);
		svgEl.setAttribute('role', 'img');
		svgEl.setAttribute('aria-hidden', 'true');
		svgEl.setAttribute('focusable', 'false');

		let useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		useEl.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "#" + iconId);
		svgEl.appendChild(useEl);
		parentEl.appendChild(svgEl);

		return svgEl;
	}

	createToolBarButton(parentEl, btnId, iconId) {
		// create button
		let buttonEl = document.createElement('button');
		buttonEl.classList.add('editor-toolbar-button');
		buttonEl.setAttribute('id', btnId);
		buttonEl.setAttribute('type', 'button');
		buttonEl.setAttribute('data-toggle', 'button');
		buttonEl.setAttribute('aria-pressed', 'false');

		this.createSvgIcon(buttonEl, iconId, '20');
		parentEl.appendChild(buttonEl);
		return buttonEl;
	}

	createToolBarNaviButton(parentEl, iconId, labelTxt) {
		// create button
		let buttonEl = document.createElement('button');
		buttonEl.classList.add('editor-block-mover__control');
		buttonEl.classList.add('block-editor-block-mover__control');
		buttonEl.setAttribute('type', 'button');
		buttonEl.setAttribute('aria-label', labelTxt);
		buttonEl.setAttribute('aria-disabled', 'false');

		if(iconId=='nav_up') {
			$(buttonEl).bind('click', function(e) {
				if(currentBlock.previousSibling) {
					$(currentBlock).insertBefore($(currentBlock.previousSibling));
					redrawToolbar(currentBlock);
				}
			});
		} else if(iconId=='nav_down') {
			$(buttonEl).bind('click', function(e) {
				if(currentBlock.nextSibling) {
					$(currentBlock).insertAfter($(currentBlock.nextSibling));
					redrawToolbar(currentBlock);
				}
			});			
		}

		this.createSvgIcon(buttonEl, iconId, '18');
		parentEl.appendChild(buttonEl);
		return buttonEl;
	}			

	createToolBarNaviMove(parentEl) {
		let navMoveEl = document.createElement('div');
		navMoveEl.classList.add('editor-block-mover__control-drag-handle');
		navMoveEl.classList.add('block-editor-block-mover__control-drag-handle');
		navMoveEl.classList.add('editor-block-mover__control');
		navMoveEl.classList.add('block-editor-block-mover__control');
		navMoveEl.setAttribute('type', 'button');
		navMoveEl.setAttribute('aria-hidden', 'true');
		navMoveEl.setAttribute('dragable', 'true');
		this.createSvgIcon(navMoveEl, 'nav_move', '18');
		parentEl.appendChild(navMoveEl);				
	}

	createToolBarSubMenuRow(parentEl) {
		const toolbarSubMenuRow = document.createElement('div');
		toolbarSubMenuRow.classList.add('editor-submenu-row');
		
		parentEl.appendChild(toolbarSubMenuRow);
		return toolbarSubMenuRow;		
	}

	createToolBarSubMenu(parentEl) {
		const toolbarSubMenu = document.createElement('div');
		toolbarSubMenu.classList.add('editor-toolbar-submenu');
		toolbarSubMenu.classList.add('editor-hide-menu');

		const slot1 = this.createToolBarSubMenuRow(toolbarSubMenu);
		this.createToolBarButton(slot1, 'addSection', 'icon_section');
		this.createToolBarButton(slot1, 'addHeading', 'icon_heading');
		this.createToolBarButton(slot1, 'addCode', 'icon_code');

		const slot2 = this.createToolBarSubMenuRow(toolbarSubMenu);
		this.createToolBarButton(slot2, 'addBullet', 'icon_bullet');
		this.createToolBarButton(slot2, 'addNumbering', 'icon_numbering');

		const slot3 = this.createToolBarSubMenuRow(toolbarSubMenu);
		this.createToolBarButton(slot3, 'addImage', 'icon_image');
		this.createToolBarButton(slot3, 'addGallery', 'icon_gallery');

		parentEl.appendChild(toolbarSubMenu);
	}

	createToolBarSectionTypeMenu(parentEl) {
		const toolbarSubMenu = document.createElement('div');
		toolbarSubMenu.classList.add('editor-toolbar-section');
		toolbarSubMenu.classList.add('editor-hide-menu');

		this.createToolBarButton(toolbarSubMenu, 'transformParagraph', 'icon_section');
		this.createToolBarButton(toolbarSubMenu, 'transformHeading', 'icon_heading');
		this.createToolBarButton(toolbarSubMenu, 'transformListing', 'icon_listmode');

		parentEl.appendChild(toolbarSubMenu);

	}

	createToolBar(container) {
		let toolbar = document.createElement('div');
		toolbar.classList.add('editor-toolbar');

		const slotSection = this.createToolBarSlot(toolbar, 'slot-section', true);
		const slotHeading = this.createToolBarSlot(toolbar, 'slot-heading', false);
		const slotAlign = this.createToolBarSlot(toolbar, 'slot-align', true);
		const slotText = this.createToolBarSlot(toolbar, 'slot-text', true);
		const slotMore = this.createToolBarSlot(toolbar, 'slot-more', true);

		this.createToolBarButton(slotSection, 'setSection', 'icon_section');
		this.createToolBarButton(slotHeading, 'setH1', 'icon_h1');
		this.createToolBarButton(slotAlign, 'setleft', 'align_left');
		this.createToolBarButton(slotAlign, 'setcenter', 'align_center');
		this.createToolBarButton(slotAlign, 'setright', 'align_right');
		this.createToolBarButton(slotText, 'setbold', 'icon_bold');
		this.createToolBarButton(slotText, 'setitalic', 'icon_italic');
		this.createToolBarButton(slotText, 'setLink', 'icon_link');
		this.createToolBarButton(slotMore, 'moreMenu', 'icon_more');

		// create toolbar submenu
		this.createToolBarSubMenu(container);
		this.createToolBarSectionTypeMenu(container);

		// create navigator
		let toolnav = document.createElement('div');
		toolnav.classList.add('editor-block-mover');
		toolnav.classList.add('block-editor-block-mover');
		toolnav.classList.add('is-visible');

		this.createToolBarNaviButton(toolnav, 'nav_up', '위로 이동')
		this.createToolBarNaviMove(toolnav);
		this.createToolBarNaviButton(toolnav, 'nav_down', '아래로 이동')
		toolbar.appendChild(toolnav);

		container.appendChild(toolbar);
	}

}

function createDialogLinkItem(parentEl, title, link, linktype) {
	let btn = document.createElement('button');
	btn.classList.add('editor-link-search-list');

	if(linktype=='URL') {
		let svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgEl.setAttribute('width', '24');
		svgEl.setAttribute('height', '24');
		svgEl.setAttribute('role', 'img');
		svgEl.setAttribute('aria-hidden', 'true');
		svgEl.setAttribute('focusable', 'false');

		let useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		useEl.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', "#web");
		svgEl.appendChild(useEl);
		btn.appendChild(svgEl);		
	}

	let spanItem = document.createElement('span');
	if(linktype=='URL') {
		spanItem.classList.add('editor-link-control__web-item');
	} else{
		spanItem.classList.add('editor-link-control__search-item');
	}

	// Title Text
	let spanTitle = document.createElement('span');
	let textTitle = document.createTextNode(title);
	spanTitle.appendChild(textTitle);
	spanTitle.classList.add('editor-link-control__search-item-title');
	if(linktype=='URL') {
		spanTitle.setAttribute('id', 'editor-web-link');

	}

	// Link URL
	let spanInfo = document.createElement('span');
	let textInfo = document.createTextNode(link);
	spanInfo.appendChild(textInfo);
	spanInfo.classList.add('editor-link-control__search-item-info');

	spanItem.appendChild(spanTitle);
	spanItem.appendChild(spanInfo);

	// Type
	let spanType = document.createElement('span');
	let textType = document.createTextNode(linktype);
	spanType.appendChild(textType);
	spanType.classList.add('editor-link-control__search-item-type');

	btn.appendChild(spanItem);
	btn.appendChild(spanType);

	$(btn).bind('click', function() {
		if(linktype=='URL') {
			const webLinkTitle = document.getElementById('editor-web-link');
			setHyperlink($(webLinkTitle).text());
		} else {
			setHyperlink(link);
		}
	});

	parentEl.appendChild(btn);
}

class BlockEditorDialogs {
	appendLink(title, link, linktype) {
		let searchListDiv = document.getElementById('callback_area');
		if(searchListDiv!=undefined) {
			createDialogLinkItem(searchListDiv, title, link, linktype);
		}
	}
}

class BlockEditor {
	constructor(container, options={}) {
		this.dialog = new BlockEditorDialogs();
		this.options = options;
		this.container = document.getElementById(container);

		if(this.container == null) {
			console.log('[Error] Container is Null')
			return;
		}
		console.log(this.container);
		this.container.classList.add('be-container');
		this.editor = new Editor(this.container);
		this.bindEvent();
	}

	setLinkCallbackFunction(callbackFn) {
		linkCallbackFunc = callbackFn;		
	}

	getHTML() {
		let html = "";
		$('#editor-contents').children().each(function(index, sectionEl) {
			if(!isEmptyEditBlock(sectionEl)) {
				html += "<section>";
				console.log(index + ": " + $(sectionEl).html());
				$(sectionEl).each(function(indexChild, childEl) {
					console.log(childEl.tagName);
					//if(childEl.tagName=="span" && childEl.hasAttribute("data-rich-text-placeholder")) {
					let subhtml = $(childEl).html().replaceAll('<span data-rich-text-placeholder="글쓰기로 시작하거나 / 키를 눌러 블럭을 선택합니다." contenteditable="false" class="span-placeholder"></span>','');	
					html += subhtml.replaceAll('<span data-rich-text-placeholder="목록을 이곳에 적어주세요." contenteditable="false" class="span-placeholder"></span>','');
				});
				html += "</section>";
			}
		});
		return html;
		//return $('#editor-contents').html();
	}

	bindEvent() {
		$('.container').bind('focus', function(){
			hideToolBar();
		});
		$('.container').bind('click', function(e){
			// 클릭된 위치에 포함된 서브메뉴가 아니면 닫아 준다.
			hideFocusoutObjects(e.clientX, e.clientY, '.editor-toolbar-submenu');
			hideFocusoutObjects(e.clientX, e.clientY, '.editor-toolbar-section');
			hideFocusoutObjects(e.clientX, e.clientY, '.editor-dialog');
		});
	}

} 
