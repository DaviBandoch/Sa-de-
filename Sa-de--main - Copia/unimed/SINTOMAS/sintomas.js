// Lista de perguntas, respostas e lógica para determinar especialista
const questions = [
    {
        id: "general",
        question: "Você sente alguma dor?",
        options: ["Sim", "Não"],
        nextStep: (answer) => (answer === "Sim" ? "qualDor" : "geral"),
    },
    {
        id: "qualDor",
        question: "Qual é o tipo de dor que você sente?",
        options: ["Peito", "Cabeça", "Estômago", "Outra"],
        nextStep: (answer) => {
            if (answer === "Peito") return "cardio";
            if (answer === "Cabeça") return "neuro";
            if (answer === "Estômago") return "gastro";
            return "geral";
        }
    },
    {
        id: "geral",
        question: "Você está com outros sintomas (febre, cansaço, etc.)?",
        options: ["Sim", "Não"],
        nextStep: () => "clinico",
    },
    {
        id: "cardio",
        result: "Você deve procurar um Cardiologista.",
    },
    {
        id: "neuro",
        result: "Você deve procurar um Neurologista.",
    },
    {
        id: "gastro",
        result: "Você deve procurar um Gastroenterologista.",
    },
    {
        id: "clinico",
        result: "Você deve procurar um Clínico Geral.",
    },
];

// Variáveis de controle
let currentStep = "general"; // Definindo o passo inicial
let questionData = questions.find(q => q.id === currentStep); // Pega a primeira pergunta
let history = []; // Armazena o histórico de perguntas

// Elementos do DOM
const questionContainer = document.getElementById("questionContainer");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const result = document.getElementById("result");

// Função para gerar perguntas
function renderQuestion() {
    // Verifica se chegamos a um ponto de resultado
    if (questionData.result) {
        result.textContent = questionData.result; // Exibe o resultado
        nextBtn.style.display = "none"; // Esconde o botão de próxima
        backBtn.style.display = "none"; // Esconde o botão de voltar
        return;
    }

    // Limpa o conteúdo existente
    questionContainer.innerHTML = '';

    // Renderiza a pergunta e as opções
    const questionText = document.createElement('p');
    questionText.textContent = questionData.question;
    questionContainer.appendChild(questionText);

    questionData.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionContainer.appendChild(label);
        questionContainer.appendChild(document.createElement("br"));
    });

    // Exibe o botão de voltar se o usuário não estiver na primeira pergunta
    backBtn.style.display = history.length > 0 ? "inline-block" : "none";
}

// Função para avançar para a próxima pergunta
nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    // Verifica se o usuário selecionou uma resposta
    if (!selectedOption) {
        alert("Por favor, selecione uma resposta.");
        return;
    }

    const answer = selectedOption.value;
    
    // Verifica o próximo passo
    const nextStep = questionData.nextStep ? questionData.nextStep(answer) : null;

    // Adiciona a pergunta atual ao histórico antes de mudar para a próxima
    history.push({ step: currentStep, question: questionData });

    // Atualiza a próxima pergunta com base na resposta
    if (nextStep) {
        currentStep = nextStep;
        questionData = questions.find(q => q.id === nextStep);
    }
    
    // Renderiza a próxima pergunta
    renderQuestion();
});

// Função para voltar para a pergunta anterior
backBtn.addEventListener("click", () => {
    if (history.length > 0) {
        const previous = history.pop(); // Remove o último item do histórico
        currentStep = previous.step; // Retorna para a etapa anterior
        questionData = previous.question; // Recupera a pergunta anterior
        renderQuestion(); // Renderiza a pergunta anterior
    }
});

// Inicializa a primeira pergunta
renderQuestion();
