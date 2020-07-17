$(document).ready(() => {

    $(".alert").hide();

    $(function(){
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).slideToggle();
        });
    });

    $(".random-color").each(function () {
        $(this).css("color", randomColor({
            // luminosity: "bright",
        }));
    });

    $(".random-light").each(function () {
        $(this).css("color", randomColor({
            luminosity: "light",
        }));
    });

    // When the form is submitted, we validate there's an email and password entered
    $("form.login").on("submit", event => {
        event.preventDefault();
        let usernameInput = $("input#username-input").val().trim();
        usernameInput ? $("#username-input").removeClass("is-invalid") : $("#username-input").addClass("is-invalid");
        let passwordInput = $("input#password-input").val().trim();
        passwordInput ? $("#password-input").removeClass("is-invalid") : $("#password-input").addClass("is-invalid");
        if (usernameInput && passwordInput) {
            $.post("/api/login", {
                username: usernameInput,
                password: passwordInput
            }).done(() => {
                window.location.replace("/playlists");
            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (errorThrown === "Unauthorized") {
                    console.log("Unauthorized");
                    $("#alert-text").text("Invalid Credentials");
                    $(".alert").show().addClass("show");
                }
            });
        } else {
            console.log("Required Fields are Empty");
        }
    });
});