fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      const tbody = document.querySelector("tbody");
      const tr = document.createElement("tr");

      Object.values(user).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      });

      tbody.append(tr);
    });
  });
