let list = [];

let carEmoji;
function addItem(e) {
	e.preventDefault();

	console.log("Running add function");

	let carModel = document.querySelector("#car-model").value;
	let carColor = document.querySelector("#car-color").value;

	if (isValidated()) {
		let newOrder = document.createElement("li");
		newOrder.classList.add(
			"p-4",
			"mb-4",
			"py-3",
			"border-b-2",
			"border-gray-300",
		);
		carEmoji = document.createElement("span");
		carEmoji.setAttribute("id", "remove");
		carEmoji.addEventListener("click", function (e) {
			e.target.parentNode.remove();
		});
		let selectedModel = document.createElement("span");
		let selectedColor = document.createElement("span");
		switch (carColor) {
			case "red":
				selectedColor.classList.add(
					"bg-red-600",
					"text-white",
					"ml-4",
					"rounded-lg",
					"py-1",
					"px-2",
				);
				break;
			case "Black":
				selectedColor.classList.add(
					"bg-black",
					"text-white",
					"ml-4",
					"rounded-lg",
					"py-1",
					"px-2",
				);

				break;
			case "White":
				selectedColor.classList.add(
					"bg-white",
					"ml-4",
					"rounded-lg",
					"py-1",
					"px-2",
				);
				break;
			default:
				selectedColor.classList.add(
					"bg-purple-600",
					"text-white",
					"ml-4",
					"rounded-lg",
					"py-1",
					"px-2",
				);
		}

		carEmoji.textContent = "❎   ";
		selectedModel.textContent = carModel;
		selectedColor.textContent = carColor;

		let signs = {
			model: `${carModel}`,
			color: `${carColor}`,
		};

		newOrder.appendChild(carEmoji);
		newOrder.appendChild(selectedModel);
		newOrder.appendChild(selectedColor);

		document.querySelector("#list-item").appendChild(newOrder);
		list.push(signs);

		localStorage.setItem("carList", JSON.stringify(list));
		
		console.log(list);
		document.querySelector("#car-model").value = "";
		document.querySelector("#car-color").value = "";
	} else {
		console.log("Invalid inputs");
	}
}

function isValidated() {
	console.log("Running isValidated function");
	let carModel = document.querySelector("#car-model").value.trim();
	let carColor = document.querySelector("#car-color").value.trim();

	let isModelValid = true;
	let isColorValid = true;

	if (carModel === "") {
		document
			.querySelector("#car-model")
			.classList.add("border-1", "border-red-300");
		isModelValid = false;
	} else {
		document
			.querySelector("#car-model")
			.classList.remove("border-1", "border-red-300");
	}

	if (carColor === "") {
		document
			.querySelector("#car-color")
			.classList.add("border-1", "border-red-300");
		isColorValid = false;
	} else {
		document
			.querySelector("#car-color")
			.classList.remove("border-1", "border-red-300");
	}

	return isModelValid && isColorValid;
}

document.querySelector("#add").addEventListener("click", addItem);
