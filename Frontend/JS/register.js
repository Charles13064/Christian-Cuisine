function initRegister() {
  const chips = Array.from(document.querySelectorAll('.chip-toggle'));
  const reviewBtn = document.getElementById('reviewBtn');
  const reviewSummary = document.getElementById('reviewSummary');
  const agreeCheck = document.getElementById('agreeCheck');
  const finalSubmit = document.getElementById('finalSubmit');
  const form = document.getElementById('registerForm');
  const backStep = document.getElementById('backStep');
  const nextStep = document.getElementById('nextStep');
  const stepError = document.getElementById('stepError');
  const sections = Array.from(document.querySelectorAll('.form-section'));
  let currentStep = 0;

  // Toggle chips (interests)
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!pressed));
    });
  });

  // Build summary and show it (helper)
    function buildSummary() {
      const values = {
        fullName: document.getElementById('fullName').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        phone: document.getElementById('regPhone').value.trim(),
        country: document.getElementById('regCountry').value,
        gender: document.getElementById('regGender').value,
        dob: document.getElementById('regDob').value,
        bible: document.getElementById('regBibleVersion').value,
        church: document.getElementById('regChurch').value.trim(),
        salvation: document.getElementById('regSalvation').value,
        baptized: document.getElementById('regBaptized').value,
        interests: chips.filter(c => c.getAttribute('aria-pressed') === 'true').map(c => c.textContent.trim())
      };

      // Basic validation: required fields
      const missing = [];
      if (!values.fullName) missing.push('Full Name');
      if (!values.username) missing.push('Username');
      if (!values.email) missing.push('Email');
      const pwd = document.getElementById('regPassword').value;
      const pwdConfirm = document.getElementById('regConfirm').value;
      if (!pwd) missing.push('Password');
      if (pwd !== pwdConfirm) missing.push('Passwords must match');

      if (missing.length) {
        reviewSummary.innerHTML = '<p style="color:var(--color-accent);">Please fix: ' + missing.join(', ') + '</p>';
        agreeCheck.checked = false;
        finalSubmit.disabled = true;
        agreeCheck.focus();
        return false;
      }

      // Populate summary
      reviewSummary.innerHTML = `
        <p><strong>Name:</strong> ${escapeHtml(values.fullName)} (${escapeHtml(values.username)})</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)} ${values.phone ? '· ' + escapeHtml(values.phone) : ''}</p>
        <p><strong>Location:</strong> ${escapeHtml(values.country)} · ${escapeHtml(values.gender)}${values.dob ? ' · DOB: ' + escapeHtml(values.dob) : ''}</p>
        <p><strong>Bible Version:</strong> ${escapeHtml(values.bible)}${values.church ? ' · Church: ' + escapeHtml(values.church) : ''}</p>
        <p><strong>Walk:</strong> ${escapeHtml(values.salvation)} · Baptized: ${escapeHtml(values.baptized)}</p>
        <p><strong>Interests:</strong> ${values.interests.length ? escapeHtml(values.interests.join(', ')) : '—'}</p>
      `;

      return true;
    }

    reviewBtn && reviewBtn.addEventListener('click', () => { buildSummary(); reviewSummary.scrollIntoView({ behavior: 'smooth', block: 'center' }); });

    function updateStepper(index) {
      const stepNodes = Array.from(document.querySelectorAll('.signup-steps .step'));
      stepNodes.forEach((n, i) => {
        n.classList.toggle('active', i === index);
        n.classList.toggle('completed', i < index);
      });
      // progress fill: calculate percentage across all sections (including review)
      const progressFill = document.getElementById('progressFill');
      if (progressFill) {
        const pct = Math.round((index / (sections.length - 1)) * 100);
        progressFill.style.width = pct + '%';
      }
      const stepsLeft = document.getElementById('stepsLeft');
      if (stepsLeft) stepsLeft.textContent = `${Math.max(0, sections.length - index - 1)} steps left`;
    }

    function showStep(index) {
      sections.forEach((s, i) => s.classList.toggle('active', i === index));
      // nav button state
      if (backStep) backStep.disabled = index === 0;
      // when on review step (last), hide nav
      const nav = document.querySelector('.form-nav');
      if (nav) nav.style.display = (index === sections.length - 1) ? 'none' : 'flex';
      // if entering review step, build summary
      if (index === sections.length - 1) { buildSummary(); }
      updateStepper(index);
      // clear any previous step error
      if (stepError) stepError.textContent = '';
    }

    // wire navigation
    backStep.addEventListener('click', () => {
      if (currentStep > 0) { currentStep -= 1; showStep(currentStep); }
    });
    nextStep.addEventListener('click', () => {
      // basic per-step validation: ensure required fields in current section
      const requiredInputs = Array.from(sections[currentStep].querySelectorAll('input[required], select[required]'));
      const bad = requiredInputs.filter(i => !i.value || i.value.trim() === '');
      if (bad.length) {
        // highlight and show message
        bad.forEach(b => b.classList.add('input-error'));
        const names = bad.map(b => {
          const lab = document.querySelector(`label[for="${b.id}"]`);
          return lab ? lab.textContent.replace(/\n/g, ' ').trim() : (b.id || 'Field');
        });
        if (stepError) stepError.textContent = 'Please complete: ' + names.join(', ');
        bad[0].focus();
        return;
      }
      // remove any input-error on success
      sections[currentStep].querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
      if (currentStep < sections.length - 1) { currentStep += 1; showStep(currentStep); }
    });

    // initialize
    showStep(currentStep);

    // Password visibility toggles
    const pwdToggles = Array.from(document.querySelectorAll('.password-toggle'));
    pwdToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.setAttribute('aria-pressed', String(isPwd));
        btn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
      });
    });

  // enable submit when agreed
  agreeCheck && agreeCheck.addEventListener('change', () => {
    finalSubmit.disabled = !agreeCheck.checked;
  });

  // Modal open/close behavior
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTriggers = Array.from(document.querySelectorAll('.modal-trigger'));
  const modalCloses = Array.from(document.querySelectorAll('.modal-close'));
  const modals = Array.from(document.querySelectorAll('.modal'));

  function closeModal() {
    modals.forEach(modal => {
      modal.hidden = true;
      modal.classList.remove('show');
    });
    if (modalBackdrop) modalBackdrop.classList.remove('show');
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add('show');
    if (modalBackdrop) modalBackdrop.classList.add('show');
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.dataset.modal;
      openModal(target);
    });
  });

  modalCloses.forEach(button => button.addEventListener('click', closeModal));
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  // Handle final submit: simple client-side validation demo
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!agreeCheck.checked) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    // Here you would normally POST to the server. For now show a confirmation.
    finalSubmit.disabled = true;
    finalSubmit.textContent = 'Creating...';
    setTimeout(() => {
      alert('Account created (demo).');
      finalSubmit.textContent = 'Create My Account';
      finalSubmit.disabled = false;
      form.reset();
      document.querySelectorAll('.chip-toggle[aria-pressed="true"]').forEach(c => c.setAttribute('aria-pressed','false'));
      reviewSummary.innerHTML = '';
      agreeCheck.checked = false;
    }, 800);
  });

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]; });
  }

}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRegister); else initRegister();
