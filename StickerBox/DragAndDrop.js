import { getStickerById } from "./main.js";

export function makeStickerDraggable(element) {
	// 박스 잡을 때
	element.onmousedown = function (event) {
		let shiftX = event.clientX - element.getBoundingClientRect().left;
		let shiftY = event.clientY - element.getBoundingClientRect().top;

		function onMouseMove(event) {
			element.style.left = event.pageX - shiftX + "px";
			element.style.top = event.pageY - shiftY + "px";
		}

		document.addEventListener("mousemove", onMouseMove);

		document.addEventListener("mouseup", onMouseUp);

		function onMouseUp() {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);

			element.onmousemove = null;
			element.onmouseup = null;
		}

		element.ondragstart = function () {
			return false;
		};
	};
}

export function makeMemoDraggable(element, parent) {
	// 박스 잡을 때
	element.onmousedown = function (event) {
		const startRect = element.getBoundingClientRect();

		const left = parseInt(window.getComputedStyle(element).left);
		const top = parseInt(window.getComputedStyle(element).top);

		event.stopPropagation();

		let shiftX = event.clientX - startRect.left;
		let shiftY = event.clientY - startRect.top;

		function onMouseMove(event) {
			element.style.position = "fixed";
			element.style.left = event.pageX - shiftX + "px";
			element.style.top = event.pageY - shiftY + "px";
		}

		// box에 한정되는 것이 아니라 박스를 잡은 순간에는
		// 전체 document에 mousemove 핸들링을 걸어줌
		document.addEventListener("mousemove", onMouseMove);

		// 마우스를 놓았을 때 박스를 내려놓아야 하므로
		// 전체 document에 걸려있던 mousemove 핸들링 삭제함
		// element.onmouseup = function () {
		document.addEventListener("mouseup", onMouseUp);

		function onMouseUp() {
			const currentRect = element.getBoundingClientRect();
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);

			// element.style.left =
			// 	left + currentRect.left - startRect.left - shiftX + "px";
			// element.style.top = top + currentRect.top - startRect.top - shiftY + "px";
			const newParentSticker = getNewParentSticker(
				currentRect.left,
				currentRect.top
			);
			if (
				newParentSticker !== undefined &&
				parseInt(newParentSticker.id) !== parent.id
			) {
				parent.removeMemo(element);
				// TODO: 바꿔야함
				getStickerById(parseInt(newParentSticker.id)).addMemoByButton(element);
			} else {
				element.style.position = "relative";
				element.style.left = left + "px";
				element.style.top = top + "px";
			}
		}

		element.onmousemove = null;
		element.onmouseup = null;
	};

	element.ondragstart = function () {
		return false;
	};
}

function getNewParentSticker(x, y) {
	const elements = document.elementsFromPoint(x, y);
	return elements.find((element) => element.className === "sticker");
}
