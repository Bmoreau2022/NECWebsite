function get_event_block(event, idx) {
    return `<div class="event_block ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                <div class="row">
                    <div class="col-3">${event.event_name}</div>
                    <div class="col-3">${event.event_description}</div>
                    <div class="col-3"><img src="${event.url}" alt=""></div>
                    
                    <div class="col-2 d-flex justify-content-end">
                        <button class="btn btn-outline-primary" value="0">
                        Like</button>
                    </div>
                </div>
            </div>`
}


function showList(events) {
    $('#event_list_current').empty();

    events.forEach((event,idx)=>{
        console.log(event,idx)
        $('#event_list_current')
            .append(get_event_block(event,idx))
    })
}


window.addEventListener('resize', function(){
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

hamburger.addEventListener('click', function() {
    mobileNav.classList.toggle('open')
    if(!isActive) {
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
        "url": "https://newearthconversation.org/wp-content/uploads/2022/02/Climate-teach-in-poster-V3-225x300.png",
    },
    {
        "event_name": "Listening in Nature Event - 4/22/22",
        "event_description": "",
        "url": "https://newearthconversation.org/wp-content/uploads/2022/02/lin--300x168.jpg",
    }
]

let events_past = [
    {
        "event_name": "Worldwide Teach-in on Climate Justice - 3/18/22",
        "event_description": "",
        "url": "https://newearthconversation.org/wp-content/uploads/2022/02/Climate-teach-in-poster-V3-225x300.png",
    },
    {
        "event_name": "",
        "event_description": "",
        "url": "",
    }
]

showList(events_current);

$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
        }else{
            $('.logout').remove()
        }
    })
})
