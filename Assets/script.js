const dateBox = $('#time-block');
const today = moment();
const hour = parseInt(moment().hour());
let rows = $('.rows').toArray();
let saveBtns = $('.saveBtn');
let inputBoxes = $('.input-box');
let events = [];

$(dateBox).text(today.format('dddd, MMMM Do YYYY'));//logs current date to the jumbotron

for (let i=0; i<rows.length; i++){
    if (hour == rows[i].id){
        $(rows[i]).addClass('present')
    } else if (hour < rows[i].id) {        
        $(rows[i]).addClass('future')
    } else {$(rows[i]).addClass('past')}
}//changes color of rows depending on the time.

function start(){
        let storedEvents = JSON.parse(localStorage.getItem('storedEvents'));
        events = storedEvents || [];
    for (let i=0; i<rows.length; i++){
        let rowID = rows[i].id;
        console.log(rowID);
        for (let j=0; j<events.length; j++){
            console.log(events[j][0])
            let boxChild;
            boxChild = $(rows[i]).children('.input-box'); 
            if (events[j][0] === rowID){
                let boxCont = events[j][1];
                console.log('yes');
                $(rows[i]).find('textarea').html(boxCont);

            }
        }
    }
}

$(saveBtns).click(function(event){
    let boxLoc = $(event.target).closest('tr').attr('id');
    let boxCont = $(event.target).siblings('.input').find('.input-box').val()
    if (boxCont === ''){
        alert('you didn\'t put anything in the box!');
        return
    } else {
        console.log(boxLoc, boxCont);
        events.push([boxLoc, boxCont]);
        localStorage.setItem('storedEvents', JSON.stringify(events));
    }
});

start();
