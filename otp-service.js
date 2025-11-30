const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "otp-service.txt");

// In-memory temporary storage
let storedOTP = null;

function readFile() {
  if (!fs.existsSync(FILE_PATH)) return "";
  return fs.readFileSync(FILE_PATH, "utf8").trim();
}

function clearFile() {
  fs.writeFileSync(FILE_PATH, "");
}

function writeFile(msg) {
  fs.writeFileSync(FILE_PATH, msg);
}

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function processCommand(cmd) {

  // -------------------------
  // COMMAND: generate
  // -------------------------
  if (cmd === "generate") {
    storedOTP = generateOTP();
    console.log(`[OTPService] Generated OTP: ${storedOTP}`);
    return `otp:${storedOTP}`;
  }

  // -------------------------
  // COMMAND: verify:<userOTP>
  // -------------------------
  if (cmd.startsWith("verify:")) {
    const userInput = cmd.replace("verify:", "").trim();

    if (!storedOTP) {
      return "error:No OTP generated yet";
    }

    if (userInput === storedOTP) {
      console.log("[OTPService] OTP verified successfully!");
      storedOTP = null; 
      return "verified:true";
    } else {
      console.log("[OTPService] OTP verification failed.");
      return "verified:false";
    }
  }

  // -------------------------
  // INVALID
  // -------------------------
  return "error:Invalid command";
}

function main() {
  console.log("[OTPService] Running... waiting for commands.");

  setInterval(() => {
    const content = readFile();

    if (content === "") return;

    console.log(`[OTPService] Detected command: ${content}`);

    const response = processCommand(content);

    clearFile();
    writeFile(response);

    console.log(`[OTPService] Response: ${response}`);
  }, 400);
}

main();
