var tasks = [];

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

var loadTasks = function () {
    var pastTasks = JSON.parse(localStorage.getItem("tasks"));

    if (pastTasks === null) {
        return false;
    } else {
        for (i = 0; i < pastTasks.length; i++) {
            if (moment(pastTasks[i].date).isSame(moment(), "date")) {
                tasks.push(pastTasks[i]);
                console.log(tasks);
            };
        }
        localStorage.removeItem("tasks");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    
}

var saveTask = function (task) {
    var savedTask = {
        description: task.text(),
        date: moment().format("LL"),
        time: $(task.parents()[1]).find(".hour").text(),
    };
    var i = tasks.findIndex(element => element = savedTask.time);

    if (i === -1) {
        tasks.push(savedTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        tasks[i].description = task.text();
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
};

$("#currentDay").text(moment().format("dddd MMM Do YYYY"));

$(".task-container").on("click", function () {
    var text = $(this).find(".description")
        .text()
        .trim();

    var textInput = $("<textarea>")
        .val(text);

    $(this).find(".description").replaceWith(textInput);
});

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

$(".time-block").each(function (i, obj) {
    timeChecking(obj);
});

var blockAudit = setInterval(function () {
    $(".time-block").each(function (i, obj) {
        timeChecking(obj);
    })
}, (1000 * 60) * 60);

// $(".container").on("blur", "textarea", function() {
//     var text = $(this).parent().find(".description").text()
//     var taskP = $("<p>")
//     .addClass("description")
//     .text(text);

//     $(this).replaceWith(taskP);
// });