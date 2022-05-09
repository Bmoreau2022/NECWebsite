function get_event_block(event, idx) {
    return `<div class="event_block" >
                <div class="container" style="background: rgba(254,250,224,0.5); width: 75%; border: 2px solid var(--text); padding-bottom: 20px;">
                    <br>
                    <div class="row" style="text-align: center"><h2>${event.event_name}</h2></div>
                    <br>
                    <div class="row"><img src="${event.url}" alt="" style="width: 30%; margin: auto"></div>
                    <br>
                    <div class="row" style="margin: auto; width: 50%"><p>${event.event_description}</p></div>
                    <br>
                    <div class="row" style="">
                        <button class="btn btn-primary Attend" value="${event.event_name}" style="width: 30%;margin: auto">Attend</button>
                    </div>
                    </div>
                
            </div><br>`
}

function get_event_block_past(event, idx) {
    return `<div class="event_block" >
                <div class="container" style="background: rgba(254,250,224,0.5); width: 75%; border: 2px solid var(--text); padding-bottom: 20px;">
                    <br>
                    <div class="row" style="text-align: center"><h2>${event.event_name}</h2></div>
                    <br>
                    <div class="row"><img src="${event.url}" alt="" style="width: 30%; margin: auto"></div>
                    <br>
                    <div class="row" style="margin: auto; width: 50%"><p>${event.event_description}</p></div>
                    <br>
                     <div class="row" style="">
                        <button class="btn btn-primary Attended" value="${event.event_name}" style="width: 30%;margin: auto">Attended</button>
                    </div>
                    </div>
                  
                
            </div><br>`
}


function showList(events) {
    $('#event_list_current').empty();

    events.forEach((event, idx) => {
        console.log(event, idx)
        $('#event_list_current')
            .append(get_event_block(event, idx))
    })


}

function showListPast(events) {
    $('#event_list_past').empty();

    events.forEach((event, idx) => {
        console.log(event, idx)
        $('#event_list_past')
            .append(get_event_block_past(event, idx))
    })


}


window.addEventListener('resize', function () {
    addRequiredClass();
})


function addRequiredClass() {
    if (window.innerWidth < 860) {
        document.body.classList.add('mobile')
    } else {
        document.body.classList.remove('mobile')
    }
}

window.onload = addRequiredClass
let hamburger = document.querySelector('.hamburger')
let mobileNav = document.querySelector('.nav-list')
let bars = document.querySelectorAll('.hamburger span')
let isActive = false

hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open')
    if (!isActive) {
        bars[0].style.transform = 'rotate(45deg)'
        bars[1].style.opacity = '0'
        bars[2].style.transform = 'rotate(-45deg)'
        isActive = true
    } else {
        bars[0].style.transform = 'rotate(0deg)'
        bars[1].style.opacity = '1'
        bars[2].style.transform = 'rotate(0deg)'
        isActive = false
    }
})

let events_current = [
    {
        "event_name": "Worldwide Teach-in on Climate Justice - 3/18/22",
        "event_description": "",
        "url": "img/ClimateJustice.png",

    },
    {
        "event_name": "Listening in Nature Event - 4/22/22",
        "event_description": "",
        "url": "img/NatureEvent1.jpeg",
    }
]

let events_past = [
    {
        "event_name": "Listening in Nature Event - 11/5/21",
        "event_description": "",
        "url": "img/NatureEvent2.jpeg",
    },

    {
        "event_name": "The Ecology of Genocide - 11/3/21",
        "event_description": "",
        "url": "img/EcologyEvent.png",
    },

    {
        "event_name": "Environmental Defenders Panel - 10/29/21",
        "event_description": "",
        "url": "img/Defenders.png",
    },
    {
        "event_name": "Graduate Students Symposium '21 - 5/19/21",
        "event_description": "",
        "url": "img/Symposium.png",
    },
    {
        "event_name": "Reflecting on the Climate Crisis Through Art - 5/14/21",
        "event_description": "Meet at Red Square to walk over to University Park for a relaxed art exploration of connection to place. Painting and drawing supplies will be provided for each participant. We will be creating art based on some guided open interpretation prompts related to climate change and the natural world. There will be opportunities to discuss and share each of our works during the event and possibly a chance to display work afterwards, if there is interest.\n" +
            "\n",
        "url": "img/Reflecting.png",
    }
]

showList(events_current);
showListPast(events_past);

$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
        } else {
            $('.logout').remove()
        }
    })
})

$('.Attend').on('click', function () {
    let ev_name = $(this).val();
    console.log(ev_name)
    let events = {};
    for (let i = 0; i < events_current.length; i++) {
        if (events_current[i].event_name === ev_name) {
            events = events_current[i];
            break
        }
    }
    $.post('/attend_event', {event: events}).done((data) => {
        if (data.message === "success") {
            location.reload();
        } else {
            location.href = data.redr;
        }
    });
});


$('.Attended').on('click', function () {
    let ev_name = $(this).val();
    console.log(ev_name)
    let events = {};
    for (let i = 0; i < events_past.length; i++) {
        if (events_past[i].event_name === ev_name) {
            events = events_past[i];
            break
        }
    }
    $.post('/attend_event', {event: events}).done((data) => {
        if (data.message === "success") {
            location.reload();
        } else {
            location.href = data.redr;
        }
    });
});