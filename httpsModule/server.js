import https from "node:https";

const url = "https://dog.ceo/api/breeds/image/random";

const req = https.request(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  res.on("end", () => {
    const body = JSON.parse(data);
    console.log(body.message);
  });
});

req.on("error", (error) => {
  console.log("An error: ", error);
});
req.end();
