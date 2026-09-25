// ===========================================================
// Instituto Vagalume — script.js
// Menu mobile + máscaras de input + validação do formulário
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initInputMasks();
  initFormValidation();
});

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
