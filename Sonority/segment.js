class Segment {
  constructor(x, ipa, sonority, selected) {
    this.x = x;
    this.ipa = ipa;
    this.sonority = sonority;
    this.selected = selected;
    this.y = height * (this.sonority / 11);
  }

  _updateY() {
    this.y = height * (this.sonority / 11);
  }

  pos() {
    this._updateY();
    return {
      x: this.x,
      y: this.y
    };
  }

  show() {
    this._updateY();
    stroke(0);
    fill(255);
    if (this.selected) {
      fill(0, 195, 230);
    }
    text(this.ipa, this.x, this.y);
  }
}