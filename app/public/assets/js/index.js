$(document).ready(() => {
    let songArray = [];
    const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    $(".alert").hide();

    $(function(){
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).slideToggle();
        });
    });

    function populateTable() {
        $(".song-table").empty();
        for ([i, song] of songArray.entries()) {
            let idCell = $("<td>").addClass("no-border");
            let nameCell = $("<td>").addClass("no-border");
            let artistCell = $("<td>").addClass("no-border");
            let buttonCell = $("<td class='no-border text-center pt-3 song-button text-random delete'><i class='fa fa-times'></i></td>");
            idCell.text(i + 1).attr("scope", "row");
            nameCell.text(song.songName);
            artistCell.text(song.songArtist);
            let row = $("<tr>").append(idCell, nameCell, artistCell, buttonCell).attr("id", (i));
            $(".song-table").append(row);
        }
        if (!isMobile) {
            $("#table-songs").tableDnDUpdate();
        }
        // console.log("=========Repopulated=========");
        // console.log(songArray);
    }

    function refreshIndex() {
        for (let i = 0; i < songArray.length; i++) {
            songArray[i].songPosition = i;
        }
        // console.log("=========Refreshed=========");
        // console.log(songArray);
    }

    function parseDates() {
        let lastLogin = $("#last-login").attr("data-date");
        let dateCreated = $("#date-created").attr("data-date");
        $("#last-login").text(moment(lastLogin).format("MMMM Do"));
        $("#date-created").text(moment(dateCreated).format("MMMM Do"));
    }

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
        $("*").css("--random-dark", randomColor({
            luminosity: "dark",
        }));
    });

    parseDates();

    if (!isMobile) {
        $("#table-songs").tableDnD({
            onDrop: (table) => {
                let rows = table.tBodies[0].rows;
                let sortingArray = [];
                for (let i = 0; i < rows.length; i++) {
                    sortingArray.push(Number(rows[i].id));
                }
                songArray.sort(function (a, b) {
                    return sortingArray.indexOf(a.songPosition) - sortingArray.indexOf(b.songPosition);
                });
                for (let i = 0; i < songArray.length; i++) {
                    songArray[i].songPosition = i;
                }
                populateTable();
            }
        });
    }

    $(".author-link").on("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        author = $(this).text();
        window.location.replace("/user/" + author);
    });

    $("a").on("click", function (event) {
        event.stopImmediatePropagation();
    });

    // $(".icon-link").on("click", function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    // });

    $("#add-song").on("click", function (event) {
        console.log(songArray);
        event.preventDefault();
        event.stopPropagation();
        let songName = $("#song-name").val().trim();
        songName ? $("#song-name").removeClass("is-invalid") : $("#song-name").addClass("is-invalid");
        let songArtist = $("#song-artist").val().trim();
        songArtist ? $("#song-artist").removeClass("is-invalid") : $("#song-artist").addClass("is-invalid");
        if (!$(".song-div input").hasClass("is-invalid")) {
            songArray.push({ "songName": songName, "songArtist": songArtist, "songPosition": songArray.length });
            populateTable();
            console.log(songArray);
            $("#song-name").val("");
            $("#song-artist").val("");
        }
        console.log("Missing Data");
    });

    $(".song-table").on("click", ".delete", function (event) {
        event.preventDefault();
        songArray.splice($(this).parent().attr("id"), 1);
        $(this).parent().remove();
        refreshIndex();
        populateTable();
    });

    $("#submit-playlist").on("click", function (event) {
        event.preventDefault();
        let playlistTitle = $("#playlist-title").val().trim();
        playlistTitle ? $("#playlist-title").removeClass("is-invalid") : $("#playlist-title").addClass("is-invalid");
        let playlistDescription = $("#playlist-description").val().trim();
        playlistDescription ? $("#playlist-description").removeClass("is-invalid") : $("#song-name").addClass("playlist-description");
        if (!$("input").hasClass("is-invalid")) {
            if (songArray.length === 0) {
                $("#alert-text").text("Playlist is empty");
                $(".alert").show();
            } else {
                $.post("/api/playlists", {
                    playlistTitle: playlistTitle,
                    playlistDescription: playlistDescription,
                    playlistContents: songArray
                    // eslint-disable-next-line no-unused-vars
                }).done((res) => {
                    console.log(res);
                    location.reload();
                    // If there's an error, handle it by throwing up a bootstrap alert
                }).fail(function (jqXHR) {
                    console.log(jqXHR.responseJSON.message);
                    $("#alert-text").text(jqXHR.responseJSON.message);
                    $(".alert").addClass("show");
                });
            }
        } else {
            console.log("Fields are missing");
        }
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on("show.bs.collapse", function () {
        console.log("collapse hide");
        $(this).prev(".card-header").find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on("hide.bs.collapse", function () {
        $(this).prev(".card-header").find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
});