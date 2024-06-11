let login_cnt = '0'


function addJavascript(jsname) { // 자바스크립트 외부 연동
  var th = document.getElementsByTagName('head')[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', jsname);
  th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수



const check_xss = (input) => {
  const DOMPurify = window.DOMPurify;

  const sanitizedInput = DOMPurify.sanitize(input);

  if (sanitizedInput !== input) {
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;

  }
  return sanitizedInput;

}

const check_input = () => {
  const idsave_check = document.getElementById('idSaveCheck');
  const loginForm = document.getElementById('login_form');
  const loginBtn = document.getElementById('login_btn');
  const emailInput = document.getElementById('typeEmailX');
  const passwordInput = document.getElementById('typePasswordX');


  // const c = '아이디 페스워드를 체크합니다.';
  // alert(c);

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === '') {
    alert('이메일을 입력하세요. ');
    return false;
  }
  if (passwordValue === '') {
    alert('비밀번호를 입력하세요. ');
    return false;
  }
  if (emailValue.length < 5) {
    alert('아이디는 최소 5글자 이상 입력해야 합니다.');
    return false;
  }
  if (emailValue.length > 25) {
    alert('아이디는 최대 24글자로 입력해야 합니다.');
    return false;
  }
  if (passwordValue.length < 12) {
    alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
    return false;
  }
  if (emailValue.length === 0 || passwordValue.length === 0) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
  }
  // 3글자 이상 반복 입력 검증
  if (/(\w)\1\1/.test(emailValue) || /(\w)\1\1/.test(passwordValue)) {
    alert('아이디와 비밀번호에 3글자 이상 반복되는 문자를 사용할 수 없습니다.');
    return false;
  }

  // 연속되는 숫자 2개 이상 반복 입력 검증
  if (/(?:01|12|23|34|45|56|67|78|89|90)\2/.test(emailValue) ||
    (/(?:01|12|23|34|45|56|67|78|89|90)\2/.test(passwordValue))) {
    alert('아이디와 비밀번호에 연속되는 숫자를 2개 이상 반복해서 사용할 수 없습니다.');
    return false;
  } else {
    session_set(); // 세션 생성
    // form.submit();
  }

  const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
  if (!hasSpecialChar) {
    alert('패스워드는 특수문자를 1개 이상 포함해야합니다.');
    return false;
  }
  const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
  const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
  if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
    return false;
  }


  const santitizedPassword = check_xss(passwordValue);
  const sanitizedEmail = check_xss(emailValue);

  if (!sanitizedEmail) {
    return false;
  }
  if (!santitizedPassword) {
    return false;
  }

  console.log('이메일:', emailValue);
  console.log('비밀번호:', passwordValue);
  if (idsave_check.checked == true) {
    alert("쿠키를 저장합니다.", emailValue);
    setCookie("id", emailValue, 1);
    alert("쿠키 값 :" + emailValue);
  }
  else {
    setCookie("id", emailValue, 0);
  }

  loginForm.submit();
  login_count();
};
document.getElementById("login_btn").addEventListener('click', check_input);




function logout() {
  session_del();
  location.href = '../index.html';
  logout_count();
}

function init() {
  const emailInput = document.getElementById('typeEmailX');
  const idsave_check = document.getElementById('idSaveCheck');
  let get_id = getCookie("id");

  if (get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
  }
  session_check();
}

function init_logined() {
  if (sessionStorage) {
    decrypt_text();
  }
  else ("세션 스토리지 지원 x");
}

function login_count() {
  let loginCnt = getCookie("login_cnt");
  if (!loginCnt) {
    setCookie("login_cnt", 1, 7); // 로그인 횟수를 1로 설정하고, 쿠키의 유효기간을 7일로 설정
  } else {
    loginCnt = parseInt(loginCnt) + 1;
    setCookie("login_cnt", loginCnt, 7); // 쿠키 업데이트
  }
  alert("로그인 횟수: " + loginCnt); // 선택사항: 사용자에게 로그인 횟수를 알림
}
function logout_count() {
  let logoutCnt = getCookie("logout_cnt");
  if (!logoutCnt) {
    setCookie("logout_cnt", 1, 7); // 로그아웃 횟수를 1로 설정하고, 쿠키의 유효기간을 7일로 설정
  } else {
    logoutCnt = parseInt(logoutCnt) + 1;
    setCookie("logout_cnt", logoutCnt, 7); // 쿠키 업데이트
  }
  alert("로그아웃 횟수: " + logoutCnt); // 선택사항: 사용자에게 로그아웃 횟수를 알림
}
