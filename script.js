document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-media');
    const nomeInput = document.getElementById('nome');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const resultado = document.getElementById('resultado');

    const erroNome = document.getElementById('erro-nome');
    const erroNota1 = document.getElementById('erro-nota1');
    const erroNota2 = document.getElementById('erro-nota2');

    const btnReset = document.getElementById('btn-reset');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        limparErros();

        const nome = nomeInput.value.trim();
        const nota1 = parseFloat(nota1Input.value);
        const nota2 = parseFloat(nota2Input.value);

        let hasError = false;

        if (!nome) {
            mostrarErro(nomeInput, erroNome, 'Por favor, insira o nome do aluno.');
            hasError = true;
        }

        if (!Number.isFinite(nota1)) {
            mostrarErro (nota1Input, erroNota1, 'Informe a nota 1 (0 a 10).');
            hasError = true;
        } else if (nota1 < 0 || nota1 > 10) {
            mostrarErro(nota1Input, erroNota1, 'A nota 1 deve estar entre 0 a 10.');
            hasError =  true;
        }

        if (!Number.isFinite(nota2)) {
            mostrarErro(nota2Input, erroNota2, 'Informe a nota 2 (0 a 10).');
            hasError =  true;
        } else if (nota2 < 0 || nota2 > 10) {
            mostrarErro(nota2Input, erroNota2, 'A nota 2 deve estar entre 0 a 10.');
            hasError = true;
        }

        if (hasError) {
            const primeiro = form.querySelector('.input-erro');
            if (primeiro) primeiro.focus();
            return;
        }

        calcularMedia(nome, nota1, nota2);
    });

    btnReset.addEventListener('click', () => {
        form.reset();
        limparErros();
        resultado.className = '';
        resultado.textContent = '';
    });

    function mostrarErro(input, span, mensagem) {
        span.textContent = mensagem;
        input.classList.add('input-erro');
        input.setAttribute('aria-invalid', 'true');
    }

    function limparErros() {
        [erroNome, erroNota1, erroNota2].forEach((s) => (s.textContent = ''));
        [nomeInput, nota1Input, nota2Input].forEach((i) => {
            i.classList.remove('input-erro');
            i.removeAttribute('aria-invalid');
        });
    }

    function calcularMedia(nome, nota1, nota2) {
        const media = (nota1 + nota2) / 2;

        resultado.className = 'loading mostrar';
        resultado.textContent = 'Calculando...';

        setTimeout(() => {
            resultado.classList.remove('loading');
            resultado.classList.add('mostrar');

            if (media >= 7) {
                resultado.innerHTML = `<strong>✅ ${escapeHtml(nome)}</strong>, sua média é <strong>${media.toFixed(1)}</strong> — <span class="aprovado">Aprovado</span>!`;
                resultado.classList.remove('reprovado');
                resultado.classList.add('aprovado');
            } else {
                resultado.innerHTML = `<strong>❌ ${escapeHtml(nome)}</strong>, sua média é <strong>${media.toFixed(1)}</strong> — <span class="reprovado">Reprovado</span>!`;
                resultado.classList.remove('aprovado');
                resultado.classList.add('reprovado');
            }

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
});