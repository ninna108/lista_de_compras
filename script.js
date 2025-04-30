document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('item-form');
  const listaItens = document.getElementById('lista-itens');
  const valorTotalEl = document.getElementById('valor-total');
  const atualizarBtn = document.getElementById('atualizar-api');
  const redefinirBtn = document.getElementById('redefinir-lista');

  const produtosPadrao = [
    { nome: 'Arroz', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Feijão', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Café', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Pão', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Carne bovina', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Óleo', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Leite', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Arroz', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Feijão', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Café', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Pão', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Carne bovina', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Óleo', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Leite', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Açúcar', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Sal', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Macarrão', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Molho de tomate', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Farinha de trigo', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Manteiga', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Queijo', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Presunto', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Sabão em pó', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Detergente', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Shampoo', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Sabonete', quantidade: '', preco: '', total: '0.00' },
    { nome: 'Papel higiênico', quantidade: '', preco: '', total: '0.00' }


  ];

  let listaDeCompras = JSON.parse(localStorage.getItem('listaDeCompras')) || [...produtosPadrao];

  function salvarLista() {
    localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
  }

  function atualizarLista() {
    listaItens.innerHTML = '';
    let valorTotal = 0;

    listaDeCompras.forEach((item, index) => {
      const tr = document.createElement('tr');

      const totalItem = item.quantidade && item.preco
        ? `R$ ${item.total}`
        : '-';

      tr.innerHTML = `
        <td>${item.nome}</td>
        <td><input type="number" min="1" id="qtd-${index}" value="${item.quantidade}" placeholder="Qtd"></td>
        <td><input type="number" step="0.01" min="0" id="preco-${index}" value="${item.preco}" placeholder="Preço"></td>
        <td id="total-${index}">${totalItem}</td>
        <td>
          <button class="btn-excluir" onclick="excluirItem(${index})" title="Excluir item">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;

      listaItens.appendChild(tr);

      const qtdInput = document.getElementById(`qtd-${index}`);
      const precoInput = document.getElementById(`preco-${index}`);

      qtdInput.addEventListener('input', () => atualizarItem(index));
      precoInput.addEventListener('input', () => atualizarItem(index));

      if (item.quantidade && item.preco) {
        valorTotal += parseFloat(item.total);
      }
    });

    valorTotalEl.textContent = valorTotal.toFixed(2);
  }

  function atualizarItem(index) {
    const qtdInput = document.getElementById(`qtd-${index}`);
    const precoInput = document.getElementById(`preco-${index}`);
    const totalTd = document.getElementById(`total-${index}`);

    const quantidade = parseInt(qtdInput.value);
    const preco = parseFloat(precoInput.value);

    if (!isNaN(quantidade) && !isNaN(preco) && quantidade > 0 && preco >= 0) {
      const total = (quantidade * preco).toFixed(2);
      listaDeCompras[index].quantidade = quantidade;
      listaDeCompras[index].preco = preco.toFixed(2);
      listaDeCompras[index].total = total;
      totalTd.textContent = `R$ ${total}`;
    } else {
      listaDeCompras[index].quantidade = '';
      listaDeCompras[index].preco = '';
      listaDeCompras[index].total = '0.00';
      totalTd.textContent = '-';
    }

    salvarLista();
    atualizarTotalGeral();
  }

  function atualizarTotalGeral() {
    let valorTotal = 0;
    listaDeCompras.forEach(item => {
      if (item.quantidade && item.preco) {
        valorTotal += parseFloat(item.total);
      }
    });
    valorTotalEl.textContent = valorTotal.toFixed(2);
  }

  window.excluirItem = function (index) {
    listaDeCompras.splice(index, 1);
    salvarLista();
    atualizarLista();
  };

  atualizarBtn.addEventListener('click', () => {
    alert('Dados atualizados no sistema (simulado).');
    console.log('Lista de compras enviada:', listaDeCompras);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (nome && quantidade > 0 && preco >= 0) {
      const total = (quantidade * preco).toFixed(2);
      listaDeCompras.push({
        nome,
        quantidade,
        preco: preco.toFixed(2),
        total
      });
      salvarLista();
      form.reset();
      atualizarLista();
    }
  });

  redefinirBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja redefinir a lista de compras?')) {
      listaDeCompras = [...produtosPadrao];
      salvarLista();
      atualizarLista();
    }
  });

  atualizarLista();
});
