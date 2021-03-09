function onInput(value) {
	let arr = [];
	for (let i = 0; i < value; i++) {
		if (i % 3 == 0) {
			arr.push("fizz");
		} else if (i % 5 == 0) {
			arr.push("buzz");
		} else arr.push(i);
	}
	return arr;
}

console.log(onInput(9));
