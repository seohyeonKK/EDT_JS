import { makeStickerDraggable, makeMemoDraggable } from "./DragAndDrop.js";

let no = 1;

export class Sticker {
	id = 0;
	element = null;
	memoList = [];

	constructor() {
		this.id = no++;
		this.element = null;
		this.memoList = [];
		this.createStickerElement();
	}

	getElement() {
		return this.element;
	}

	getMemoList() {
		return this.memoList;
	}

	setMemoList(memoList) {
		this.memoList = memoList;
	}

	createStickerElement() {
		// sticker 생성
		const stickerEl = document.createElement("div");
		stickerEl.id = this.id;
		stickerEl.className = "sticker";
		stickerEl.style.left = 20 + 7 * this.id + "px";
		stickerEl.style.top = 20 + 7 * this.id + "px";
		stickerEl.style.backgroundColor = `rgb(
			${150 + Math.random() * 50},
			${150 + Math.random() * 50},
			${150 + Math.random() * 50}, 0.9)`;
		//sticker 제목
		const stickerTitle = document.createElement("h1");
		stickerTitle.textContent = "Sticker" + this.id;
		stickerEl.appendChild(stickerTitle);

		// 항목추가 버튼
		const addMemoButton = document.createElement("button");
		addMemoButton.textContent = "항목 추가";
		addMemoButton.onmouseup = () => this.addMemoByButton();
		stickerEl.appendChild(addMemoButton);

		// 스티커 삭제 버튼
		const removeMemoButton = document.createElement("button");
		removeMemoButton.textContent = "스티커 삭제";
		removeMemoButton.onmouseup = () => this.removeSticker();
		stickerEl.appendChild(removeMemoButton);

		// 드래그 가능하도록 이벤트 등록
		makeStickerDraggable(stickerEl);
		document.body.appendChild(stickerEl);
		this.element = stickerEl;
	}

	createMemoElement(text) {
		const memoEl = document.createElement("div");
		memoEl.className = "memo";
		memoEl.id = "memo" + (this.memoList.length + 1);
		// 텍스트
		const memoText = document.createElement("span");
		if (text === null) memoText.innerText = "sampel Text" + (this.memoList.length + 1);
		else memoText.innerText = text;
		memoEl.appendChild(memoText);

		// 삭제 버튼
		const memoRemoveButton = document.createElement("button");
		memoRemoveButton.textContent = "삭제";
		memoRemoveButton.onmouseup = (event) => this.removeMemoByButton(event);
		memoEl.appendChild(memoRemoveButton);

		makeMemoDraggable(memoEl, this);
		return memoEl;
	}
	// 항목 추가
	addMemoByButton() {
		const memoEl = this.createMemoElement(null);

		this.memoList.push(memoEl);
		this.renderMemos();
	}

	addMemoByIndex(element, index) {
		const elementText = element.getElementsByTagName("span")[0].innerText;
		const newMemoElement = this.createMemoElement(elementText);

		if (index < 0) index = 0;
		this.memoList.splice(index, 0, newMemoElement);
		this.renderMemos();
	}

	removeMemoByButton(event) {
		this.memoList = this.memoList.filter(
			(memo) => memo.id !== event.target.parentElement.id
		);
		event.target.parentElement.remove();
	}

	removeMemo(targetMemo) {
		this.memoList = this.memoList.filter((memo) => memo.id !== targetMemo.id);
		targetMemo.remove();
	}

	// 스티커 삭제
	removeSticker() {
		this.element.remove();
	}

	renderMemos() {
		this.memoList.forEach((memo, index) => {
			memo.id = "memo" + index;
			this.element.appendChild(memo);
		});
	}
}
