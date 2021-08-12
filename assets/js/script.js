let displayTime = document.querySelector('#currentDay');
let $container = $('.container');
let $saveBtn = $('.saveBtn');
let currentTime = moment().hour();
let startTime = 9;
let numBlocks = 9;
let initValues = [
    {hour: 9, 
    text: ""}, 
    
    {hour: 10, 
    text: ""},

    {hour: 11, 
    text: ""}, 
    
    {hour: 12, 
    text: ""}, 

    {hour: 13, 
    text: ""},
    
    {hour: 14, 
    text: ""}, 

    {hour: 15, 
    text: ""}, 

    {hour: 16, 
    text: ""}, 

    {hour: 17, 
    text: ""}];

var timeInterval = setInterval(function () {
        
    displayTime.textContent = moment().format("dddd, MMMM Do");
}, 1000);

init();
generateTimes();

function init(){

    let storedTimes = JSON.parse(localStorage.getItem("times"));
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTimes !== null && storedTasks !== null) {

        for (let i = 0; i < storedTimes.length; i++) {
            
            if (storedTimes[i] == initValues[i].hour) {
                initValues[i].text = storedTasks[i];
            }                          
        }
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
       
        if (hour < currentTime) {
            newTask.addClass('past');
        }
        else if (hour > currentTime) {
            newTask.addClass('future');
        }
        else {
            newTask.addClass('present');
        }

        newTask.val(initValues[i-startTime].text);  
        
        let newSave = $('<button>');
        newSave.addClass('saveBtn');
        newSave.addClass('col-1');
        newSave.html('<i class="fas fa-save"></i>');
        newSection.append(newSave);
    }
}

function saveItem(event) {
    event.preventDefault();
    var btnClicked = $(event.target);

    if (btnClicked.hasClass('saveBtn')) {
        let taskTime = btnClicked.siblings().eq(0).text();  
        let timeToStore = parseInt(taskTime.substr(0, taskTime.length - 2));
        if (timeToStore < 9) {
            timeToStore += 12;
        }
        let currentTask = btnClicked.siblings().eq(1).val();
        
        for (let i = 0; i < initValues.length; i++) {
            if (timeToStore == initValues[i].hour) {
                initValues[i].text = currentTask;
            }            
        }
    }
    else {
        let taskTime = btnClicked.parent().siblings().eq(0).text();  
        let timeToStore = parseInt(taskTime.substr(0, taskTime.length - 2));
        if (timeToStore < 9) {
            timeToStore += 12;
        }
        let currentTask = btnClicked.parent().siblings().eq(1).val();

        for (let i = 0; i < initValues.length; i++) {
            if (timeToStore == initValues[i].hour) {
                initValues[i].text = currentTask;
            }            
        }
    }
    
    let saveTimes = [];
    let saveTasks = [];

    for (let i = 0; i < initValues.length; i++) {
        tempTime = initValues[i].hour;
        tempTask = initValues[i].text;

        saveTimes.push(tempTime);
        saveTasks.push(tempTask);        
    }

    localStorage.setItem("times", JSON.stringify(saveTimes));
    localStorage.setItem("tasks", JSON.stringify(saveTasks));
}

$container.on('click', '.saveBtn', saveItem);
$saveBtn.on('click', 'i', saveItem);