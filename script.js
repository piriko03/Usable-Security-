const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const username = document.getElementById("username");
const secureBtn = document.getElementById("secureBtn");

const rules = {
    length: document.getElementById("length"),
    upper: document.getElementById("upper"),
    lower: document.getElementById("lower"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

function showBadError() {
    document.getElementById("badError").style.display = "block";
}

function setRule(element, valid, text) {
    element.className = valid ? "rule valid" : "rule invalid";
    element.textContent = valid ? "✓ " + text : "✕ " + text;
}

function validateForm() {
        const pass = password.value;
        const confirm = confirmPassword.value;
        const user = username.value;
    

        const checks = {
          length: pass.length >= 8,
          upper: /[A-Z]/.test(pass),
          lower: /[a-z]/.test(pass),
          number: /[0-9]/.test(pass),
          special: /[^A-Za-z0-9]/.test(pass)
    };

    setRule(rules.length, checks.length, "At least 8 characters");
    setRule(rules.upper, checks.upper, "1 uppercase letter");
    setRule(rules.lower, checks.lower, "1 lowercase letter")
    setRule(rules.number, checks.number, "1 number");
    setRule(rules.special, checks.special, "1 special character");

     const score = Object.values(checks).filter(Boolean).length;
     const bar = document.getElementById("strengthBar");
     const text = document.getElementById("strengthText");

    if (score === 0) {
        bar.style.width = "0%";
        bar.textContent = "Password Strength:";
        text.style.color = "#6b7280";
    }   else if (score <= 2) {
        bar.style.width = "33%";
        bar.style.background = "#dc2626";
        text.textContent = "Weak Password";
        text.style.color = "#dc2626";
    } else if (score <= 4) {
        bar.style.width = "66%";
        bar.style.background = "#f59e0b";
        text.textContent = "Medium Password";
        text.style.color = "#f59e0b";
    } else {
        bar.style.width = "100%";
        bar.style.background = "#16a34a";
        text.textContent = "Strong Password";
        text.style.color = "#16a34a";
    }

    const userValid = /^[A-Za-z0-9_]{4,16}$/.test(user);
    const allPasswordValid = Object.values(checks).every(Boolean);
    const passwordsMatch = pass !== "" && pass === confirm;

    document.getElementById("matchError").style.display = 
      confirm && !passwordsMatch ? "block" : "none";

    document.getElementById("matchSuccess").style.display =
      passwordsMatch ? "block" : "none";

    secureBtn.disabled = !(userValid && allPasswordValid && passwordsMatch);
}

password.addEventListener("input", validateForm);
confirmPassword.addEventListener("input", validateForm);
username.addEventListener("input", validateForm);

secureBtn.addEventListener("click", function() {
    document.getElementById("accountSuccess").style.display = "block";
});