const casual = require("casual");

console.log(casual.city);
console.log(casual.integer((from = 1), (to = 100)));
const name = `${casual.name_prefix} ${casual.first_name} ${casual.last_name}`;
console.log(name);
