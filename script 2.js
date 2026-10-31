const password = document.getElementById("password");

const commonPasswords = [
  "password",
  "password123",
  "12345678",
  "qwerty123",
  "admin123",
  "welcome123",
  "iloveyou"
];

function togglePassword() {
  const button = document.querySelector(".input-box button");
  
  if (password.type === "password") {
    password.type = "text";
    button.textContent = "Hide";
  } else {
    password.type = "password";
    button.textContent = "Show";
  }
}

function updateTip(id, condition) {
  const messages = {
    length: "At least 8 characters",
    upper: "One uppercase letter",
    lower: "One lowercase letter",
    number: "One number",
    special: "One special character"
  };
  
  document.getElementById(id).textContent =
    (condition ? "✅ " : "❌ ") + messages[id];
}

function checkPassword() {
  
  const value = password.value;
  const lowerValue = value.toLowerCase();
  
  const hasLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value);
  
  updateTip("length", hasLength);
  updateTip("upper", hasUpper);
  updateTip("lower", hasLower);
  updateTip("number", hasNumber);
  updateTip("special", hasSpecial);
  
  const strength = document.getElementById("strength");
  const result = document.getElementById("result");
  
  if (value.length === 0) {
    result.textContent = "Password strength: Not checked";
    strength.style.width = "0%";
    return;
  }
  
  if (commonPasswords.includes(lowerValue)) {
    result.textContent = "⚠️ Common Password - Very Weak!";
    strength.style.width = "10%";
    strength.style.background = "#ef4444";
    return;
  }
  
  let score = [
    hasLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial
  ].filter(Boolean).length;
  
  if (/(.)\1{3,}/.test(value)) {
    score--;
  }
  
  if (score <= 2) {
    result.textContent = "Password Strength: Weak ❌";
    strength.style.width = "25%";
    strength.style.background = "#ef4444";
  }
  else if (score <= 4) {
    result.textContent = "Password Strength: Medium ⚠️";
    strength.style.width = "65%";
    strength.style.background = "#f59e0b";
  }
  else {
    result.textContent = "Password Strength: Strong ✅";
    strength.style.width = "100%";
    strength.style.background = "#22c55e";
  }
}

// Real-time password checking
password.addEventListener("input", checkPassword);