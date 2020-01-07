class Segment {
  constructor(x, y, ipa, sonority, selected) {
    this.x = x;
    this.y = y;
    this.ipa = ipa;
    this.sonority = sonority;
    this.selected = selected;
  }


  show() {
    stroke(0);
    fill(255);
    if (this.selected) {
      fill(0, 195, 230);
    }
    text(this.ipa, this.x, height * (this.sonority / 11));
  }
}
