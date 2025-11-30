const fs = require("fs");
const path = require("path");

const OTP_FILE = path.join(__dirname, "otp-service.txt");

function sendToOTPService(msg) {
  fs.writeFileSync(OTP_FILE, msg);
}

function readFromOTPService() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const data = fs.readFileSync(OTP_FILE, "utf8").trim();

      if (data !== "" && !data.startsWith("generate") && !data.startsWith("verify")) {
        clearInterval(interval);
        resolve(data);
      }
    }, 200);
  });
}

async function runOTPExample() {
  console.log("Requesting OTP...");

  sendToOTPService("generate");
  let response = await readFromOTPService();
  console.log("OTP Response:", response);

  const otp = response.replace("otp:", "").trim();

  console.log("Sending verification...");
  sendToOTPService(`verify:${otp}`);

  response = await readFromOTPService();
  console.log("Verification result:", response);
}

runOTPExample();
