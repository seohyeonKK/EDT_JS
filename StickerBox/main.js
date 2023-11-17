import { Sticker } from "./Sticker.js";

let stickerList = [];
document.getElementById("create-sticker").onclick = () => {
	const newSticker = new Sticker();
	stickerList.push(newSticker);
};

export function getStickerById(id) {
	return stickerList.find((sticker) => sticker.id === id);
}
