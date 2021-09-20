let currentBlock;

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
	</svg>	
`;
	return svgDefines;
}

function hideToolBar() {	
	$('.editor-toolbar').css("display", "none");
	$('.editor-block').removeClass('is-selected');
	console.log('called hideToolBar')
}

function focusBlockItem(e) {
		$('.editor-toolbar').css("display", "none");
		$('.editor-block').removeClass('is-selected');
		$(this).addClass('is-selected'); 
		currentBlock = this;
		$(this).removeClass('editor-editable');
		console.log(this);
		console.log(e);

		// 왼쪽 이동바의 위치를 텍스트 영역 높이에 맞춰 보정한다.
		var myHeight = $(this)[0].getBoundingClientRect().height;
		var centerPosition = (myHeight<72)?(42 - (72 - myHeight)/2):43;

		$('.editor-toolbar').offset({top:$(this).offset().top});
		$('.editor-toolbar').css("display", "block");
		$('.editor-block-mover').css("top", centerPosition + "px");
		console.log($(this)[0].getBoundingClientRect());
		console.log($(this).offset().top);
}

function appendSection(targetEl, isChild) {
	var newBlock = document.createElement('section');
	var div = document.createElement('div');
	var spanEl = document.createElement('span');
	spanEl.setAttribute('data-rich-text-placeholder','글쓰기로 시작하거나 / 키를 눌러 블럭 선택');
	spanEl.setAttribute('contenteditable', 'false');
	spanEl.classList.add('span-placeholder');
	newBlock.setAttribute('contentEditable','true');
	newBlock.classList.add('editor-block');
	newBlock.classList.add('editor-block-layout');
	newBlock.classList.add('editor-styles-wrapper');
	newBlock.classList.add('editor-editable');
	newBlock.appendChild(div); // div가 없으면 :after의 박스 하단선이 개행이 없을때 글자랑 겹치는 문제가 있어서 div를 생성한다.

	var br = document.createElement('br'); // spanEl이 hiiden되면 박스가 찌그러지지 않게 빈 개행을 넣어둔다.
	div.appendChild(spanEl);
	div.appendChild(br);
	$(newBlock).bind('focus', focusBlockItem);
	if(isChild) {
		targetEl.appendChild(newBlock);
	} else {
		console.log(targetEl.nextSibling);
		targetEl.parentNode.insertBefore(newBlock, targetEl.nextSibling);
	}
}

class Editor {
	constructor(container) {
		this.createSvgDefine(container);
		this.createToolBar(container);
		this.createEditor(container);
		this.bindEvent();
	}

	click(target) {
		console.log($(target));
	}

	bindEvent() {
		$('.editor-board').bind('click', function(e) {
			if($(e.target).hasClass('editor-board')) {
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
			console.log($(this)[0].id);
			const selection = window.getSelection();
			const range = selection.getRangeAt(0);
			const elemId = $(this)[0].id;
			if(elemId==="setbold") {
				document.execCommand('bold',false,null);
			} else if(elemId==="setitalic") {
				document.execCommand('italic',false,null);					
			} else if(elemId==="addSection") {
				appendSection(currentBlock, false);
			}
			console.log(range);
			console.log("button::click");
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

		appendSection(div, true);

		return div;
	}

	createToolBarSlot(parentEl) {
		let div = document.createElement('div');
		div.classList.add('editor-toolbar-slot');
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

	createToolBar(container) {
		let toolbar = document.createElement('div');
		toolbar.classList.add('editor-toolbar');

		const slotSection = this.createToolBarSlot(toolbar);
		const slotAlign = this.createToolBarSlot(toolbar);
		const slotText = this.createToolBarSlot(toolbar);
		const slotMore = this.createToolBarSlot(toolbar);

		this.createToolBarButton(slotSection, 'setsection', 'icon_section');
		this.createToolBarButton(slotAlign, 'setleft', 'align_left');
		this.createToolBarButton(slotAlign, 'setcenter', 'align_center');
		this.createToolBarButton(slotAlign, 'setright', 'align_right');
		this.createToolBarButton(slotText, 'setbold', 'icon_bold');
		this.createToolBarButton(slotText, 'setitalic', 'icon_italic');
		this.createToolBarButton(slotText, 'setlink', 'icon_link');
		this.createToolBarButton(slotMore, 'addSection', 'icon_more');

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

class BlockEditor {
	constructor(container, options={}) {
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

	getHTML() {
		return $('#editor-contents').html();
	}

	bindEvent() {
		$('.container').bind('focus', function(){
			hideToolBar();
		});
	}

} 
