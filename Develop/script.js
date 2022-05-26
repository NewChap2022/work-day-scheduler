var tasks = [];

// checking time and set different colors for past, present and future
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

// load tasks from localStorage
var loadTasks = function () {
    var pastTasks = JSON.parse(localStorage.getItem("tasks"));
    // if localStorage is empty, stop this function
    if (pastTasks === null) {
        return;
    } else {
        $.each(pastTasks, function (i) {
            // check if the tasks belong to today's schedule
            if (moment(pastTasks[i].date).isSame(moment(), "date")) {
                tasks.push(pastTasks[i]);
            };
        });
        // clear past tasks and add qualified tasks only
        localStorage.removeItem("tasks");
        localStorage.setItem("tasks", JSON.stringify(tasks));

        addToTimeBlocks();
    }
};

// put tasks into html
var addToTimeBlocks = function () {
    // iterate tasks to put into correct time block
    $(".hour").each(function (index, element) {
        $.each(tasks, function (i) {
            if ($(element).text() === tasks[i].time) {
                $(element).parent().find(".description").text(tasks[i].description);
            };
        });
    });
};

// save new tasks or update existing tasks
var saveTask = function (task) {
    var savedTask = {
        description: task.text(),
        date: moment().format("LL"),
        time: $(task.parents()[1]).find(".hour").text(),
    };

    var i = tasks.findIndex(element => element.time === savedTask.time);
    if (i === -1) {
        tasks.push(savedTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        tasks[i].description = task.text();
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
};

// display current date in header
$("#currentDay").text(moment().format("dddd MMM Do YYYY"));

// load past saved tasks to page
loadTasks();

// when click on the task, enable editing function
$(".task-container").on("click", function () {
    var text = $(this).find(".description")
        .text()
        .trim();

    var textInput = $("<textarea>")
        .val(text);

    $(this).find(".description").replaceWith(textInput);
});

// when click on save function, replace <p> with <textarea> and save tasks
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

// checking current time when open the page
$(".time-block").each(function (i, obj) {
    timeChecking(obj);
});

// automatically checking time and change the color accordingly every 60 minutes;
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