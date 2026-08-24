document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Navigation & Dropdown Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdown = document.querySelector('.dropdown');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });

        document.querySelectorAll('#navLinks a').forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('mobile-active');
                });
            }
        });
    }

    if (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 868) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    // Booking Form Handler
    const diagnosticForm = document.getElementById('diagnosticForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (diagnosticForm) {
        diagnosticForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const accessKeyInput = diagnosticForm.querySelector('input[name="access_key"]');
            if (!accessKeyInput || !accessKeyInput.value || accessKeyInput.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
                alert('Web3Forms Access Key missing: Please paste your Web3Forms Access Key into index.html.');
                return;
            }

            const originalBtnText = submitBtn ? submitBtn.innerText : 'Request Performance Diagnostic';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending Request...';
            }

            const formData = new FormData(diagnosticForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (result.success) {
                    if (successModal) successModal.classList.add('active');
                    diagnosticForm.reset();
                } else {
                    alert('Form Submission Failed: ' + (result.message || 'Please try again.'));
                }
            } catch (error) {
                alert('Network Error: Unable to send request. Please check your internet connection.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            }
        });
    }

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => successModal.classList.remove('active'));
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) successModal.classList.remove('active');
        });
    }
});
