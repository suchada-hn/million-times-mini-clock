window.addEventListener("DOMContentLoaded", () => {
	// Set odometers

	const elements = [...document.querySelectorAll(".progress-bar__steps-title")];

	const steps = [6784, 3264, 4532];
	const odometers = [];

	elements.forEach((element, index) => {
		odometers.push({
			instance: new Odometer({ el: element, format: "(,ddd)", duration: 250 }),
			value: steps[index]
		});
	});

	for (let i = 0; i < odometers.length; i++) {
		setTimeout(() => {
			odometers[i].instance.update(odometers[i].value);
		}, i * 250);
	}

	// Update time

	const clocks = [...document.querySelectorAll("time")];

	const update = () => {
		const now = new Date();

		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		const datetime = `${hours}:${minutes}`;

		const outputHours = now.getHours() % 12 || 12;
		const outputAMPM = now.getHours() >= 12 ? "PM" : "AM";
		const output = `${outputHours}:${minutes.padStart(2, "0")} ${outputAMPM}`;

		clocks.forEach((clock) => {
			clock.setAttribute("datetime", datetime);
			clock.textContent = output;
		});
	};

	update();

	setInterval(update, 60000);
});