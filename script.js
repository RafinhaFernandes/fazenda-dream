let saldo = 0;
let historico = [];
let isAdmin = false;

function autenticar() {
  const senha = document.getElementById('senha').value;
  if (senha === 'dream') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else if (senha === 'dreampatroa') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('edit-saldo').style.display = 'block';
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
  historico.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.tipo} de R$ ${item.valor.toFixed(2)} - Motivo: ${item.motivo}`;
    historicoElement.appendChild(li);
  });
}

function depositar() {
  const valor = parseFloat(document.getElementById('valor').value);
  const motivo = document.getElementById('motivo').value;
  if (!isNaN(valor) && valor > 0 && motivo) {
    saldo += valor;
    historico.push({ tipo: 'Depósito', valor, motivo });
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
    historico.push({ tipo: 'Retirada', valor, motivo });
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
