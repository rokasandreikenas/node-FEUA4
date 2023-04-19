const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const passwordInput = document.querySelector("#password").value;
  const repeatPasswordInput = document.querySelector("#repeat-password").value;
  if (passwordInput === repeatPasswordInput) {
    const password = passwordInput;
    const email = document.querySelector("#email").value;
    const firstname = document.querySelector("#firstname").value;
    const surname = document.querySelector("#surname").value;
    const address = document.querySelector("#address").value;
    const postcode = document.querySelector("#postcode").value;
    const city = document.querySelector("#city").value;
    const phone = document.querySelector("#phone").value;
    const isAgreemnet = document.querySelector("#agreement").checked;

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
        firstname,
        surname,
        address,
        postcode,
        city,
        phone,
        isAgreemnet,
      }),
    })
      .then(() => {
        window.open("index.html", "_blank"); // atidaro naujam tabe index.html puslapi
      })
      .catch((error) => console.log(error));
    form.reset();
  } else {
    alert("Nesutampa slaptadzodis, suveskite is naujo!");
  }
});
