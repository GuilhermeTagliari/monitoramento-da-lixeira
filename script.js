function carregarCSV() {
    fetch('medicoes_lixeira.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n').slice(1); 
            const tabela = document.getElementById('tabela-dados').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ''; 

            linhas.forEach(linha => {
                const colunas = linha.split(',');
                if (colunas.length > 1) { 
                    const novaLinha = tabela.insertRow();

                    const percentualPreenchido = parseFloat(colunas[3].trim());
                    colunas.forEach((coluna, index) => {
                        const novaColuna = novaLinha.insertCell();
                        novaColuna.textContent = coluna.trim();

                        if (index === 3 && percentualPreenchido >= 90) {
                            novaColuna.classList.add('alert');
                        }
                    });
                }
            });
        })
        .catch(error => console.error('Erro ao carregar CSV:', error));
}

setInterval(carregarCSV, 5000);

window.onload = carregarCSV;
