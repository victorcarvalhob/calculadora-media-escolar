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
        limparErros();

        const dados = {
            nome: nomeInput.value.trim(),
            nota1: parseFloat(nota1Input.value),
            nota2: parseFloat(nota2Input.value),
        };

        if (validarFormulario(dados)) {
            calcularMedia(dados);
        }
    });

    btnReset.addEventListener('click', () => {
        form.reset();
        limparErros();
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

    // ==== FUNÇÕES DE VALIDAÇÃO ====
    function validarFormulario({ nome, nota1, nota2 }) {
        let valido = true;

        if (!nome) {
            mostrarErro(nomeInput, erroNome, 'Por favor, insira o nome do aluno.');
            valido = false;
        }

        if (!Number.isFinite(nota1)) {
            mostrarErro(nota1Input, erroNota1, 'Informe a nota 1 (0 a 10).');
            valido = false;
        } else if (nota1 < 0 || nota1 > 10) {
            mostrarErro(nota1Input, erroNota1, 'A nota 1 deve estar entre 0 a 10.');
            valido = false;
        }

        if (!Number.isFinite(nota2)) {
            mostrarErro(nota2Input, erroNota2, 'Informe a nota 2 (0 a 10).');
            valido = false;
        } else if (nota2 < 0 || nota2 > 10) {
            mostrarErro(nota2Input, erroNota2, 'A nota 2 deve estar entre 0 a 10.');
            valido = false;
        }

        if (!valido) {
            const primeiro = form.querySelector('.input-erro');
            if (primeiro) primeiro.focus();
        }

        return valido;
    }

    function mostrarErro(input, span, mensagem) {
        span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10A10.01142 10.01142 0 0 0 12 2Zm0 14a1.25 1.25 0 1 1 1.25-1.25A1.25142 1.25142 0 0 1 12 16Zm1-4.75a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0Z"/>
        </svg>
        <span>${mensagem}</span>`;
        span.classList.add('mostrar');
        input.classList.add('input-erro');
        input.setAttribute('aria-invalid', 'true');
    }

    function limparErros() {
        [erroNome, erroNota1, erroNota2].forEach((s) => {
            s.innerHTML = "";
            s.classList.remove('mostrar');
        });
        [nomeInput, nota1Input, nota2Input].forEach((i) => {
            i.classList.remove('input-erro');
            i.removeAttribute('aria-invalid');
        });
    }

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