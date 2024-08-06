$(document).ready(function() {
    // Validate the contact form
    $("#contactForm").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            firstName: "Please enter your first name",
            lastName: "Please enter your last name",
            phone: "Please enter your phone number",
            email: {
                required: "Please enter a valid email address",
                email: "Please enter a valid email address"
            },
            message: {
                required: "Please enter a message",
                minlength: "Your message must be at least 5 characters long"
            }
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            error.insertAfter(element);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        },
        submitHandler: function(form) {
            var $submit = $('.submitting'),
                waitText = 'Submitting...';

            $.ajax({
                type: "POST",
                url: "php/sendEmail.php",
                data: $(form).serialize(),
                beforeSend: function() {
                    $submit.css('display', 'block').text(waitText);
                },
                success: function(msg) {
                    if (msg == 'OK') {
                        $('#form-message-warning').hide();
                        setTimeout(function() {
                            $('#contactForm').fadeIn();
                        }, 1000);
                        setTimeout(function() {
                            $('#form-message-success').fadeIn();
                        }, 1400);
                        setTimeout(function() {
                            $('#form-message-success').fadeOut();
                        }, 8000);
                        setTimeout(function() {
                            $submit.css('display', 'none').text(waitText);
                        }, 1400);
                        setTimeout(function() {
                            $('#contactForm')[0].reset();
                        }, 1400);
                    } else {
                        $('#form-message-warning').html(msg);
                        $('#form-message-warning').fadeIn();
                        $submit.css('display', 'none');
                    }
                },
                error: function() {
                    $('#form-message-warning').html("Something went wrong. Please try again.");
                    $('#form-message-warning').fadeIn();
                    $submit.css('display', 'none');
                }
            });
        }
    });
});
