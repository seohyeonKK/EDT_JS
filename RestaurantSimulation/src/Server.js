export class Server {
	name = null;
	time = 0;
	list = null;
	status = "대기중";

	setStatus(status) {
		this.status = status;
	}
	getStatus() {
		return this.status;
	}

	setTime(time) {
		this.time = time;
	}
	getTime() {
		return this.time;
	}

	setName(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}

	setList(list) {
		this.list = list;
	}
	getList() {
		return this.list;
	}

	constructor(time, name) {
		this.time = time;
		this.name = name;
		this.list = this.addServerList();
		this.status = "대기중";
	}

	serving(food) {
		return new Promise((resolve) => {
			this.status = "서빙";
			this.updateServerList(food);

			setTimeout(() => {
				this.status = "대기중";
				this.updateServerList(null);
				resolve();
			}, this.time);
		});
	}

	addServerList() {
		const newList = document.createElement("li");

		const textNode = document.createTextNode(`${this.name} 대기중`);
		newList.append(textNode);

		const myList = document.getElementById("serving");
		myList.appendChild(newList);

		return newList;
	}

	updateServerList(food) {
		if (this.status === "대기중") {
			this.list.textContent = `${this.name} 대기중`;
		} else {
			this.list.textContent = `${this.name} 주문${food.getNo()} ${food.getName()} 서빙중`;
		}
	}
}
