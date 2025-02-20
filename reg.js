async function submitRegistration(event) {
    event.preventDefault();

    const registerButton = document.getElementById('register');
    registerButton.textContent = "Loading...";
    registerButton.disabled = true;

    const formData = new FormData();

    // Add all text fields
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('isFisatian', document.getElementById('isFisatian').value);

    if (document.getElementById('isFisatian').value === 'no') {
        formData.append('role', document.getElementById('role').value);
    }

    if (document.getElementById('isFisatian').value === 'yes') {
        formData.append('branch', document.getElementById('branch').value);
        formData.append('semester', document.getElementById('semester').value);
    }

    const paymentFile = document.getElementById('payment').files[0];
    if (paymentFile) {
        formData.append('payment', paymentFile);
    }

    const isFisatian = document.getElementById('isFisatian').value;
    if (!formData.get('name') || !formData.get('email') || !formData.get('phone') ||
        !formData.get('gender') || !paymentFile || isFisatian === '') {
        Toast.show('Please fill in all required fields', 'error');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    if (isFisatian === 'yes' && (!formData.get('branch') || !formData.get('semester'))) {
        Toast.show('Please fill in all academic information', 'error');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

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

        document.querySelector('form').reset();

        const academicSection = document.getElementById('academicSection');
        const roleGroup = document.getElementById('roleGroup');
        if (academicSection && roleGroup) {
            academicSection.style.display = 'none';
            roleGroup.style.display = 'none';
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } catch (error) {
        console.error('Error:', error);
        Toast.show(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
        registerButton.textContent = "Register";
        registerButton.disabled = false;
    }
}

document.getElementById('register').addEventListener('click', submitRegistration);

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
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        });
        
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


document.addEventListener('DOMContentLoaded', async function() {
    const registerButton = document.getElementById('register');
    
    try {
        const response = await fetch('http://your-api-url/registration-count');
        const data = await response.json();
        
        if (data.count >= 10) {
            registerButton.disabled = true;
            registerButton.style.backgroundColor = '#ccc';
            registerButton.style.cursor = 'not-allowed';
            registerButton.textContent = 'Early Bird Tickets Sold Out';
            
            // Optionally disable the form
            document.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                return false;
            });
        }
    } catch (error) {
        console.error('Error checking registration count:', error);
    }
});