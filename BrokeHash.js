const fs = require("fs");
const crypto = require("crypto");

function hashPassword(senha) {
  const salt = crypto.randomBytes(32).toString("hex");

  const hashedPassword = crypto
    .pbkdf2Sync(senha, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    hashedPassword: hashedPassword,
    salt: salt,
  };
}

function verifyPassword(senha, hashedPassword, salt) {
  const hashedAttempt = crypto
    .pbkdf2Sync(senha, salt, 10000, 64, "sha512")
    .toString("hex");

  return hashedPassword === hashedAttempt;
}

const senha = fs.readFileSync("brokePassword.txt", "utf8").trim(); 

const { hashedPassword, salt } = hashPassword(senha);
console.log("Senha original:", senha);
console.log("Senha hash:", hashedPassword);
console.log("Salt:", salt);

const passwordTest = "senhaTeste123";
const isValid = verifyPassword(passwordTest, hashedPassword, salt);
console.log("Senha de teste válida:", isValid);
