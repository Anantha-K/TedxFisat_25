async function submitRegistration(event) {
    event.preventDefault();

    // Get and update button state
    const registerButton = document.getElementById('register');
    registerButton.textContent = "Loading...";
    registerButton.disabled = true;

    // Create FormData object to send both file and text data
    const formData = new FormData();

    // Add all text fields
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('isFisatian', document.getElementById('isFisatian').value);

    // Add role if not a FISAT student
    if (document.getElementById('isFisatian').value === 'no') {
        formData.append('role', document.getElementById('role').value);
    }

    // Add academic info if is a FISAT student
    if (document.getElementById('isFisatian').value === 'yes') {
        formData.append('branch', document.getElementById('branch').value);
        formData.append('semester', document.getElementById('semester').value);
    }

    // Add payment screenshot
    const paymentFile = document.getElementById('payment').files[0];
    if (paymentFile) {
        formData.append('payment', paymentFile);
    }

    // Validate required fields
    const isFisatian = document.getElementById('isFisatian').value;
    if (!formData.get('name') || !formData.get('email') || !formData.get('phone') ||
        !formData.get('gender') || !paymentFile || isFisatian === '') {
        Toast.show('Please fill in all required fields', 'error');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    // Validate FISAT student fields
    if (isFisatian === 'yes' && (!formData.get('branch') || !formData.get('semester'))) {
        Toast.show('Please fill in all academic information', 'error');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    // Validate non-FISAT fields
    if (isFisatian === 'no' && !formData.get('role')) {
        Toast.show('Please enter your role/profession', 'error');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    try {
        Toast.show('Submitting your registration...', 'info');
        
        const response = await fetch('https://registration-lhy3.onrender.com/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        const result = await response.json();
        Toast.show('Registration successful! You will receive a mail shortly', 'success');

        // Reset form after successful submission
        document.querySelector('form').reset();

        // Reset academic section visibility
        const academicSection = document.getElementById('academicSection');
        const roleGroup = document.getElementById('roleGroup');
        if (academicSection && roleGroup) {
            academicSection.style.display = 'none';
            roleGroup.style.display = 'none';
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } catch (error) {
        console.error('Error:', error);
        Toast.show(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
        // Reset button state regardless of success or failure
        registerButton.textContent = "Register";
        registerButton.disabled = false;
    }
}

// Add the event listener
document.getElementById('register').addEventListener('click', submitRegistration);

// Toast class implementation (make sure this is included above the submitRegistration function)
class Toast {
    static show(message, type = 'success') {
        const container = document.getElementById('toast-container') || Toast.createContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <span class="toast-close">✕</span>
        `;
        
        container.appendChild(toast);
        
        // Handle close button click
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
                setTimeout(() => {
                    if (toast.parentElement) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 5000);
    }

    static createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}