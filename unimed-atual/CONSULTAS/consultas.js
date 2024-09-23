// Seleciona o formulário de agendamento
const agendamentoForm = document.getElementById('agendamento-form');

// Função para armazenar a consulta
function armazenarConsulta(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const cidade = document.getElementById('cidade').value;
    const especialidade = document.getElementById('especialidade').value;
    const nomeMedico = document.getElementById('nome-medico').value;
    const bairro = document.getElementById('bairro').value;

    // Cria um objeto para a consulta
    const consulta = {
        data,
        hora,
        cidade,
        especialidade,
        nomeMedico,
        bairro
    };

    // Armazena a consulta no localStorage
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    // Limpa o formulário após o agendamento
    agendamentoForm.reset();

    // Mostra o aviso de agendamento
    const avisoAgendamento = document.getElementById("aviso-agendamento");
    avisoAgendamento.style.display = "block";

    // Opcional: Limpa o aviso após alguns segundos
    setTimeout(() => {
        avisoAgendamento.style.display = "none";
    }, 3000); // 3 segundos
}

// Adiciona o evento de submit ao formulário
agendamentoForm.addEventListener('submit', armazenarConsulta);

const agendaForm = document.getElementById("agenda-form");
const avisoDisponibilidade = document.getElementById("aviso-disponibilidade");

agendaForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    // Aqui você pode adicionar a lógica para verificar a disponibilidade
    // Para o exemplo, vamos supor que a consulta está sempre disponível

    avisoDisponibilidade.style.display = "block"; // Exibe o aviso

    // Opcional: Limpa o aviso após alguns segundos
    setTimeout(() => {
        avisoDisponibilidade.style.display = "none";
    }, 3000); // 3 segundos
});
