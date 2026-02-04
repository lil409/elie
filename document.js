document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.getElementById('loginBtn');
    const successMessage = document.getElementById('successMessage');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Password validation
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Show error
    function showError(element, message) {
        element.textContent = message;
        element.style.opacity = '1';
    }

    // Hide error
    function hideError(element) {
        element.textContent = '';
        element.style.opacity = '0';
    }

    // Real-time validation
    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (!validatePassword(this.value)) {
            showError(passwordError, 'Password must be at least 6 characters');
        } else {
            hideError(passwordError);
        }
    });

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;
        
        // Reset errors
        hideError(emailError);
        hideError(passwordError);
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate login process
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, you would send data to your server here
            console.log('Login attempt with:', { email, password, remember });
            
            // Simulate successful login
            loginForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // In a real app, you would redirect to dashboard
            // window.location.href = '/dashboard';
            
            // Reset form after 3 seconds (for demo)
            setTimeout(() => {
                successMessage.style.display = 'none';
                loginForm.style.display = 'block';
                loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
                loginBtn.disabled = false;
                
                // Clear form (optional)
                if (!remember) {
                    loginForm.reset();
                }
            }, 3000);
        }, 1500);
    });

    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        alert('Google login would be implemented here');
        // In a real app, redirect to Google OAuth
    });

    document.querySelector('.social-btn.github').addEventListener('click', function() {
        alert('GitHub login would be implemented here');
        // In a real app, redirect to GitHub OAuth
    });

    // Forgot password
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email to reset password:');
        if (email && validateEmail(email)) {
            alert(`Password reset link sent to ${email}`);
        } else {
            alert('Please enter a valid email address');
        }
    });

    // Register link
    document.querySelector('.register-link a').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Registration page would open here');
        // In a real app: window.location.href = '/register';
    });
});