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

        // Pega o primeiro campo inválido
        const campoInvalido = form.querySelector(':invalid');
        if (campoInvalido) {
            campoInvalido.focus();
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
    
    // Suporte ao envio com Enter em qualquer campo
    form.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            form.requestSubmit();
        }
    });

    btnReset.addEventListener('click', () => {
        form.reset();
        resultado.className = '';
        resultado.textContent = '';
        [erroNome, erroNota1, erroNota2].forEach(span => span.textContent = "");
    });

    btnLimparHistorico.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
            localStorage.removeItem('historicoMedias');
            listaHistorico.innerHTML = "";
        }
    });

    carregarHistorico();

    // ==== MENSAGENS PERSONALIZADAS (setCustomValidity) ====
    function mostrarErro(input, spanErro) {
        let mensagem = "";
        if (input.validity.valueMissing) {
            mensagem = "Este campo é obrigatório.";
        } else if (input.validity.rangeOverflow) {
            mensagem = "O valor máximo permitido é 10.";
        } else if (input.validity.rangeUnderflow) {
            mensagem = "O valor mínimo permitido é 0.";
        } else if (input.validity.stepMismatch) {
            mensagem = "Use casas decimais válidas (ex: 7.5).";
        }
        spanErro.textContent = mensagem;
        input.classList.toggle('input-erro', mensagem !== "");
    }

    [nomeInput, nota1Input, nota2Input].forEach(input => {
        const spanErro = document.getElementById(`erro-${input.id}`);
        input.addEventListener('invalid', () => mostrarErro(input, spanErro));
        input.addEventListener('input', () => {
            spanErro.textContent = "";
            input.classList.remove('input-erro');
        });
    });

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