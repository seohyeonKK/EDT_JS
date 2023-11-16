import { soondae } from "./constant.js";

let orderNo = 1;

export class Food {
	no = 0;
	name = null;
	time = 0;

	setNo(no) {
		this.no = no;
	}
	getNo() {
		return this.no;
	}

	setName(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}

	setTime(time) {
		this.time = time;
	}
	getTime() {
		return this.time;
	}

	constructor(name) {
		this.name = name;
		this.time = name === soondae ? 1000 : 2000;
		this.no = orderNo++;
	}
}
