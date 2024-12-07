const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(require("./routes/reservations.route"));
app.use(require("./routes/rooms.route"));
app.use(require("./routes/guest.route"));

app.listen(PORT, () => {
  console.log("Server running on Port:" + PORT);
});
