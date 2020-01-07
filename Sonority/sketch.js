let container;
let input;
let button;
let inventory;

let word = null;

function preload() {
  inventory = loadJSON('inventory.json');
}

function setup() {
  let container = select('#canvas-container');
  canvas = createCanvas(750, 450);
  canvas.parent(container);
  input = select("#user-input");
  button = select('#submit-button');
  button.mousePressed(() => submitWord(input.value()));
}

function submitWord(text) {
  let segments = [];
  let phones = pronouncing.phonesForWord(text)[0]
  if (!phones) {
    alert('No word found');
    return;
  }
  phones = phones.split(/\W+/);

  let offset = 0;
  for (let i = 0; i < phones.length; i++) {
    let phone = phones[i].replace(/\d+/g, '');
    let p = inventory[phone];
    let segment = new Segment(25 + offset, p.ipa, p.sonority, false);
    offset += canvas.width / phones.length;
    segments.push(segment);
  }
  word = new Word(segments);
  word.selectSegment(0);
}

function keyPressed(event) {
  if (!word || !word.getSelectedSegment()) return;
  if (keyCode == 37) { // left
    word.decrementSelection();
    event.preventDefault();
  } else if (keyCode == 39) { // right
    word.incrementSelection();
    event.preventDefault();
  }

  function changeSegmentPiece(predicate) {
    let currentSonority = word.getSelectedSegment().sonority;
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
    word.replaceSelectedSegment(newSegment.ipa, newSegment.sonority);

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
}

function draw() {
  background(51);

  textSize(36);
  textAlign(CENTER, CENTER);
  if (word) {
    word.show();
  }
}