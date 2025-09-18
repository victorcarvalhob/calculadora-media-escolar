document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-media');
    const nomeInput = document.getElementById('nome');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const resultado = document.getElementById('resultado');
    const listaHistorico = document.getElementById('lista-historico');

    const erroNome = document.getElementById('erro-nome');
    const erroNota1 = document.getElementById('erro-nota1');
    const erroNota2 = document.getElementById('erro-nota2');

    const btnReset = document.getElementById('btn-reset');
    const btnLimparHistorico = document.getElementById('btn-limpar-historico');

    // ==== EVENTOS PRINCIPAIS ====
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Se o formulário não for válido, mostra mensagens nativas
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Dados já validados pelo HTML5
        const dados = {
            nome: nomeInput.value.trim(),
            nota1: parseFloat(nota1Input.value),
            nota2: parseFloat(nota2Input.value),
        };

        calcularMedia(dados);
    });

    btnReset.addEventListener('click', () => {
        form.reset();
        resultado.className = '';
        resultado.textContent = '';
    });

    btnLimparHistorico.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
            localStorage.removeItem('historicoMedias');
            listaHistorico.innerHTML = "";
        }
    });

    carregarHistorico();

    // ==== MENSAGENS PERSONALIZADAS (setCustomValidity) ====
    [nomeInput, nota1Input, nota2Input].forEach(input => {
        input.addEventListener('invalid', () => {
            if (input.validity.valueMissing) {
                input.setCustomValidity("Este campo é obrigatório.");
            } else if (input.validity.rangeOverflow) {
                input.setCustomValidity("O valor máximo permitido é 10.");
            } else if (input.validity.rangeUnderflow) {
                input.setCustomValidity("O valor mínimo permitido é 0.");
            } else if (input.validity.stepMismatch) {
                input.setCustomValidity("Use casas decimais válidas (ex: 7.5).");
            } else {
                input.setCustomValidity("");
            }
        });

        input.addEventListener('input', () => input.setCustomValidity(""));
    })

    // ==== FUNÇÕES DE CÁLCULO E RESULTADO ====
    function calcularMedia({ nome, nota1, nota2 }) {
        const media = (nota1 + nota2) / 2;

        resultado.className = 'loading mostrar';
        resultado.textContent = 'Calculando...';

        setTimeout(() => {
            resultado.classList.remove('loading');
            resultado.classList.add('mostrar');

            const situacao = media >= 7 ? "Aprovado" : "Reprovado";
            const statusClass = situacao.toLowerCase();

            resultado.innerHTML = `<strong>${situacao === "Aprovado" ? "✅" : "❌"} ${escapeHtml(nome)}</strong>,
            sua média é <strong>${media.toFixed(1)}</strong> —
            <span class="${statusClass}">${situacao}</span>!`;

            resultado.className = `${statusClass} mostrar`;
            salvarHistorico(nome, media.toFixed(1), situacao);
            
            resultado.focus(); 
        }, 220);
    }

    function escapeHtml(str) {
        return str
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    // ==== FUNÇÕES DE HISTÓRICO ====
    function salvarHistorico(aluno, media, situacao) {
        const registro = {
            aluno,
            media,
            situacao,
            data: new Date().toLocaleString('pt-BR')
        };

        let historico = JSON.parse(localStorage.getItem('historicoMedias')) || [];
        historico.unshift(registro);
        localStorage.setItem('historicoMedias', JSON.stringify(historico));

        renderizarHistorico();
    }

    function carregarHistorico() {
        renderizarHistorico();
    }

    function renderizarHistorico() {
        listaHistorico.innerHTML = "";
        let historico = JSON.parse(localStorage.getItem('historicoMedias')) || [];

        historico.forEach(item => {
            const li = document.createElement('li');
            li.classList.add(item.situacao.toLowerCase());
            li.textContent = `${item.data} - ${item.aluno}: Média ${item.media} (${item.situacao})`;
            listaHistorico.appendChild(li);
        });
    }
});