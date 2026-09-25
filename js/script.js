// ===========================================================
// Instituto Vagalume — script.js
// Menu mobile + máscaras de input + validação do formulário
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initInputMasks();
  initFormValidation();
  renderProjetos();
});

/**
 * ===========================================================
 * Dados dos projetos (fonte única de verdade)
 * ===========================================================
 * Em vez de escrever os 4 cards direto no HTML de projetos.html,
 * guardamos os dados aqui como um array de objetos. Isso facilita
 * adicionar, remover ou editar um projeto no futuro sem mexer em
 * marcação HTML — só se edita este array.
 */
const projetos = [
  {
    numero: '01',
    titulo: 'Bibliotecas de Bairro',
    descricao: 'Montamos e mantemos acervos comunitários em espaços já existentes no território — salões paroquiais, centros culturais e sedes de associação de moradores — para que o livro fique a uma quadra de distância, não a uma condução de ônibus.',
    tags: ['14 bibliotecas ativas', 'Acervo rotativo', 'Aberto à comunidade']
  },
  {
    numero: '02',
    titulo: 'Roda de Histórias',
    descricao: 'Sessões semanais de contação de histórias em escolas públicas e praças, conduzidas por voluntários formados pelo Instituto. A oralidade é a porta de entrada para crianças que ainda não leem sozinhas.',
    tags: ['60 rodas por mês', 'Educação infantil e fundamental I', 'Voluntariado presencial']
  },
  {
    numero: '03',
    titulo: 'Formação de Mediadores',
    descricao: 'Curso gratuito de 20 horas para moradores do território que querem se tornar mediadores de leitura remunerados dentro da própria comunidade — gerando renda e fortalecendo vínculos locais com a leitura.',
    tags: ['180 formados desde 2016', 'Bolsa-formação', 'Certificado próprio']
  },
  {
    numero: '04',
    titulo: 'Campanha Livro Que Viaja',
    descricao: 'Pontos de coleta de livros infantis e juvenis usados, em bom estado, doados por famílias, escolas e editoras parceiras — depois higienizados, catalogados e distribuídos entre as bibliotecas de bairro.',
    tags: ['Coleta contínua', 'Parceria com editoras', '8 pontos de coleta']
  }
];

/**
 * Transforma o array "projetos" em HTML e injeta no container.
 * Fluxo: array de objetos -> .map() gera um pedaço de HTML por
 * projeto (usando template literals) -> .join('') junta tudo em
 * uma única string -> essa string vira o innerHTML do container.
 *
 * Só roda se a página atual tiver o elemento #projetosContainer
 * (ou seja, só em projetos.html — nas outras páginas essa função
 * simplesmente não faz nada).
 */
function renderProjetos() {
  const container = document.getElementById('projetosContainer');
  if (!container) return;

  const html = projetos.map((projeto) => `
    <article class="chapter" data-projeto="${projeto.numero}">
      <span class="chapter-num" aria-hidden="true">${projeto.numero}</span>
      <div>
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <ul class="tag-list">
          ${projeto.tags.map((tag) => `<li>${tag}</li>`).join('')}
        </ul>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;

  // Event Delegation: em vez de um listener por card (que nem
  // existiam no momento em que a página carregou, já que foram
  // criados agora pelo JS), colocamos UM único listener no
  // container pai. Ele "escuta" cliques em qualquer <article>
  // filho, atual ou futuro, sem precisar recriar listeners toda
  // vez que a lista mudar.
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.chapter');
    if (!card) return;
    const numero = card.dataset.projeto;
    const projeto = projetos.find((p) => p.numero === numero);
    console.log('Card clicado:', projeto.titulo);
  });
}

/**
 * Alterna o menu de navegação em telas pequenas,
 * mantendo aria-expanded sincronizado para acessibilidade.
 */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/**
 * Aplica máscaras de digitação nos campos de telefone, CPF e CEP,
 * usando apenas o atributo "pattern" do HTML5 para a validação final
 * e o evento "input" do JavaScript para formatar em tempo real.
 */
function initInputMasks() {
  const telefone = document.getElementById('telefone');
  const cpf = document.getElementById('cpf');
  const cep = document.getElementById('cep');

  if (telefone) {
    telefone.addEventListener('input', (e) => {
      e.target.value = maskTelefone(e.target.value);
    });
  }

  if (cpf) {
    cpf.addEventListener('input', (e) => {
      e.target.value = maskCPF(e.target.value);
    });
  }

  if (cep) {
    cep.addEventListener('input', (e) => {
      e.target.value = maskCEP(e.target.value);
    });
  }
}

/** Formata para (00) 00000-0000 */
function maskTelefone(value) {
  return value
    .replace(/\D/g, '')            // remove tudo que não é dígito
    .slice(0, 11)                  // limita a 11 dígitos (DDD + 9 dígitos)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

/** Formata para 000.000.000-00 */
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/** Formata para 00000-000 */
function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}

/**
 * Valida o formulário de cadastro usando a Constraint Validation API
 * nativa do HTML5 (checkValidity / reportValidity), exibindo uma
 * mensagem de status acessível (role="alert") ao final do envio.
 */
function initFormValidation() {
  const form = document.getElementById('cadastroForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      showStatus(status, 'error', 'Confira os campos destacados antes de enviar. Alguns dados obrigatórios ainda não foram preenchidos corretamente.');
      return;
    }

    // Simulação de envio bem-sucedido (não há backend neste projeto acadêmico)
    showStatus(status, 'success', 'Cadastro enviado com sucesso! Em breve entraremos em contato pelo e-mail ou telefone informado.');
    form.reset();
  });
}

function showStatus(el, type, message) {
  el.textContent = message;
  el.classList.remove('success', 'error');
  el.classList.add(type, 'is-visible');
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
