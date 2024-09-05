class RabinKarp {
  text: string;
  substring: string;

  constructor(text: string, substring: string) {
    this.text = text;
    this.substring = substring;
  }

  hash(value: string) {
    let hash = 0;

    for (const character of value) {
      hash += character.charCodeAt(0);
    }

    return hash;
  }

  find() {
    for (let i = 0; i <= this.text.length - this.substring.length; i++) {
      const substringHash = this.hash(this.substring);
      const textWindowHash = this.hash(
        this.text.slice(i, i + this.substring.length)
      );

      if (
        substringHash === textWindowHash &&
        this.substring === this.text.slice(i, i + this.substring.length)
      ) {
        return i;
      }
    }
  }
}

const loremIpsumMatch = new RabinKarp(
  "Lorem ipsum, ipsum lorem, isp lro",
  "isp lro"
).find();

console.log(loremIpsumMatch);
