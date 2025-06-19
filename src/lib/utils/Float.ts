class Float {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  private getDecimalLength(num: number): number {
    return (String(num).split('.')[1] || '').length;
  }

  private scaleFactor(a: number, b: number): number {
    return Math.pow(10, Math.max(this.getDecimalLength(a), this.getDecimalLength(b)));
  }

  add(num: number): Float {
    const factor = this.scaleFactor(this.value, num);
    this.value = (Math.round(this.value * factor) + Math.round(num * factor)) / factor;
    return this;
  }

  subtract(num: number): Float {
    const factor = this.scaleFactor(this.value, num);
    this.value = (Math.round(this.value * factor) - Math.round(num * factor)) / factor;
    return this;
  }

  getValue(): number {
    return this.value;
  }
}

export default (value: number) => {
  return new Float(value);
};
