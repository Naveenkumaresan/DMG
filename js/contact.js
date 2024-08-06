document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;           
    const phonePattern = /^\d{10}$/;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            const value = input.value.trim();
            let errorMessage = '';

            if (input.id === 'firstName' && value === '') {
                errorMessage = 'Please enter your first name.';
                isValid = false;
            } else if (input.id === 'lastName' && value === '') {
                errorMessage = 'Please enter your last name.';
                isValid = false;
            } else if (input.id === 'message' && value === '') {
                errorMessage = 'Please enter a message.';
                isValid = false;
            } else if (input.type === 'email' && !emailPattern.test(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            } else if (input.type === 'tel' && !phonePattern.test(value)) {
                errorMessage = 'Please enter a valid 10-digit phone number.';
                isValid = false;
            }

            if (errorMessage) {
                input.classList.add('is-invalid');
                input.nextElementSibling.textContent = errorMessage;
            } else {
                input.classList.remove('is-invalid');
                input.nextElementSibling.textContent = ''; 
            }
        });

        // reCAPTCHA validation
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            isValid = false;
            document.getElementById('recaptcha-error').style.display = 'block';
        } else {
            document.getElementById('recaptcha-error').style.display = 'none';
        }

        if (isValid) {
            submitForm();
        }
    });

    function submitForm() {
        // Show loading alert
        Swal.fire({
            title: 'Mail Sending...',
            text: 'Please wait while we send your message.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            type: 'POST',
            url: 'sendEmail.php',
            data: $('#contactForm').serialize(),
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You!',
                    text: 'Your message was sent'
                });
                $('#contactForm')[0].reset();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error sending your message.'
                });
            }
        });
    }
});

//footer mail sent
$(document).ready(function() {
    $('#subscriptionForm').on('submit', function(event) {
event.preventDefault(); 

var email = $('#Email').val();

Swal.fire({
    title: 'Mail Sending...',
    text: 'Please wait while we send your message.',
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading();
    }
});

$.ajax({
    url: 'subEmail.php',
    type: 'POST',
    data: { email: email },
    success: function(response) {
        Swal.fire({
            icon: 'success',
            title: 'Subscription Successful',
            text: 'You have successfully subscribed!'
        });
        $('#Email').val(''); // Clear the input field
    },
    error: function(xhr, status, error) {
        Swal.fire({
            icon: 'error',
            title: 'Subscription Failed',
            text: 'Please try again.'
        });
    }
});
});
});