class Base64Decoder {
  static atob = (str) => Buffer.from(str, "base64").toString();
  static decode = (value) => {
    return value == null ||
      value == undefined ||
      typeof value == "boolean" ||
      typeof value == "number"
      ? value
      : typeof value == "string"
      ? this.decodeString(value)
      : typeof value == "object" && !Array.isArray(value)
      ? this.decodeObjectValues(value)
      : Array.isArray(value)
      ? this.decodeStringArray(value)
      : value;
  };

  static decodeString = (str) => this.atob(str);
  static decodeStringArray = (arr) => arr.map((v) => this.decode(v));
  static decodeObjectValues = (obj) => {
    const o = new Object().constructor();
    Object.entries(obj).forEach(
      ([key, value]) => (o[key] = this.decode(value))
    );
    return o;
  };
}

module.exports = {
  Base64Decoder,
};
