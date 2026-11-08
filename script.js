const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

const amountInput = document.getElementById('loanAmount');
const rateInput = document.getElementById('interestRate');
const yearsInput = document.getElementById('loanYears');

const formatINR = value => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(Math.round(value));

function updateEMI() {
  const principal = Number(amountInput.value);
  const annualRate = Number(rateInput.value);
  const years = Number(yearsInput.value);
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const emi = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

  const total = emi * months;
  const interest = total - principal;

  document.getElementById('amountLabel').textContent = formatINR(principal);
  document.getElementById('rateLabel').textContent = annualRate;
  document.getElementById('yearsLabel').textContent = years;
  document.getElementById('emiValue').textContent = formatINR(emi);
  document.getElementById('principalValue').textContent = formatINR(principal);
  document.getElementById('interestValue').textContent = formatINR(interest);
  document.getElementById('totalValue').textContent = formatINR(total);
}

[amountInput, rateInput, yearsInput].forEach(input => {
  input.addEventListener('input', updateEMI);
});
updateEMI();

document.querySelectorAll('[data-loan]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('loanType').value = link.dataset.loan;
  });
});

// Demo form: validates input locally but does not send or store personal data.
document.getElementById('enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  document.getElementById('formMessage').textContent =
    'Demo form validated. No information was sent or saved. Connect a secure backend to receive enquiries.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
