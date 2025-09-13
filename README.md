# 🎓 Calculadora de Média Escolar

[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?logo=github)](https://github.com/victorcarvalhob/calculadora-media-escolar) [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-brightgreen)](https://victorcarvalhob.github.io/calculadora-media-escolar/)

> Uma **calculadora de média escolar** simples construída com HTML, CSS e JavaScript como projeto de estudo — foco em manipulação do DOM, validação, acessibilidade e design responsivo. A simplicidade é proposital; novas funcionalidades serão adicionadas conforme eu evoluir nos estudos. 🚀

---

## ✨ Visual rápido

<p align="center">
  <a href="https://victorcarvalhob.github.io/calculadora-media-escolar/">
    <img alt="preview" src="./images/media-escolar-preview.png" width="720" style="max-width:100%;border-radius:8px;" />
  </a>
</p>

> Caso a imagem acima não carregue, acesse a demo online: **[https://victorcarvalhob.github.io/calculadora-media-escolar/](https://victorcarvalhob.github.io/calculadora-media-escolar/)**

---

## 🧭 Links importantes

* Repositório: **[https://github.com/victorcarvalhob/calculadora-media-escolar](https://github.com/victorcarvalhob/calculadora-media-escolar)**
* Demo (GitHub Pages): **[https://victorcarvalhob.github.io/calculadora-media-escolar/](https://victorcarvalhob.github.io/calculadora-media-escolar/)**

---

## 🛠️ Tecnologias

* HTML5
* CSS3 (responsividade, transições e micro-interações)
* JavaScript (ES6+) — manipulação do DOM, validação e acessibilidade

---

## 🧾 Atualizações recentes

**Refatoração (feat)**

* Remoção de `onclick` inline — uso de `form` + `addEventListener` para melhor semântica e usabilidade.
* Validação robusta por campo (nome obrigatório, notas numéricas entre 0 e 10).
* Mensagens de erro por campo e destaque visual de inputs inválidos (`.input-erro`).
* Acessibilidade: `aria-live` e `aria-invalid` adicionados; `role="status"` no resultado para leitores de tela.
* Pequena melhoria de UX: estado de processamento "Calculando..." e botão de limpar (`Limpar`).
* Proteção básica contra injeção de HTML no nome do aluno (escape).

Essas mudanças deixam o projeto mais legível, testável e acessível — pontos positivos para o portfólio.

---

## 🚀 O que este projeto faz hoje

* Recebe **nome** do aluno e **duas notas**.
* Calcula a média simples `(nota1 + nota2) / 2`.
* Exibe a média arredondada para 1 casa decimal e a **situação**:

  * **Aprovado**: média ≥ 7
  * **Reprovado**: média < 7
* Feedback visual com classes CSS (`.aprovado`, `.reprovado`) e transições.
* Validação por campo e indicações visuais de erro.
* Layout responsivo para dispositivos móveis.
* Acessibilidade básica para leitores de tela.

---

## 📦 Estrutura do projeto

```
calculadora-media-escolar/
├── index.html      # marcação semântica (form)
├── style.css       # estilos, responsividade e micro-interações
├── script.js       # validação, lógica de cálculo e acessibilidade
└── images/         # screenshots e assets
```

---

## ✅ Roadmap / Melhorias planejadas

Projeto em andamento — itens que planejo implementar nas próximas versões:

* [ ] Adicionar **mais notas** (suporte a N notas)
* [ ] Transformar `nota1` e `nota2` em um **array dinâmico de notas** e calcular automaticamente
* [ ] **Média ponderada** (opção de escolher pesos por nota)
* [ ] **Salvar histórico** de cálculos (localStorage) e mostrar lista de registros
* [ ] Testes unitários simples (funções de cálculo/validação)
* [ ] Melhorar a UI/UX: ícones SVG, micro-animações e estados (success/error)
* [ ] Dark mode com toggle
* [ ] Aprimorar a acessibilidade (mais testes com leitores de tela)

> As próximas fases poderão incluir integração com um backend leve para persistência e endpoints para compartilhar resultados em formato JSON.

---

## 📬 Contato

**Victor Carvalho** —

* GitHub: [https://github.com/victorcarvalhob](https://github.com/victorcarvalhob)
* Demo: [https://victorcarvalhob.github.io/calculadora-media-escolar/](https://victorcarvalhob.github.io/calculadora-media-escolar/)

---

> *Este projeto foi criado com o objetivo de estudo e evolução contínua. Simplicidade proposital — melhorias a caminho!* 🎯
