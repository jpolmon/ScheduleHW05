let displayTime = document.querySelector('#currentDay');
let $container = $('.container');
let currentTime = 12;
let startTime = 9;
let numBlocks = 9;

var timeInterval = setInterval(function () {
        
    displayTime.textContent = moment().format("dddd, MMMM Do");
}, 1000);

generateTimes();

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
        newSave.html('<i class="fas fa-save"></i>')
        newSection.append(newSave);


        
        if (hour < currentTime) {
            newTask.addClass('past')
        }
        else if (hour > currentTime) {
            newTask.addClass('future')
        }
        else {
            newTask.addClass('present')
        }
    }
}

function handleSaveItem(event) {
    // convert button we pressed (`event.target`) to a jQuery DOM object
    var btnClicked = $(event.target);
  
    // get the parent `<li>` element from the button we pressed and remove it
    btnClicked.parent('section').remove();
}

shoppingListEl.on('click', '.saveBtn', handleSaveItem);
 