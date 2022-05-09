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

const urlParams = new URLSearchParams(window.location.search);
const user = JSON.parse(urlParams.get('input'));
const errorMessage = urlParams.get("error");

if (errorMessage) {
    //console.log(car);
    fillUser(user);
    $('#error_msg').text(errorMessage);
}

$('form').on('submit', function () {

});

function fillUser(user) {
    $('#email').val(user.username);
    $('#password').val(user.password);
    $('#confirm').val(user.confirm);
    $('#fullname').val(user.fullname);
    $('#profile').val(user.profile);
    $('#assoc').val(user.assoc);
}