// Ištraukti duomenis ir atvaizduoti kaip listą
fetch("http://localhost:3000/")
  .then((resp) => resp.json())
  .then((response) => {
    const productsList = document.getElementById("products");
    response.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      productsList.append(li);
    });
  });

const button = document.getElementById("productButton");
button.addEventListener("click", () => {
  const product = document.querySelector("input[name='product']").value;

  // Pridėti naują produktą (duomenį) į serverį
  // fetch(serverio URL, papildomi parametrai) <- struktūra
  // serverio URL - adresas iki serverio
  // papildomi parametrai - tai parametrų objektas, kuris nusako esybes apie mūsų kreipimąsį
  // esybės: method, headers, body
  // method - kreipimosi metodas, gali būti pvz: "POST", "PUT", "DELETE", "GET" (defaultinis)
  // headers - objektas {...}, gali būti {"Content-Type": "application/json"} - nurodo, kad siunčiami duomenys yra JSON formato
  // body - mūsų siunčiami duomenys, reikia pridėti JSON.stringify(data) tam, kad serveris suprastų siunčiamus duomenis. Būtinai turi būti JSON formato aka Javascript Object pvz. Pvz: {name: "Rokas", surname: "Andreikenas"}
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      // .then() kai kvietimas įvykdytas, įvykdo .then() dalį
      // .then(response)  - response dalis, tai kas grįžta iš serverio iš res.send()

      // perkrauti puslapį
      location.reload();
    });
});
