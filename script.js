document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const hamburger = id => document.getElementById(id);
    const navLinks = hamburger('navLinks');
    
    hamburger('hamburgerBtn').addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });

    // Handle Diagnostic Form Submission
    const form = hamburger('diagnosticForm');
    const modal = hamburger('successModal');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        form.reset();
    });

    hamburger('closeModalBtn').addEventListener('click', () => {
        modal.classList.remove('active');
    });
});