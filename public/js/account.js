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

function load_user(user) {
    $('#name').text(user.fullname);
    let assoc_test = user.assoc
    console.log(assoc_test)
    $('#assoc').text(assoc_test);
    $('#profile_img').attr('src', user.profile);
    $('#email').text(user.username);
    // if(user.carsliked) {
    //     const cars = [];
    //     user.carsliked.forEach((user) => {
    //         cars.push(user.carsliked)
    //     });
    //     $('#car_list').text(cars.join(", "))
    // }
}

const urlParams = new URLSearchParams(window.location.search);
// const car_id = urlParams.get('car_id')
// console.log(car_id);

$(document).ready(function (){
    $.getJSON('/get_current_user?').done((data) => {
        if (data.message === "success") {
            load_user(data.data)
        }
    })
})