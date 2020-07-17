$(document).ready(() => {

    function deletePlaylist(playlistId) {
        console.log("Destroying Playlist");
        $.post("/api/playlists_destroy", {
            playlistId: playlistId,
        }).then(() => {
            window.location.replace("/profile/settings");
        }).catch(err => {
            console.log(err);
        });
    }

    $("#edit, #cancel").on("click", function (event) {
        console.log("you pressed the button");
        event.preventDefault();
        $(".toggle").slideToggle();
        $(".toggle-fade").fadeToggle();
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        let username = $("#username").val();
        username ? $("#username").removeClass("is-invalid") : $("#username").addClass("is-invalid");
        console.log(username);
        let email = $("#email").val();
        email ? $("#email").removeClass("is-invalid") : $("#email").addClass("is-invalid");
        console.log(email);
        let firstName = $("#firstName").val();
        firstName ? $("#firstName").removeClass("is-invalid") : $("#firstName").addClass("is-invalid");
        console.log(firstName);
        let lastName = $("#lastName").val();
        lastName ? $("#lastName").removeClass("is-invalid") : $("#lastName").addClass("is-invalid");
        console.log(lastName);
        if (!$("input").hasClass("is-invalid")) {
            $.post("/api/user", {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName
            }).done(() => {
                window.location.replace("/profile/settings");
            }).fail(function (jqXHR) {
                console.log(jqXHR.responseJSON.message);
                $("#alert-text").text(jqXHR.responseJSON.message);
                $(".alert").addClass("show");
            });
        }
    });

    $(".playlist-container").append("<button class='font-comment d-flex delete-playlist' data-toggle='modal' data-target='#deleteWarning'><span class='d-none d-lg-block'>Delete Playlist </span><i class='fa fa-times m-3 m-lg-1'></i></button>");

    $(".delete-playlist").on("click", function (event) {
        event.preventDefault();
        let playlistId = $(this).parent().data("playlist");
        $("#deleteWarning").data("playlist", playlistId);
    });

    $(".modal").on("click", "#confirm-delete", function (event) {
        event.preventDefault();
        let playlistId = $(".modal").data("playlist");
        deletePlaylist(playlistId);
    });
});