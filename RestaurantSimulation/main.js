import { Chef } from "./Chef.js";
import { Food } from "./Food.js";
import { Server } from "./Server.js";

let chefs = [new Chef("장금이"), new Chef("백주부")];
let servers = [new Server(1000, "수지"), new Server(2000, "철수")];

let orderList = [];
let waitingList = [];

document
	.getElementById("soondae-soup")
	.addEventListener("click", () => getOrder(new Food(soondae)));
document
	.getElementById("hangover-soup")
	.addEventListener("click", () => getOrder(new Food(hangover)));

function getOrder(order) {
	orderList.push(order);
	updateOrders();
	cook();
}

async function cook() {
	const availableChef = await findAvailable(chefs);

	const order = orderList.shift();
	updateOrders();

	const food = await availableChef.cooking(order);
	waitingList.push(food);
	serve();
}

async function findAvailable(staffs) {
	return new Promise((resolve) => {
		const timerId = setInterval(() => {
			const availableStaff = staffs.find((staff) => staff.status === "대기중");
			if (availableStaff) {
				clearInterval(timerId);
				resolve(availableStaff);
			}
		}, 100);
	});
}

async function serve() {
	const availableServer = await findAvailable(servers);
	const food = waitingList.shift();
	await availableServer.serving(food);
}

function updateOrders() {
	const pendingOrdersElement = document.getElementById("order");
	pendingOrdersElement.innerHTML = orderList
		.map((order) => `<li>주문${order.no} : ${order.name}</li>`)
		.join("");
}
