const getMemofromLocalStorage = () => {
	const memo = JSON.parse(localStorage.getItem('memoNote'));
	return memo || [];
}

const createLi = (className) => {
	const $li = document.createElement('li');
	$li.className = className;
	return $li;
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

const addButtonEventListener = ($btnAdd, $modal, $inputMemoTitle, $textarea) => {
	$btnAdd.addEventListener('click', function () {
		const title = $inputMemoTitle.value;
		const content = $textarea.value;
		if (!title) {
			alert('타이틀을 입력해주세요');
			return ;
		}
		const id = self.crypto.randomUUID();
		const memo = {
			title,
			content,
			'id': id,
		};
		localMemo.push(memo);
		localStorage.setItem('memoNote', JSON.stringify(localMemo));
		$inputMemoTitle.value = '';
		$textarea.value = '';
		$modal.close();
		render();
	})
}

// const closeButtonEventListener = ($container, $liNewMemo, $btnClose) => {
// 	$btnClose.addEventListener('click', function () {
// 		$container.removeChild($liNewMemo);
// 	})
// }

const closeButtonEventListener = ($btnClose, $modal) => {
	$btnClose.addEventListener('click', function() {
		$modal.close();
	})
}

const addNewMemo = function () {
	if (document.querySelector('.li-new-memo')) return ;
	const $container = document.querySelector('.container');
	const $liNewMemo = createLi('li-new-memo');
	const $btnClose = createButton('btn-close-memo', 'x');
	const $labelMemoTitle = createLabel('memo-title', 'a11y-hidden', 'Memo Title');
	const $inputMemoTitle = createInput('memo-title', 'text', true, false);
	const $labelMemoContent = createLabel('memo-content', 'a11y-hidden', 'Memo Content');
	const $textarea = createTextarea('memo-content', '9', true, false);
	const $btnAdd = createButton('btn-add-memo', 'Add');
	$liNewMemo.appendChild($btnClose);
	$liNewMemo.appendChild($labelMemoTitle);
	$liNewMemo.appendChild($inputMemoTitle);
	$liNewMemo.appendChild($labelMemoContent);
	$liNewMemo.appendChild($textarea);
	$liNewMemo.appendChild($btnAdd);
	$container.insertAdjacentElement('afterbegin', $liNewMemo);
	addButtonEventListener($inputMemoTitle, $textarea, $btnAdd);
	closeButtonEventListener($container, $liNewMemo, $btnClose);
}

const addNewMemoEventListener = () => {
	const $btnNewMemoNote = document.querySelector('.btn-make-memopad');
	// $btnNewMemoNote.addEventListener('click', addNewMemo);
	$btnNewMemoNote.addEventListener('click', function() {
		const $modal = document.querySelector('.modal');
		// $modal.style.display = 'flex';
		$modal.innerHTML = `
				<div class="memopad">
					<button class="btn-close-memo">x</button>
					<label for="memo-title" class="a11y-hidden"></label>
					<input type="text" id="memo-title" />
					<label for="memo-content" class="a11y-hidden"></label>
					<textarea
						name="memo-content"
						id="memo-content"
						cols="30"
						rows="10"
					></textarea>
					<button class="btn-add-memo">Add</button>
				</div>
		`
		const $inputTitle = document.querySelector('#memo-title');
		const $inputContent = document.querySelector('#memo-content');
		const $btnClose = document.querySelector('.btn-close-memo');
		const $btnAdd = document.querySelector('.btn-add-memo');
		addButtonEventListener($btnAdd, $modal, $inputTitle, $inputContent);
		closeButtonEventListener($btnClose, $modal);
		$modal.showModal();
	});
}

const editButtonEventListener = ($btnEdit	,$inputMemoTitle, $textarea) => {
	$btnEdit.addEventListener('click', function() {
		$inputMemoTitle.readOnly = false;
		$textarea.readOnly = false;
		$btnEdit.textContent = 'Save';
		$btnEdit.addEventListener('click', function() {
			const id = $inputMemoTitle.getAttribute('name');
			console.log(id);
			for(let memo of localMemo) {
				if (memo.id == id) {
					memo.title = $inputMemoTitle.value;
					memo.content = $textarea.value;
					break;
				}
			}
			localStorage.setItem('memoNote', JSON.stringify(localMemo));
			render();
		})
	})
}

const deleteButtonEventListener = ($btnDelete, $inputMemoTitle) => {
	$btnDelete.addEventListener('click', function() {
		const id = $inputMemoTitle.getAttribute('name');
		console.log(id);
		const index = localMemo.findIndex((memo) => memo.id == id);
		console.log('index: ',index);
		console.log(localMemo);
		localMemo.splice(index, 1);
		console.log(localMemo);

		localStorage.setItem('memoNote', JSON.stringify(localMemo));
		render();
	})
}

const displayMemo = () => {
	const $container = document.querySelector('.container');
	for(let i = localMemo.length - 1; i >= 0; i--) {
		const $liMemo = createLi('li-existing-memo');
		const $labelMemoTitle = createLabel('memo-title', 'a11y-hidden', 'Memo Title');
		const $inputMemoTitle = createInput('memo-title', 'text', false, true);
		$inputMemoTitle.value = localMemo[i].title;
		$inputMemoTitle.setAttribute('name', localMemo[i].id);
		const $labelMemoContent = createLabel('memo-content', 'a11y-hidden', 'Memo Content');
		const $textarea = createTextarea('memo-content', '8', false, true);
		$textarea.value = localMemo[i].content;
		const $btnEdit = createButton('btn-edit-memo', 'Edit');
		const $btnDelete = createButton('btn-delete-memo', 'Delete');
		$liMemo.appendChild($labelMemoTitle);
		$liMemo.appendChild($inputMemoTitle);
		$liMemo.appendChild($labelMemoContent);
		$liMemo.appendChild($textarea);
		$liMemo.appendChild($btnEdit);
		$liMemo.appendChild($btnDelete);
		$container.appendChild($liMemo);
		editButtonEventListener($btnEdit, $inputMemoTitle, $textarea);
		deleteButtonEventListener($btnDelete, $inputMemoTitle);
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
}

const localMemo = getMemofromLocalStorage();
start();