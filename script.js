let saldo = 0;
let historico = [];
let isAdmin = false;
let nomeUsuario = '';
let usuarios = {
  'patroa': 'dreampatroa',
  'patrão': 'dreampardal',
  'castelanni': 'dreamcastelanni',
};

function autenticar() {
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha').value;

  if (usuarios[nome] && usuarios[nome] === senha) {
    nomeUsuario = nome;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('nome-usuario').style.display = 'block';

    if (nome === 'patroa' || nome === 'patrão') {
      isAdmin = true;
      document.getElementById('edit-saldo').style.display = 'block';
    }
  } else {
    alert('Senha ou nome de usuário inválidos');
  }
}

function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo.toFixed(2);
}

function atualizarHistorico() {
  const historicoElement = document.getElementById('historico');
  historicoElement.innerHTML = '';
  const itemsToShow = Math.min(5, historico.length);
  
  for (let i = historico.length - 1; i >= historico.length - itemsToShow; i--) {
    const item = historico[i];
    const li = document.createElement('li');
    li.textContent = `${item.tipo} de R$ ${item.valor.toFixed(2)} - Motivo: ${item.motivo} - Por: ${item.usuario}`;
    historicoElement.appendChild(li);
  }
  
  if (historico.length > 5) {
    document.getElementById('btn-mostrar-mais').style.display = 'block';
  }
}

function depositar() {
  const valor = parseFloat(document.getElementById('valor').value);
  const motivo = document.getElementById('motivo').value;

  if (!isNaN(valor) && valor > 0 && motivo) {
    saldo += valor;
    historico.push({ tipo: 'Depósito', valor, motivo, usuario: nomeUsuario });
    atualizarSaldo();
    atualizarHistorico();
    salvarDados();
  } else {
    alert('Por favor, insira um valor válido e um motivo.');
  }
}

function retirar() {
  const valor = parseFloat(document.getElementById('valor').value);
  const motivo = document.getElementById('motivo').value;

  if (!isNaN(valor) && valor > 0 && motivo) {
    saldo -= valor;
    historico.push({ tipo: 'Retirada', valor, motivo, usuario: nomeUsuario });
    atualizarSaldo();
    atualizarHistorico();
    salvarDados();
  } else {
    alert('Por favor, insira um valor válido e um motivo.');
  }
}

function atualizarSaldoDiretamente() {
  const novoSaldo = parseFloat(document.getElementById('novo-saldo').value);
  if (!isNaN(novoSaldo)) {
    saldo = novoSaldo;
    atualizarSaldo();
    salvarDados();
  } else {
    alert('Por favor, insira um valor válido.');
  }
}

function salvarNome() {
  nomeUsuario = document.getElementById('nome').value;
  alert(`Nome salvo: ${nomeUsuario}`);
}

function mostrarMaisHistorico() {
  const historicoElement = document.getElementById('historico');
  historicoElement.innerHTML = '';
  historico.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.tipo} de R$ ${item.valor.toFixed(2)} - Motivo: ${item.motivo} - Por: ${item.usuario}`;
    historicoElement.appendChild(li);
  });
  document.getElementById('btn-mostrar-mais').style.display = 'none';
}

function salvarDados() {
  localStorage.setItem('saldo', saldo);
  localStorage.setItem('historico', JSON.stringify(historico));
}

function carregarDados() {
  const saldoSalvo = localStorage.getItem('saldo');
  const historicoSalvo = localStorage.getItem('historico');

  if (saldoSalvo) {
    saldo = parseFloat(saldoSalvo);
    atualizarSaldo();
  }

  if (historicoSalvo) {
    historico = JSON.parse(historicoSalvo);
    atualizarHistorico();
  }
}

window.onload = carregarDados;
