function togglePassword(fieldId, icon) {
  const passwordField = document.getElementById(fieldId);
  const isPasswordVisible = passwordField.getAttribute("type") === "password";
  
  passwordField.setAttribute("type", isPasswordVisible ? "text" : "password");
  
  icon.src = isPasswordVisible ? "../src/eye-off.png" : "../src/eye.png";
  icon.alt = isPasswordVisible ? "Hide Password" : "Show Password";
}

function showSignup() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

document.getElementById('signup-link').addEventListener('click', (event) => {
  event.preventDefault();
  showSignup();
});

document.getElementById('login-link').addEventListener('click', (event) => {
  event.preventDefault();
  showLogin();
});
