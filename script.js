const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();


document.querySelectorAll('.before-after').forEach(compare => {
  const range = compare.querySelector('.before-after__range');
  if (!range) return;

  const updateSplit = () => {
    compare.style.setProperty('--split', `${range.value}%`);
  };

  range.addEventListener('input', updateSplit);
  range.addEventListener('change', updateSplit);
  updateSplit();
});


const serviceRequestForm = document.querySelector('.service-request-form');

serviceRequestForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = serviceRequestForm.querySelector('.form-submit');
  const originalButtonText = submitButton?.textContent ?? 'Request a Service';

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }

  try {
    const formData = new FormData(serviceRequestForm);

    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    serviceRequestForm.innerHTML = `
      <div class="form-success" role="status" aria-live="polite">
        <p class="eyebrow">Request received</p>
        <h3>Thanks for reaching out.</h3>
        <p>Your project details were sent to TEC Craft Construction. Tim will review your request and follow up using the contact information you provided.</p>
        <a class="button button-light" href="tel:+18455323608">Call (845) 532-3608</a>
      </div>
    `;
  } catch (error) {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }

    let errorMessage = serviceRequestForm.querySelector('.form-error');

    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.className = 'form-error';
      errorMessage.setAttribute('role', 'alert');
      serviceRequestForm.appendChild(errorMessage);
    }

    errorMessage.textContent = 'Something went wrong while sending your request. Please try again or call (845) 532-3608.';
  }
});
