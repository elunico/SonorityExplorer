class Word {
  constructor(segments) {
    this.segments = segments;
    this.selectedIndex = 0;
  }

  selectSegment(pos) {
    this.segments[this.selectedIndex].selected = false;
    this.selectedIndex = pos;
    this.segments[this.selectedIndex].selected = true;
  }

  incrementSelection() {
    if (this.selectedIndex < this.segments.length - 1) {
      this.selectSegment(this.selectedIndex + 1);
    }
  }

  decrementSelection() {
    if (this.selectedIndex > 0) {
      this.selectSegment(this.selectedIndex - 1);
    }
  }

  getSelectedSegment() {
    return this.segments[this.selectedIndex];
  }

  replaceSelectedSegment(ipa, son) {
    this.segments[this.selectedIndex].ipa = ipa;
    this.segments[this.selectedIndex].sonority = son;
    this.segments[this.selectedIndex]._updateY();
  }


  show() {
    let px = undefined;
    let py = undefined;
    for (let seg of this.segments) {
      if (px && py) {
        fill(255);
        strokeWeight(3);
        stroke(130, 200);
        line(px, py, seg.x, seg.y);
      }
      seg.show();

      let coords = seg.pos();
      px = coords.x;
      py = coords.y;

    }
  }
}