let saldo = 0;
let historico = [];
let isAdmin = false;
let nomeUsuario = '';

function autenticar() {
  const senha = document.getElementById('senha').value;
  if (senha === 'dream') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('nome-usuario').style.display = 'block';
  } else if (senha === 'dreampatroa') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('edit-saldo').style.display = 'block';
    document.getElementById('nome-usuario').style.display = 'block';
    isAdmin = true;
  } else {
    alert('Senha inválida');
  }
}

function atualizarSaldo() {
  document.getElementById('saldo').innerText = saldo.toFixed(2);
}

function atualizarHistorico() {
  const historicoElement = document.getElementById('historico');
  historicoElement.innerHTML = '';
  const itemsToShow = Math.min(5, historico.length); // Mostra apenas os 5 últimos itens
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

function depositar() {
  const valor = parseFloat(document.getElementById('valor').value);
  const motivo = document.getElementById('motivo').value;
  if (!isNaN(valor) && valor > 0 && motivo) {
    saldo += valor;
    historico.push({ tipo: 'Depósito', valor, motivo, usuario: nomeUsuario });
    atualizarSaldo();
    atualizarHistorico();
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
  } else {
    alert('Por favor, insira um valor válido e um motivo.');
  }
}

function atualizarSaldoDiretamente() {
  const novoSaldo = parseFloat(document.getElementById('novo-saldo').value);
  if (!isNaN(novoSaldo)) {
    saldo = novoSaldo;
    atualizarSaldo();
  } else {
    alert('Por favor, insira um valor válido.');
  }
}

function salvarNome() {
  nomeUsuario = document.getElementById('nome').value;
  alert(`Nome salvo: ${nomeUsuario}`);
}
