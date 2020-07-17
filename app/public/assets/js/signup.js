$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const firstName = $("input#first-name-input");
    const lastName = $("input#last-name-input");
    const emailInput = $("input#email-input");
    const username = $("input#user-name-input");
    const passwordInput = $("input#password-input");

    //=================COLOR=STUFF==================
    $(".random-color").each(function () {
        $(this).css("color", randomColor({
            luminosity: "bright",
        }));
    });
    $(".random-light").each(function () {
        $(this).css("color", randomColor({
            luminosity: "light",
        }));
    });
    $(".text-random").mouseleave(() => {
        $("*").css("--random-color", randomColor());
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser({ firstName, lastName, email, username, password }) {

        $.post("/api/signup", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        }).done(() => {
            window.location.replace("/playlists");
            // If there's an error, handle it by throwing up a bootstrap alert
        }).fail((jqXHR, textStatus, errorThrown) =>{
            if (errorThrown === "Unauthorized") {
                console.log("Unauthorized");
                $("#alert-text").text("Username or Email Taken");
                $(".alert").show().addClass("show");
            }
        });
    }

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            email: emailInput.val().trim(),
            username: username.val().trim(),
            password: passwordInput.val().trim()
        };

        //I hate this page but I don't have time to rewrite it.
        userData.firstName ? $("#first-name-input").removeClass("is-invalid") : $("#first-name-input").addClass("is-invalid");
        userData.lastName ? $("#last-name-input").removeClass("is-invalid") : $("#last-name-input").addClass("is-invalid");
        userData.email ? $("#email-input").removeClass("is-invalid") : $("#email-input").addClass("is-invalid");
        userData.username ? $("#user-name-input").removeClass("is-invalid") : $("#user-name-input").addClass("is-invalid");
        userData.password ? $("#password-input").removeClass("is-invalid") : $("#password-input").addClass("is-invalid");

        if (!userData.firstName || !userData.lastName || !userData.email || !userData.username || !userData.password) {
            console.log("All fields must be filled.");
            return;
        } else {
            signUpUser(userData);
            $("input").val("");
        }
        // If we have an email and password, run the signUpUser function
    });

});
