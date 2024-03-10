const express = require("express");
const app = express();
const NetworkSpeed = require("network-speed");
const testNetworkSpeed = new NetworkSpeed();

// Define functions for network speed tests
async function getNetworkDownloadSpeed() {
  const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(
    baseUrl,
    fileSizeInBytes
  );
  return speed;
}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: "www.google.com",
    port: 80,
    path: "/catchers/544b09b4599c1d0200000289",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fileSizeInBytes = 2000000;
  const speed = await testNetworkSpeed.checkUploadSpeed(
    options,
    fileSizeInBytes
  );
  return speed;
}

// Define route for running speed tests
app.get("/speed-test", async (req, res) => {
  try {
    const downloadSpeed = await getNetworkDownloadSpeed();
    const uploadSpeed = await getNetworkUploadSpeed();
    res.json({ downloadSpeed, uploadSpeed });
  } catch (error) {
    console.error("Error running speed tests:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Serve static files from the "public" directory
app.use(express.static("public"));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
