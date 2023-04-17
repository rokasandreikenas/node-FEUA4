fetch("http://localhost:3000/")
  .then((resp) => resp.json())
  .then((response) => {
    const namesList = document.getElementById("names");

    response.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      namesList.append(li);
    });
  });

const nameButton = document.getElementById("nameButton");
nameButton.addEventListener("click", () => {
  const name = document.querySelector("input[name='name']").value;

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }).then(() => {
    location.reload();
  });
});
