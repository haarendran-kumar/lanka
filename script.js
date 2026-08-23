document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });

        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
            });
        });
    }

    // Diagnostic Booking Form Handler (Web3Forms Integration)
    const diagnosticForm = document.getElementById('diagnosticForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (diagnosticForm) {
        diagnosticForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Check if Access Key is empty or still default placeholder string
            const accessKeyInput = diagnosticForm.querySelector('input[name="access_key"]');
            if (!accessKeyInput || !accessKeyInput.value || accessKeyInput.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
                alert('Web3Forms Access Key missing: Please paste your Web3Forms Access Key into index.html.');
                return;
            }

            const originalBtnText = submitBtn ? submitBtn.innerText : 'Request Performance Diagnostic';

            // Indicate loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending Request...';
            }

            // Convert form data to JSON for API submission
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
                    // Show confirmation modal on successful submission
                    if (successModal) {
                        successModal.classList.add('active');
                    }
                    diagnosticForm.reset();
                } else {
                    alert('Form Submission Failed: ' + (result.message || 'Please check your inputs and try again.'));
                }
            } catch (error) {
                alert('Network Error: Unable to send request. Please check your internet connection or try again.');
            } finally {
                // Restore button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            }
        });
    }

    // Close Modal Controls
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Close modal when clicking dark backdrop area
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});

