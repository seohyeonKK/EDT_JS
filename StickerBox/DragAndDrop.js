import { getStickerById } from "./main.js";

export function makeStickerDraggable(element) {
	element.onmousedown = function (event) {
		// 가장 위로 올려줌
		document.body.appendChild(element);

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
	element.onmousedown = function (event) {
		const left = parseInt(window.getComputedStyle(element).left);
		const top = parseInt(window.getComputedStyle(element).top);

		event.stopPropagation();

		let shiftX = event.pageX - element.getBoundingClientRect().left;
		let shiftY = event.pageY - element.getBoundingClientRect().top;

		// 누르는 순간 같은 위치에 빈 memo 그려줌
		const cloneMemo = element.cloneNode(false);
		cloneMemo.style.backgroundColor = "gray";
		element.style.position = "fixed";
		element.style.left = event.pageX - shiftX - 10 + "px";
		element.style.top = event.pageY - shiftY - 10 + "px";
		element.style.transform = "rotate(-2deg)";
		parent.element.insertBefore(cloneMemo, element);

		function onMouseMove(event) {
			element.style.left = event.pageX - shiftX + "px";
			element.style.top = event.pageY - shiftY + "px";
		}

		// parent에 대해서 mouseLeave되면 빈 memo 삭제
		parent.element.addEventListener("mouseleave", removeCloneMemo);
		function removeCloneMemo() {
			if (cloneMemo !== undefined) cloneMemo.remove();
			parent.element.removeEventListener("mouseleave", removeCloneMemo);
		}

		// box에 한정되는 것이 아니라 박스를 잡은 순간에는
		// 전체 document에 mousemove 핸들링을 걸어줌
		document.addEventListener("mousemove", onMouseMove);

		// 마우스를 놓았을 때 박스를 내려놓아야 하므로
		// 전체 document에 걸려있던 mousemove 핸들링 삭제함
		document.addEventListener("mouseup", onMouseUp);

		function onMouseUp() {
			removeCloneMemo();
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);

			const elementLeft = parseInt(element.style.left);
			const elementTop = parseInt(element.style.top);
			const newParentSticker = getNewParentSticker(elementLeft, elementTop);
			if (newParentSticker !== undefined && parseInt(newParentSticker.id) !== parent.id) {
				parent.removeMemo(element);
				const index =
					parseInt((elementTop - parent.element.getBoundingClientRect().top) / 45) - 1;
				getStickerById(parseInt(newParentSticker.id)).addMemoByIndex(element, index);
			} else {
				element.style.position = "relative";
				element.style.left = left + "px";
				element.style.top = top + "px";
				element.style.transform = null;
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
