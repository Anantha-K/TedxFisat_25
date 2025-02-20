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
        alert('Please fill in all required fields');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    // Validate FISAT student fields
    if (isFisatian === 'yes' && (!formData.get('branch') || !formData.get('semester'))) {
        alert('Please fill in all academic information');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    // Validate non-FISAT fields
    if (isFisatian === 'no' && !formData.get('role')) {
        alert('Please enter your role/profession');
        registerButton.textContent = "Register";
        registerButton.disabled = false;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        const result = await response.json();
        alert('Registration successful!');
        
        // Reset form after successful submission
        document.querySelector('form').reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Registration failed. Please try again.');
    } finally {
        // Reset button state regardless of success or failure
        registerButton.textContent = "Register";
        registerButton.disabled = false;
    }
}

// Update the button's onclick attribute to use this function
document.getElementById('register').addEventListener('click', submitRegistration);