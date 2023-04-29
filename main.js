
const createLi = (className) => {
	const $li = document.createElement('li');
	$li.className = className;
	return $li;
}

const addButtonEventListener = ($btnAdd, $modal, $inputMemoTitle, $inputContent) => {
	$btnAdd.addEventListener('click', function () {
		const title = $inputMemoTitle.value;
		const content = $inputContent.value;
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
		localStorage.setItem('memo', JSON.stringify(localMemo));
		$inputMemoTitle.value = '';
		$inputContent.value = '';
		$modal.close();
		render();
	})
}

const closeButtonEventListener = ($btnClose, $modal) => {
	$btnClose.addEventListener('click', function() {
		$modal.close();
	})
}

const addNewMemoEventListener = () => {
	const $btnNewMemoNote = document.querySelector('.btn-make-memopad');
	$btnNewMemoNote.addEventListener('click', function() {
		const $modal = document.querySelector('.modal');
		$modal.innerHTML = `
			<button class="btn-close-memo">x</button>
			<label for="new-memo-title" class="a11y-hidden"></label>
			<input type="text" id="new-memo-title" />
			<label for="new-memo-content" class="a11y-hidden"></label>
			<textarea
				name="new-memo-content"
				id="new-memo-content"
				cols="30"
				rows="10"
			></textarea>
			<button class="btn-add-memo">Add</button>
		`
		const $inputTitle = $modal.querySelector('#new-memo-title');
		const $inputContent = $modal.querySelector('#new-memo-content');
		const $btnClose = $modal.querySelector('.btn-close-memo');
		const $btnAdd = $modal.querySelector('.btn-add-memo');
		addButtonEventListener($btnAdd, $modal, $inputTitle, $inputContent);
		closeButtonEventListener($btnClose, $modal);
		$modal.showModal();
	});
}

const editButtonEventListener = ($btnEdit, $inputTitle, $inputContent) => {
	$btnEdit.addEventListener('click', function() {
		console.log('#@#@#@');
		$inputTitle.readOnly = false;
		$inputContent.readOnly = false;
		$btnEdit.textContent = 'Save';
		$btnEdit.addEventListener('click', function() {
			const id = $inputTitle.getAttribute('data-id');
			for(let memo of localMemo) {
				if (memo.id == id) {
					memo.title = $inputTitle.value;
					memo.content = $inputContent.value;
					break;
				}
			}
			localStorage.setItem('memo', JSON.stringify(localMemo));
			render();
		})
	})
}

const deleteButtonEventListener = ($btnDelete, $inputMemoTitle) => {
	$btnDelete.addEventListener('click', function() {
		const id = $inputMemoTitle.getAttribute('data-id');
		const index = localMemo.findIndex((memo) => memo.id == id);
		localMemo.splice(index, 1);
		localStorage.setItem('memo', JSON.stringify(localMemo));
		render();
	})
}

const displayMemo = () => {
	const $container = document.querySelector('.container');
	for(let i = localMemo.length - 1; i >= 0; i--) {
		const $liMemo = createLi('.li-existing-memo');
		$container.appendChild($liMemo);
		$liMemo.innerHTML = `
      <label for="memo-title" class="a11y-hidden">Memo Title</label
      ><input
				id="memo-title"
				type="text" 
				data-id="${localMemo[i].id}"
				readonly
      /><label for="memo-content" class="a11y-hidden">Memo Content</label
      ><textarea id="memo-content" rows="8" readonly></textarea
      ><button class="btn-edit-memo">Edit</button
      ><button class="btn-delete-memo">Delete</button>
		`
		const $btnEdit = $liMemo.querySelector('.btn-edit-memo');
		const $btnDelete = $liMemo.querySelector('.btn-delete-memo');
		const $inputTitle = $liMemo.querySelector('#memo-title');
		const $inputContent = $liMemo.querySelector('#memo-content');
		$inputTitle.value = localMemo[i].title;
		$inputContent.value = localMemo[i].content;
		console.log($inputTitle.value, $inputContent.value);
		editButtonEventListener($btnEdit, $inputTitle, $inputContent);
		deleteButtonEventListener($btnDelete, $inputTitle);
	}
}

const render = () => {
	const $container = document.querySelector('.container');
	$container.innerHTML = '';
	if (localMemo.length) displayMemo();
}

const start = () => {
	addNewMemoEventListener();
	render();
}

const getMemofromLocalStorage = () => {
	const memo = JSON.parse(localStorage.getItem('memo'));
	return memo || [];
}

const localMemo = getMemofromLocalStorage();
start();