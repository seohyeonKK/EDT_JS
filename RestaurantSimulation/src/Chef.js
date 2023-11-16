export class Chef {
	status = "대기중";
	name = null;
	list = null;

	setStatus(status) {
		this.status = status;
	}
	getStatus() {
		return this.status;
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

	constructor(name) {
		this.name = name;
		this.list = this.addChefList();
	}

	cooking(food) {
		return new Promise((resolve) => {
			this.status = "요리중";
			this.updateChefList(food);

			setTimeout(() => {
				this.status = "대기중";
				this.updateChefList(null);
				resolve(food);
			}, food.getTime());
		});
	}

	addChefList() {
		const newList = document.createElement("li");

		const textNode = document.createTextNode(`${this.name} 대기중`);
		newList.append(textNode);

		const myList = document.getElementById("cooking");
		myList.appendChild(newList);

		return newList;
	}

	updateChefList(food) {
		if (this.status === "대기중") {
			this.list.textContent = `${this.name} 대기중`;
		} else {
			this.list.textContent = `${this.name} 주문${food.getNo()} ${food.getName()} 요리중`;
		}
	}
}
