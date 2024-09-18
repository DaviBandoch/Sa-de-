document.addEventListener('DOMContentLoaded', function() {
    const agendamentoForm = document.getElementById('agendamento-form');
    const medicamentosForm = document.getElementById('medicamentos-form');
    const sintomasForm = document.getElementById('sintomas-form');
  
    agendamentoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Consulta agendada com sucesso!');
    });
  
    medicamentosForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Lembrete de medicamento adicionado!');
    });
  
    sintomasForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Sintoma registrado!');
    });
  });
  