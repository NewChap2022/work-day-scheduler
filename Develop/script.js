var currentDay = moment().format("dddd MMM Do YYYY");
$("#currentDay").text(currentDay);

var timeChecking = function (taskEl) {
    var time = moment($(taskEl).find(".hour").text().trim(), "hh A");
    console.log(time);
    var currentTime = moment();

    if (moment(time).isBefore(currentTime, "hour")) {
        $(taskEl).find(".description").addClass("past");
    } else if (moment(time).isSame(currentTime, "hour")) {
        $(taskEl).find(".description").addClass("present");
    } else {
        $(taskEl).find(".description").addClass("future");
    };
};


$(".time-block").each(function(i, obj) {
    timeChecking(obj);});

var blockAudit = setInterval(function() {
    $(".time-block").each(function(i, obj) {
    timeChecking(obj);})
}, (1000*60)*60);

