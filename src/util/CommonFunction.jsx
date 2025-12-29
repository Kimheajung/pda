/* eslint-disable */
export function isDate(value) {
  return value instanceof Date;
}

// 날짜 : YYYY-MM-DD HH:mm:ss 로 변경
export function dateYYYYMMDDHHmmss(date) {
  date.setHours(date.getHours() + 9);
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

// null blank 체크
export function nullBlankCheck(value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
}

export function formatDate(dateString, format) {
  const date = new Date(dateString);
  return date.toLocaleDateString(format);
}

export function randomString(length) {
  let charset =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  let result = '';

  while (length > 0) {
    let bytes = new Uint8Array(16);
    let random = window.crypto.getRandomValues(bytes);

     
    random.forEach((c) => {
      if (length === 0) {
        return;
      }
      if (c < charset.length) {
        result += charset[c];
        length--;
      }
    });
  }
  return result;
}

export function htmlToString(html) {
  return html?.replace(/(<([^>]+)>)/gi, '');
}

export function jsonString(value) {
  return JSON.stringify(Array.from(value.entries()));
}

export function truncateString(string, length, ending) {
  if (length === null) {
    length = 100;
  }
  if (ending === null) {
    ending = ' ...';
  }
  if (string?.length > length) {
    return string.substring(0, length - ending.length) + ending;
  } else {
    return string;
  }
}

export function stripTags(input, allowed) {
  allowed = (
    ((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  return input.replace(tags, ($0, $1) =>
    allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
  );
}

export function round(amount, digitCount) {
  let precision = Math.pow(10, digitCount);
  return Math.round(amount * precision) / precision;
}

export function roundUp(amount, digitCount) {
  let precision = Math.pow(10, digitCount);
  return Math.ceil(amount * precision) / precision;
}

export function roundDown(amount, digitCount) {
  let precision = Math.pow(10, digitCount);
  return Math.floor(amount * precision) / precision;
}

export function roundTruncate(amount, digitCount) {
  let precision = Math.pow(10, digitCount);
  return Math.trunc(amount * precision) / precision;
}

export function isNumber(value) {
  if (value === '') return NaN;
  const number = Number(value);
  return Number.isInteger(number) ? number : NaN;
}

export function validEmail(text) {
  const regex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  return !regex.test(text);
}

export function minMaxLength(text, minLength, maxLength) {
  let result = !text || text.length < minLength;
  if (maxLength) result = result || text.length < minLength;
  return result;
}

//영문만(대소문자)만
export function validOnlyAlphabet(text) {
  const regex = RegExp(/^[A-Za-z]+$/);

  return !regex.test(text);
}

//숫자만
export function validOnlyNumber(text) {
  return !isNaN(parseFloat(text));
}

//0보다 큰 숫자만
export function validOnlyNotZeroNumber(text) {
  if (text === '' || text === null || text === 0) {
    return false;
  }

  if (isNaN(text)) {
    return false;
  }

  const regex = RegExp(/^[0-9]+$/);
  if (!regex.test(text)) {
    return false;
  }

  return true;
}

//영문(대소문자) + 숫자만
export function validOnlyAlphabetNumber(text) {
  const regex = RegExp(/^[a-zA-Z0-9]$/);

  return !regex.test(text);
}

//영문(대소문자) + 한글만
export function validOnlyAlphabetKorea(text) {
  const regex = RegExp(/[^ㄱ-ㅎ가-힣a-zA-Z]/);

  return !regex.test(text);
}

//한글만
export function validOnlyKorea(text) {
  const regex = RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

  return !regex.test(text);
}

//Url 형식 체크
export function validUrl(text) {
  const regex = RegExp(/^(http[s]?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/);

  return !regex.test(text);
}

//핸드폰번호 형식 체크
export function validPhone(text) {
  const regex = RegExp(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/);

  return !regex.test(text);
}

//공백제거
export function removeBlank(value) {
  return value.replace(/\s/g, '');
}

//숫자에 콤마추가
export function addComma(value) {
  return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  // /\B(?=(\d{3})+(?!\d))/g
}

//숫자에 콤마제거
export function removeComma(value) {
  value = String(value);
  return value.replace(/[^\d]+/g, '');
}

export function resultCheck(result, loadingRef, aAlert) {
  if (result === undefined) {
    aAlert('통신이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
    loadingRef.current.close();
    return;
  }
  if (loadingRef.current === null || loadingRef.current === undefined) {
    return false;
  } else {
    loadingRef.current.close();
  }
  let check = false;
  if (
    result === null ||
    result === undefined ||
    result.data === null ||
    result.data === undefined
  ) {
    check = false;
  } else {
    if (result.status === undefined) {
      check = false;
      return;
    } else {
      if (result.status !== 200 || result.data.SUCCESS === false) {
        if (result.data.SUCCESS === false) {
          //일치하는 정보가 없습니다.
          aAlert(`${result.data.MESSAGE}`, `알림`);
          return;
        }
        if (result.status === 500) {
          return;
        }
        if (result.status === 206) {
          //비밀번호 설정이 되지 않은 신규 사용자
          return;
        }
        if (result.status === 207) {
          //비밀번호 3개월 만료
          aAlert(`${result.data.header.desc}`, `알림`);
          return;
        }
        if (result.status === 406) {
          aAlert(`${result.data.header.desc}`, `알림`);
          return;
        }
        if (result.status === 400) {
          aAlert(`${result.data.header.desc}`, `알림`);
          return;
        }
        check = false;
      } else {
        if (result.data.DATA === null) {
          aAlert(`${result.data.MESSAGE}`, `알림`);
          return;
        }
        check = true;
      }
    }
  }
  return check;
}

export function resultCheck2(result, loadingRef, aAlert) {
  return new Promise((resolve, reject) => {
    let check = false;
    result
      .then((response) => {
        if (response.data.SUCCESS) {
          check = true;
        }
        loadingRef.current.close();
        resolve(check);
      })
      .catch((error) => {
        check = false;
        loadingRef.current.close();
        resolve(check);
      });
  });
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
