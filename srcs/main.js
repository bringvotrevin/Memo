const createSection = (className) => {
	const $section = document.createElement('section');
	$section.className = className;
	return $section;
}

const createLabel = (id, className, text) => {
	const $label = document.createElement('label');
	$label.setAttribute('for', id);
	if (className) $label.className = className;
	if (text) $label.textContent = text;
	return $label;
}

const createInput = (id, type, isRequired, isReadOnly) => {
	const $input = document.createElement('input');
	$input.setAttribute('id', id);
	if (type) $input.setAttribute('type', type);
	if (isRequired) $input.required = true;
	if (isReadOnly) $input.readOnly = true;
	return $input;
}

const createTextarea = (id, rows, isRequired, isReadOnly) => {
	const $textarea = document.createElement('textarea');
	$textarea.setAttribute('id', id);
	if (rows) $textarea.setAttribute('rows', rows);
	if (isRequired) $textarea.required = true;
	if (isReadOnly) $textarea.readOnly = true;
	return $textarea;
}

const createButton = (className, text) => {
	const $button = document.createElement('button');
	$button.setAttribute('class', className);
	if (text) $button.textContent = text;
	return $button;
}

const addButtonEventListener = ($inputMemoTitle, $textarea, $btnAdd) => {
	$btnAdd.addEventListener('click', function () {
		const title = $inputMemoTitle.value;
		const content = $textarea.value;
		const id = self.crypto.randomUUID();
		const memo = {
			title,
			content,
			'id': id,
		};
		console.log(memo);
		localMemo.push(memo);
		localStorage.setItem('memoNote', JSON.stringify(localMemo));
		$inputMemoTitle.value = '';
		$textarea.value = '';
		render();
	})
}

const closeButtonEventListener = ($container, $sectionNewMemo, $btnClose) => {
	$btnClose.addEventListener('click', function () {
		$container.removeChild($sectionNewMemo);
	})
}

const addNewMemo = function () {
	if (document.querySelector('.section-new-memo')) return ;
	const $container = document.querySelector('.container');
	const $sectionNewMemo = createSection('section-new-memo');
	const $btnClose = createButton('btn-close-memo', 'x');
	const $labelMemoTitle = createLabel('memo-title', 'a11y-hidden', 'Memo Title');
	const $inputMemoTitle = createInput('memo-title', 'text', true, false);
	const $labelMemoContent = createLabel('memo-content', 'a11y-hidden', 'Memo Content');
	const $textarea = createTextarea('memo-content', '10', true, false);
	const $btnAdd = createButton('btn-add-memo', 'Add');
	$sectionNewMemo.appendChild($btnClose);
	$sectionNewMemo.appendChild($labelMemoTitle);
	$sectionNewMemo.appendChild($inputMemoTitle);
	$sectionNewMemo.appendChild($labelMemoContent);
	$sectionNewMemo.appendChild($textarea);
	$sectionNewMemo.appendChild($btnAdd);
	$container.insertAdjacentElement('afterbegin', $sectionNewMemo);
	addButtonEventListener($inputMemoTitle, $textarea, $btnAdd);
	closeButtonEventListener($container, $sectionNewMemo, $btnClose);
}

const addNewMemoEventListener = () => {
	const $btnNewMemoNote = document.querySelector('.btn-new-memo-note');
	$btnNewMemoNote.addEventListener('click', addNewMemo);
}

const getMemofromLocalStorage = () => {
	const memo = JSON.parse(localStorage.getItem('memoNote'));
	return memo || [];
}

const displayMemo = () => {
	const $container = document.querySelector('.container');
	for(let i = localMemo.length - 1; i >= 0; i--) {
		const $sectionMemo = createSection('section-existing-memo');
		const $labelMemoTitle = createLabel('memo-title', 'a11y-hidden', 'Memo Title');
		const $inputMemoTitle = createInput('memo-title', 'text', false, true);
		$inputMemoTitle.value = localMemo[i].title;
		const $labelMemoContent = createLabel('memo-content', 'a11y-hidden', 'Memo Content');
		const $textarea = createTextarea('memo-content', '10', false, true);
		$textarea.value = localMemo[i].content;
		const $btnEdit = createButton('btn-edit-memo', 'Edit');
		$sectionMemo.appendChild($labelMemoTitle);
		$sectionMemo.appendChild($inputMemoTitle);
		$sectionMemo.appendChild($labelMemoContent);
		$sectionMemo.appendChild($textarea);
		$sectionMemo.appendChild($btnEdit);
		$container.appendChild($sectionMemo);
	}
}

const start = () => {
	addNewMemoEventListener();
	render();
}

const render = () => {
	const $container = document.querySelector('.container');
	$container.innerHTML = '';
	if (localMemo.length) displayMemo();
	// displayMemo([1, 2, 3]);
	
}

const localMemo = getMemofromLocalStorage();
start();