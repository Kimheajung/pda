const fnByte = (text, byte) => {
  let byteCount = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    // eslint-disable-next-line no-control-regex
    if (/[\u3131-\uD79D]/.test(char) || /[^\x00-\x7F]/.test(char)) {
      byteCount += byte;
    } else {
      byteCount += 1;
    }
  }
  return byteCount;
};

export const CommonByte = (inputText, byteLength, byte) => {
  // let inputText = e.target.value;
  // let inputText = e;
  const byteCount = fnByte(inputText, byte);

  if (byteCount > byteLength) {
    let tempText = '';
    let tempByteCount = 0;

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText.czharAt(i);
      // eslint-disable-next-line no-control-regex
      if (/[\u3131-\uD79D]/.test(char) || /[^\x00-\x7F]/.test(char)) {
        if (tempByteCount + byte > byteLength) break;
        tempText += char;
        tempByteCount += byte;
      } else {
        if (tempByteCount + 1 > byteLength) break;
        tempText += char;
        tempByteCount += 1;
      }
    }
    return tempText;
  } else {
    return inputText;
  }
};
