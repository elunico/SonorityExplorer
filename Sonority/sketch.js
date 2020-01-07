let container;
let input;
let button;
let inventory;

let segments = [];
let selectedIndex = 0;

fetch('inventory.json').then(r => r.json()).then(json => {
	inventory = json;
});

function setup() {
	let container = select('#canvas-container');
	canvas = createCanvas(750, 450);
	canvas.parent(container);
	input = select("#user-input");
	button = select('#submit-button');
	button.mousePressed(() => submitWord(input.value()));
}

function submitWord(word) {
	segments = [];
	let phones = pronouncing.phonesForWord(word)[0]
	if (!phones) {
		alert('No word found');
		return;
	}
	phones = phones.split(/\W+/);

	let offset = 0;
	for (let i = 0; i < phones.length; i++) {
		let phone = phones[i].replace(/\d+/g, '');
		let p = inventory[phone];
		let segment = new Segment(25 + offset, 50, p.ipa, p.sonority, false);
		offset += canvas.width / phones.length;
		segments.push(segment);
	}
	selectedIndex = 0;
	segments[selectedIndex].selected = true;
}

function keyPressed(event) {
	if (!segments[selectedIndex]) return;
	segments[selectedIndex].selected = false;
	if (keyCode == 39) { // right
		selectedIndex++;
		if (selectedIndex >= segments.length) {
			selectedIndex = segments.length - 1;
		}
		event.preventDefault();
	}
	if (keyCode == 37) { // left
		selectedIndex--;
		if (selectedIndex < 0) {
			selectedIndex = 0;
		}
		event.preventDefault();
	}

	function changeSegmentPiece(predicate) {
		let currentSonority = segments[selectedIndex].sonority;
		let options = [];
		for (let segment of Object.values(inventory)) {
			if (predicate(segment.sonority, currentSonority)) {
				options.push(segment);
			}
		}
		let newSegment = random(options);
		if (!newSegment) {
			return;
		}
		segments[selectedIndex].ipa = newSegment.ipa;
		segments[selectedIndex].sonority = newSegment.sonority;
	}

	if (keyCode == 38) { // up
		changeSegmentPiece((optSon, curSon) => optSon === curSon - 1);
		event.preventDefault();
	}
	if (keyCode == 40) { // down
		changeSegmentPiece((optSon, curSon) => optSon === curSon + 1);
		event.preventDefault();
	}
	if (keyCode == 32) { // space
		changeSegmentPiece((optSon, curSon) => optSon === curSon);
		event.preventDefault();
	}
	segments[selectedIndex].selected = true;
}

function draw() {
	background(51);



	textSize(36);
	textAlign(CENTER, CENTER);
	let offset = 0;

	let px = undefined;
	let py = undefined;
	for (let pair of segments) {
		let x = 20 + offset;
		let y = height * (pair.sonority / 11);
		offset += canvas.width / segments.length;
		if (px && py) {
			fill(255);
			strokeWeight(3);
			stroke(130, 200);
			line(px, py, x, y);
		}
		px = x;
		py = y;
	}
	for (let pair of segments) {
		pair.show();
	}
}
