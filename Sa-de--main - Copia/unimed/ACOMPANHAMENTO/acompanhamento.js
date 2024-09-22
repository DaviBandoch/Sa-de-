// Função para carregar as consultas do localStorage
function carregarConsultas() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const listaConsultas = document.getElementById('lista-consultas');
    const avisoVazio = document.getElementById('aviso-vazio');

    // Verifica se há consultas agendadas
    if (consultas.length === 0) {
        avisoVazio.style.display = 'block'; // Exibe aviso se não houver consultas
        listaConsultas.innerHTML = ''; // Limpa a lista
        return;
    } else {
        avisoVazio.style.display = 'none'; // Oculta aviso se houver consultas
    }

    // Limpa a lista antes de adicionar as consultas
    listaConsultas.innerHTML = '';

    // Cria uma lista para exibir as consultas
    consultas.forEach((consulta, index) => {
        const consultaDiv = document.createElement('div');
        consultaDiv.classList.add('consulta-item');
        consultaDiv.innerHTML = `
            <div class="consulta-info">
                <strong>Consulta ${index + 1}:</strong><br>
                Data: ${consulta.data}<br>
                Hora: ${consulta.hora}<br>
                Cidade: ${consulta.cidade}<br>
                Especialidade: ${consulta.especialidade}<br>
                Médico: ${consulta.nomeMedico}<br>
                Bairro: ${consulta.bairro}<br>
            </div>
            <button onclick="cancelarConsulta(${index})">Cancelar</button>
            <hr>
        `;
        listaConsultas.appendChild(consultaDiv);
    });
}

// Função para cancelar uma consulta
function cancelarConsulta(index) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.splice(index, 1); // Remove a consulta do array
    localStorage.setItem('consultas', JSON.stringify(consultas)); // Atualiza o localStorage
    carregarConsultas(); // Recarrega as consultas na tela
}

// Carrega as consultas ao abrir a página
document.addEventListener('DOMContentLoaded', carregarConsultas);
