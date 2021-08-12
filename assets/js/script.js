let displayTime = document.querySelector('#currentDay');
let $container = $('.container');
let $saveBtn = $('.saveBtn');
let currentTime = moment().hour();
let startTime = 9;
let numBlocks = 9;
let times = [];
let tasks = [];

var timeInterval = setInterval(function () {
        
    displayTime.textContent = moment().format("dddd, MMMM Do");
}, 1000);

init();
generateTimes();

function init(){

    let storedTimes = JSON.parse(localStorage.getItem("times"));
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTimes !== null) {

        times = storedTimes;
    }

    if (storedTasks !== null) {

        tasks = storedTasks;
    }
}

function generateTimes() {
    for (let i = startTime; i < (startTime + numBlocks); i++) {
        let hour = i;
        let newId = "hour"+hour;
        
        let newSection = $('<section>');
        newSection.addClass('row');
        newSection.attr('id', newId);
        $container.append(newSection);

        let newHour = $('<p>');
        newHour.addClass('hour');
        newHour.addClass('col-1');
        newHour.addClass('text-center');       
        newHour.addClass('mb-0');
        newHour.addClass('pt-4');
        newSection.append(newHour);

        if (hour < 12) {
            newHour.text(hour + 'AM');
        }
        else if (hour > 12) {
            newHour.text((hour-12) + 'PM');
        }
        else {
            newHour.text(hour + 'PM');
        }

        let newTask = $('<textarea>');
        newTask.addClass('textarea');
        newTask.addClass('col-10');
        newSection.append(newTask);

        let newSave = $('<button>');
        newSave.addClass('saveBtn');
        newSave.addClass('col-1');
        newSave.html('<i class="fas fa-save"></i>');
        newSection.append(newSave);
        
        if (hour < currentTime) {
            newTask.addClass('past');
        }
        else if (hour > currentTime) {
            newTask.addClass('future');
        }
        else {
            newTask.addClass('present');
        }

        for (let n = 0; n < times.length; n++) {
            let checkTime = parseInt(times[n]);
            let checkTask = tasks[n];
            if (checkTime < 9) {
                checkTime += 12;
            }
            if (checkTime === i) {
                newTask.val(checkTask);
            }                 
        }
    }
}

function saveItem(event) {
    event.preventDefault();
    console.log(event.target);
    var btnClicked = $(event.target);
    
    if (btnClicked.hasClass('saveBtn')) {
        let taskTime = btnClicked.siblings().eq(0).text();
        console.log(taskTime);    
        let timeToStore = taskTime.substr(0, taskTime.length - 2);
        let currentTask = btnClicked.siblings().eq(1).val();
        console.log(currentTask);

        times.push(timeToStore);
        tasks.push(currentTask);
    }
    else {
        let taskTime = btnClicked.parent().siblings().eq(0).text();
        console.log(taskTime);    
        let timeToStore = taskTime.substr(0, taskTime.length - 2);
        let currentTask = btnClicked.parent().siblings().eq(1).val();
        console.log(currentTask);

        times.push(timeToStore);
        tasks.push(currentTask);
    }
    
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$container.on('click', '.saveBtn', saveItem);
$saveBtn.on('click', 'i', saveItem);