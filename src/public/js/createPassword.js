const createPasswordForm = document.getElementById("recoveryForm");
const inputPassword = document.getElementById("password");

createPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let recoveryToken = window.location.href.split("/")[4];

  const password = inputPassword.value;

  fetch(`../api/auth/createPassword/${recoveryToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response == "El token ha expirado o es invalido.") {
        alert(response);
        window.location.href = "/recoveryPass";
      } else if (
        response == "La contraseña no puede haber sido usada anteriormente."
      ) {
        alert(response);
      } else {
        alert(response.message);
        window.location.href = "/";
      }
    })
    .catch((error) => console.error("Error:", error));
});
