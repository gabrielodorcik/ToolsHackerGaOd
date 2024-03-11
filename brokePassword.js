const fs = require("fs");
const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function gerarSenhaAleatoria() {
  let senha = "";
  for (let i = 0; i < 6; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(indice);
  }

  return senha;
}

function quebrarSenha(senha) {
  const tamanhoSenha = senha.length;
  let tentativas = 0;

  function percorrerCombinacoes(prefixo, nivel) {
    tentativas++;
    if (nivel === tamanhoSenha) {
      if (prefixo === senha) {
        console.log("Senha encontrada:", prefixo);
        return true;
      }
      return false;
    }

    for (let i = 0; i < caracteres.length; i++) {
      if (percorrerCombinacoes(prefixo + caracteres[i], nivel + 1)) {
        return true;
      }
    }

    return false;
  }

  const startTime = new Date();
  const encontrada = percorrerCombinacoes("", 0);
  const endTime = new Date();
  const tempoTotal = (endTime - startTime) / 1000; // Convertendo para segundos

  return { encontrada, tentativas, tempoTotal };
}

function validarSenhaEncontrada(resultados) {
  if (resultados.encontrada) {
    console.log(
      "Senha encontrada em",
      resultados.tempoTotal,
      "segundos após",
      resultados.tentativas,
      "tentativas.",
    );
  } else {
    console.log(
      "Senha não encontrada após",
      resultados.tentativas,
      "tentativas.",
    );
  }
}

fs.writeFileSync("brokePassword.txt", gerarSenhaAleatoria());

const senha = gerarSenhaAleatoria();
console.log("Senha aleatória gerada:", senha);

const resultados = quebrarSenha(senha);
validarSenhaEncontrada(resultados);
