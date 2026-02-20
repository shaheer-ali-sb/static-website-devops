document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TOGGLE PASSWORD VISIBILITY (FOR BOTH FORMS) ---
    const toggleBtns = document.querySelectorAll('.toggle-password-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the input field relative to the button clicked
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // --- 2. REGISTRATION PASSWORD VALIDATION ---
    const regPass = document.getElementById('regPassword');
    const reqBox = document.getElementById('passwordRequirements');

    if (regPass) {
        // Show requirements box only when user clicks into the password field
        regPass.addEventListener('focus', () => reqBox.classList.add('show-msg'));

        regPass.addEventListener('input', function() {
            const val = this.value;
            
            // Validation Logic
            const hasUpper = /[A-Z]/.test(val);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
            const isLongEnough = val.length >= 8;

            // Update UI classes
            document.getElementById('reqUpper').className = hasUpper ? 'valid' : 'invalid';
            document.getElementById('reqSpecial').className = hasSpecial ? 'valid' : 'invalid';
            document.getElementById('reqLength').className = isLongEnough ? 'valid' : 'invalid';
        });
    }

    // --- 3. SHOW SUCCESS MESSAGE AFTER REDIRECT ---
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const banner = document.getElementById('registrationSuccess');
        if (banner) {
            banner.style.display = 'block';

            // Auto-hide the banner after 5 seconds
            setTimeout(() => {
                banner.style.opacity = '0';
                banner.style.transition = 'opacity 1.5s ease';
                setTimeout(() => { 
                    banner.style.display = 'none'; 
                    // Clean URL (removes ?status=success from address bar)
                    window.history.replaceState({}, document.title, window.location.pathname);
                }, 1500);
            }, 5000);
        }
    }
});