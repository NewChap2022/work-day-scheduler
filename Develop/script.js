var tasks = [];
var currentDay = moment().format("dddd MMM Do YYYY");
$("#currentDay").text(currentDay);

var timeChecking = function (taskEl) {
    var time = moment($(taskEl).find(".hour").text().trim(), "hh A");
    var currentTime = moment();

    if (moment(time).isBefore(currentTime, "hour")) {
        $(taskEl).find(".task-container").addClass("past");
    } else if (moment(time).isSame(currentTime, "hour")) {
        $(taskEl).find(".task-container").addClass("present");
    } else {
        $(taskEl).find(".task-container").addClass("future");
    };
};


$(".time-block").each(function (i, obj) {
    timeChecking(obj);
});

var blockAudit = setInterval(function () {
    $(".time-block").each(function (i, obj) {
        timeChecking(obj);
    })
}, (1000 * 60) * 60);

$(".task-container").on("click", function () {
    var text = $(this).find(".description")
        .text()
        .trim();

    var textInput = $("<textarea>")
        .val(text);

    $(this).find(".description").replaceWith(textInput);
});

// $(".container").on("blur", "textarea", function() {
//     var text = $(this).parent().find(".description").text()
//     var taskP = $("<p>")
//     .addClass("description")
//     .text(text);

//     $(this).replaceWith(taskP);
// });
saveTask = function (task) {
    var savedTask = {
        description: task.text(),
        date: moment().format("LL"),
        time: $(task.parents()[1]).find(".hour").text(),
    };
    console.log(savedTask);
    tasks.push(savedTask);
    localStorage.setItem("tasks", JSON.stringify(tasks))
};

$(".saveBtn").click(function () {
    if ($(this).parent().find("textarea").length) {
        var textArea = $(this).parent().find("textarea");

        var text = $(textArea).val();
        var description = $("<p>")
            .addClass("description")
            .text(text);

        $(textArea).replaceWith(description);

        saveTask(description);
    }
});


