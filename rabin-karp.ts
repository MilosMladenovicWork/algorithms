class RabinKarp {
  text: string;
  pattern: string;

  constructor(text: string, pattern: string) {
    this.text = text;
    this.pattern = pattern;
  }

  find() {
    const hashedPattern = this.hash(this.pattern);

    let startIndex = 0;
    let endIndex = startIndex + this.pattern.length;

    while (this.text.length >= endIndex) {
      const textSlice = this.text.slice(startIndex, endIndex);

      const hashedTextSlice = this.hash(textSlice);

      if (hashedPattern === hashedTextSlice) {
        if (this.pattern === textSlice) {
          return textSlice;
        }
      }

      startIndex += 1;
      endIndex += 1;
    }
  }

  private hash(value: string) {
    let hashedValue: number = 0;

    for (let i = 0; i < value.length; i++) {
      hashedValue += value.charCodeAt(i);
    }

    return hashedValue;
  }
}

const loremIpsumMatch = new RabinKarp(
  "Lorem ipsum, ipsum lorem, isp lro",
  "isp lro"
).find();

console.log(loremIpsumMatch);
