$(document).ready(() => {

    $(".vote-div").each(function() {
        let vote = $(this).data("vote");
        if (vote) {
            if (vote === 1){
                $(this).find(".upvote").prop("disabled", true);
            } else {
                $(this).find(".downvote").prop("disabled", true);
            }
            $(this).find(".upvotes").addClass("text-activated");
        }
    });

    $(".upvote").on("click", (event) => {
        event.preventDefault();
        let voteDiv = $(event.target).parent().parent();
        let playlistId = voteDiv.data("playlist");
        if (voteDiv.find(".downvote:disabled").get(0) === undefined) {
            console.log("Make an create call");
            $.post("/api/upvote", {
                playlistId: playlistId,
            }).then(() => {
                location.reload();
            });
        } else {
            console.log("Make an update call");
            $.post("/api/revote", {
                playlistId: playlistId,
                value: 1
            }).then(() => {
                location.reload();
            });
        }
    });

    $(".downvote").on("click", (event) => {
        event.preventDefault();
        let voteDiv = $(event.target).parent().parent();
        let playlistId = voteDiv.data("playlist");
        if (voteDiv.find(".upvote:disabled").get(0) === undefined) {
            console.log("Make a create call");
            $.post("/api/downvote", {
                playlistId: playlistId,
            }).then(() => {
                location.reload();
            });
        } else {
            console.log("Make an update call");
            $.post("/api/revote", {
                playlistId: playlistId,
                value: -1
            }).then(() => {
                location.reload();
            });
        }
    });
});