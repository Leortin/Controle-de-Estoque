// Array para armazenar os produtos
let produtos = [];

// Função para adicionar um novo produto
function adicionarProduto(event) {
    event.preventDefault();
    
    const nome = document.getElementById('produto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    // Verifica se o produto já está na lista
    const produtoExistente = produtos.find(p => p.nome === nome);

    if (produtoExistente) {
        // Se o produto já existe, atualiza a quantidade
        produtoExistente.quantidade += quantidade;
    } else {
        // Se não existe, adiciona como novo produto
        produtos.push({ nome, quantidade });
    }

    // Limpa os campos do formulário
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';

    // Atualiza a tabela
    atualizarTabela();
}

// Função para remover uma quantidade específica de um produto da lista
function removerQuantidade(index) {
    const quantidadeARemover = parseInt(prompt(`Quantidade a remover para ${produtos[index].nome}:`));

    if (quantidadeARemover && quantidadeARemover > 0) {
        if (quantidadeARemover >= produtos[index].quantidade) {
            // Remove o produto inteiramente se a quantidade a remover for maior ou igual à quantidade atual
            produtos.splice(index, 1);
        } else {
            // Caso contrário, diminui apenas a quantidade especificada
            produtos[index].quantidade -= quantidadeARemover;
        }

        // Atualiza a tabela
        atualizarTabela();
    } else {
        alert('Por favor, insira uma quantidade válida.');
    }
}

// Função para atualizar a tabela de produtos
function atualizarTabela() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';

    produtos.forEach((produto, index) => {
        const row = `<tr>
                        <td>${produto.nome}</td>
                        <td>${produto.quantidade}</td>
                        <td class="button-container">
                            <button onclick="removerQuantidade(${index})">Remover Quantidade</button>
                        </td>
                    </tr>`;
        corpoTabela.innerHTML += row;
    });
}

// Event listener para o formulário de adicionar produto
const form = document.getElementById('formProduto');
form.addEventListener('submit', adicionarProduto);
