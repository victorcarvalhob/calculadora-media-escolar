function calcularMedia() {
    let nome = document.getElementById("nome").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);

    let media = (nota1 + nota2) / 2;
    let resultado = document.getElementById("resultado");

    if (media >= 7) {
        resultado.innerHTML = `${nome}, sua média é <strong>${media.toFixed(1)}</strong> — Aprovado!`;
        resultado.className = "aprovado mostrar";
    } else {
        resultado.innerHTML = `${nome}, sua média é <strong>${media.toFixed(1)}</strong> — Reprovado!`;
        resultado.className = "reprovado mostrar";
    }
}