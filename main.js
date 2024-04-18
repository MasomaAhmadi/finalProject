let list = JSON.parse(localStorage.getItem("carList")) || [];

function createListItem(carModel, carColor) {
	let newOrder = document.createElement("li");
	newOrder.classList.add(
		"p-4",
		"mb-4",
		"py-3",
		"border-b-2",
		"border-gray-300",
	);

	let carEmoji = document.createElement("span");
	carEmoji.textContent = "❎   ";
	carEmoji.setAttribute("id", "remove");
	carEmoji.addEventListener("click", function (e) {
		let index = list.findIndex(
			(item) => item.model === carModel && item.color === carColor,
		);
		if (index !== -1) {
			list.splice(index, 1);
			localStorage.setItem("carList", JSON.stringify(list));
		}
		e.target.parentNode.remove();
	});

	let selectedModel = document.createElement("span");
	selectedModel.textContent = carModel;

	let selectedColor = document.createElement("span");
	selectedColor.textContent = carColor;
	selectedColor.classList.add(
		"ml-4",
		"rounded-lg",
		"py-1",
		"px-2",
		carColor === "White" ? "bg-white" : "text-white",
		carColor === "red"
			? "bg-red-600"
			: carColor === "Black"
			? "bg-black"
			: "bg-purple-600",
	);

	newOrder.appendChild(carEmoji);
	newOrder.appendChild(selectedModel);
	newOrder.appendChild(selectedColor);

	document.querySelector("#list-item").appendChild(newOrder);
}

function addItem(e) {
	e.preventDefault();

	let carModel = document.querySelector("#car-model").value.trim();
	let carColor = document.querySelector("#car-color").value.trim();

	if (isValidated(carModel, carColor)) {
		let signs = { model: carModel, color: carColor };
		list.push(signs);
		localStorage.setItem("carList", JSON.stringify(list));
		createListItem(carModel, carColor);
		document.querySelector("#car-model").value = "";
		document.querySelector("#car-color").value = "";
	} else {
		console.log("Invalid inputs");
	}
}


function isValidated(carModel, carColor) {
	let isModelValid = carModel !== "";
	let isColorValid = carColor !== "";

	document
		.querySelector("#car-model")
		.classList.toggle("border-1", "border-red-300", !isModelValid);
	document
		.querySelector("#car-color")
		.classList.toggle("border-1", "border-red-300", !isColorValid);

	return isModelValid && isColorValid;
}


document.querySelector("#add").addEventListener("click", addItem);

window.onload = function () {
	list.forEach(function (sign) {
		createListItem(sign.model, sign.color);
	});
};
