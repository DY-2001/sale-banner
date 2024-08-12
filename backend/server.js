const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db/database");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/banner", (req, res) => {
  pool.query("SELECT * FROM banner", (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

app.post("/banner", (req, res) => {
  const { bannerVisibility, bannerDescription, bannerEndTime, bannerLink } =
    req.body;
  const query =
    "UPDATE banner SET bannerVisibility = ?, bannerDescription = ?, bannerEndTime = ?, bannerLink = ? WHERE id = 1";

    pool.query(
    query,
    [bannerVisibility, bannerDescription, bannerEndTime, bannerLink],
    (err) => {
      if (err) {
        console.error("Error updating banner:", err);
        return res.status(500).send("Error updating banner");
      }
      res.send("Banner updated successfully");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
