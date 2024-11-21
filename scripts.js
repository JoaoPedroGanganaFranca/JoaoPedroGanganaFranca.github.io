// Seleção de Elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const rangeContainer = document.querySelector("#length-container");
const btnOther = document.querySelector("#btn-other");
const lengthRange = document.querySelector("#length");
const lengthValue = document.querySelector("#length-value");
const copyMessage = document.querySelector("#copy-message");
const verifyPasswordButton = document.querySelector("#verify-password");
const strengthMessage = document.querySelector("#password-strength-message");

// Funções para os caracteres
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Função para gerar a senha
const generatePassword = (passwordLength = parseInt(lengthRange.value)) => {
  let password = "";
  const generators = [];

  if (document.querySelector("#letters").checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (document.querySelector("#numbers").checked) {
    generators.push(getNumber);
  }

  if (document.querySelector("#symbols").checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    alert("Selecione pelo menos uma opção de caracteres!");
    return;
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomValue = generators[Math.floor(Math.random() * generators.length)]();
    password += randomValue;
  }

  generatedPasswordElement.querySelector("h4").innerText = password;

  // Esconder a barra e o botão "Gerar senha" após a geração
  rangeContainer.style.display = "none";
  generatePasswordButton.style.display = "none";
};

// Exibir ambos (barra e botão) ao clicar no "Outro"
btnOther.addEventListener("click", () => {
  rangeContainer.style.display = "block"; // Exibe a barra de seleção
  generatePasswordButton.style.display = "block"; // Exibe o botão de criar senha
  resetLengthButtons(); // Reseta a seleção dos botões
});

// Atualizar o valor da barra de seleção de caracteres
lengthRange.addEventListener("input", (e) => {
  lengthValue.innerText = e.target.value; // Atualiza o valor da quantidade de caracteres exibida
});

// Atualizar a senha conforme a seleção de caracteres (6, 8 ou 12)
document.querySelector("#btn-6").addEventListener("click", () => {
  lengthRange.value = 6;
  lengthValue.innerText = 6;
  resetLengthButtons();
  document.querySelector("#btn-6").classList.add("selected");
  generatePassword(6); // Gera senha com 6 caracteres
});

document.querySelector("#btn-8").addEventListener("click", () => {
  lengthRange.value = 8;
  lengthValue.innerText = 8;
  resetLengthButtons();
  document.querySelector("#btn-8").classList.add("selected");
  generatePassword(8); // Gera senha com 8 caracteres
});

document.querySelector("#btn-12").addEventListener("click", () => {
  lengthRange.value = 12;
  lengthValue.innerText = 12;
  resetLengthButtons();
  document.querySelector("#btn-12").classList.add("selected");
  generatePassword(12); // Gera senha com 12 caracteres
});

// Função para resetar a classe selected de todos os botões
function resetLengthButtons() {
  const lengthButtons = document.querySelectorAll(".length-buttons button");
  lengthButtons.forEach(button => {
    button.classList.remove("selected");
  });
}

// Mostrar a senha gerada ao clicar no botão "Criar senha"
generatePasswordButton.addEventListener("click", () => {
  generatePassword();
});

// Copiar a senha ao clicar nela
generatedPasswordElement.querySelector("h4").addEventListener("click", () => {
  const password = generatedPasswordElement.querySelector("h4").innerText;
  navigator.clipboard.writeText(password).then(() => {
    copyMessage.classList.add("show");
    setTimeout(() => {
      copyMessage.classList.remove("show");
    }, 3000);
  });
});

// Função para verificar a força da senha
const verifyPasswordStrength = () => {
  const password = generatedPasswordElement.querySelector("h4").innerText;

  if (!password) {
    strengthMessage.innerText = "Por favor, gere uma senha primeiro.";
    strengthMessage.style.color = "red";
    return;
  }

  let score = 0;

  // Critérios para pontuação
  if (password.length >= 8) score++; // Comprimento mínimo
  if (password.length >= 12) score++; // Comprimento ideal
  if (/[a-z]/.test(password)) score++; // Letras minúsculas
  if (/[A-Z]/.test(password)) score++; // Letras maiúsculas
  if (/\d/.test(password)) score++; // Números
  if (/[^a-zA-Z\d]/.test(password)) score++; // Símbolos

  // Determinação da força com base na pontuação
  if (score <= 2) {
    strengthMessage.innerText = "Senha fraca";
    strengthMessage.style.color = "red";
  } else if (score <= 4) {
    strengthMessage.innerText = "Senha média";
    strengthMessage.style.color = "orange";
  } else {
    strengthMessage.innerText = "Senha forte";
    strengthMessage.style.color = "green";
  }
};

// Adicionar evento ao botão "Verificar Senha"
verifyPasswordButton.addEventListener("click", verifyPasswordStrength);
