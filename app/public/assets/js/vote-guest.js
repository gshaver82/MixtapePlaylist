$(document).ready(() => {
    $(".upvote").prop("disabled", true);
    $(".downvote").prop("disabled", true);
    $(".vote-div").on("click", (event) => {
        event.preventDefault();
        //could put something in here to direct to login or signup. Or just an alert.
    });
});