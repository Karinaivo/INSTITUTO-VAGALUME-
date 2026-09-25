# Instituto Vagalume — Site institucional (projeto acadêmico)

Site de três páginas para uma ONG fictícia de incentivo à leitura, desenvolvido
como exercício da disciplina **Desenvolvimento Front-end para Web**, unidade
"Fundamentos da Web e Estruturação de Interfaces".

## Estrutura do projeto
ong/
├── index.html → página inicial (hero, missão, impacto, CTA)
├── projetos.html → os 4 projetos da ONG, em elementos <article>
├── cadastro.html → formulário de cadastro de voluntários/doadores
├── css/
│ └── styles.css → estilos, tokens de design e responsividade
├── js/
│ └── script.js → menu mobile, máscaras de input e validação
└── docs/
└── README.md


## Conceitos do material aplicados

- **HTML5 semântico**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>`, `<fieldset>`/`<legend>`, em vez de `<div>` genérico para tudo.
- **Formulário com validação nativa**: uso de `required`, `type="email"`,
  `type="tel"`, `type="date"`, `pattern` com expressões regulares e
  `Constraint Validation API` (`checkValidity`/`reportValidity`) em
  `cadastro.html`.
- **Máscaras de input via JavaScript**: os campos de **CPF**
  (`000.000.000-00`), **telefone** (`(00) 00000-0000`) e **CEP**
  (`00000-000`) são formatados em tempo real no evento `input`, seguindo os
  mesmos padrões de `pattern` mostrados no material de apoio.
- **Estrutura de projeto organizada**: pastas `css/`, `js/` e `docs/`
  seguindo a convenção apresentada na unidade.
- **Acessibilidade**: `aria-expanded`/`aria-controls` no menu mobile,
  `role="radiogroup"`, `role="alert"` na mensagem de status do formulário, e
  foco visível (`:focus-visible`) em todos os elementos interativos
