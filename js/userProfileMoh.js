let userData;
let userIndex = 0;

let username = document.getElementById('input-username');
let firstname = document.getElementById('input-first-name');
let lastname = document.getElementById('input-last-name');
let email = document.getElementById('input-email');
let password = document.getElementById('input-password');

let address = document.getElementById('input-address');
let city = document.getElementById('input-city');
let country = document.getElementById('input-country');
let postalcode = document.getElementById('input-postal-code');
let aboutme = document.getElementById('aboutme');
let rightUserName = document.getElementById('right_user_name');
let right_country = document.getElementById('right_country');
let top_username = document.getElementById('top_username');

let userimgsrc = '';

let choose_file = document.getElementById('choose_file');
let browse_label = document.getElementById('browse_label');
document.getElementById('editprofile').addEventListener('click', (e) => { // when click on edit profile button
    for (let i = 1; i < document.getElementsByTagName('input').length; i++) { //to remove all inputs read only attribute
        document.getElementsByTagName('input')[i].removeAttribute('readonly');
    }
    document.getElementById('aboutme').removeAttribute('readonly'); // it out of loop becuse it textArea not input
    for (let i = 0; i < document.getElementsByClassName('fa').length; i++) {
        document.getElementsByClassName('fa')[i].setAttribute('style', 'display:inline');
    }
    choose_file.style.display = 'block';
    browse_label.style.display = 'inline';

});

let currentUser = JSON.parse(localStorage.getItem("current user"));
let users = JSON.parse(localStorage.getItem("users"));
users.forEach(user => {
    if (user.email == currentUser) {
        userData = user;
    }
});
for (userIndex = 0; userIndex < users.length; userIndex++) {
    if (users[userIndex] == currentUser) {
        break;
    }

}
window.onload = (event) => {
    firstname.value = userData.fname;
    lastname.value = userData.lname;
    email.value = userData.email;
    password.value = userData.password;
    username.value = userData.fname + " " + userData.lname;
    rightUserName.innerHTML = userData.fname + "    " + userData.lname;
    top_username.innerHTML = userData.fname + " " + userData.lname;
    right_country.innerHTML = userData.country;
    address.value = userData.address;
    city.value = userData.city;
    country.value = userData.country;
    aboutme.value = userData.aboutme;
    postalcode.value = userData.postalcode;
    if (userData.photosrc == '') {
        $('#userimg').attr('src', '../images/35-350426_profile-icon-png-default-profile-picture-png-transparent.png');
        $('#top_img').attr('src', '../images/35-350426_profile-icon-png-default-profile-picture-png-transparent.png');
    } else {
        $('#userimg').attr('src', userData.photosrc);
        $('#top_img').attr('src', userData.photosrc);
    }
    for (let i = 1; i < document.getElementsByTagName('input').length; i++) { //to make all inputs read only and start from one to avoid search input
        document.getElementsByTagName('input')[i].setAttribute('readonly', true);
    }
    document.getElementById('aboutme').setAttribute('readonly', true);

}

function readURL(input) { //getting  src of image that user chooose it

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#userimg').attr('src', e.target.result);
            $('#top_img').attr('src', e.target.result);
            userimgsrc = e.target.result; // src of image that user chooose it

        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#choose_file").change(function() {
    readURL(this);
});

document.getElementById('save').addEventListener('click', (e) => { //saving data
    e.preventDefault();
    let obj = {
        fname: firstname.value,
        lname: lastname.value,
        email: email.value,
        password: password.value,
        username: firstname.value + lastname.value,
        address: address.value,
        city: city.value,
        country: country.value,
        postalcode: postalcode.value,
        aboutme: aboutme.value,
        photosrc: userimgsrc
    };
    users[userIndex - 1] = obj;
    right_country.innerHTML = obj.country; // showing right country in its position when entering save button
    localStorage.setItem('users', JSON.stringify(users));
    choose_file.style.display = 'none';
    browse_label.style.display = 'none';

    for (let i = 1; i < document.getElementsByTagName('input').length; i++) { //to make all inputs read only and start from one to avoid search input
        document.getElementsByTagName('input')[i].setAttribute('readonly', true);
    }
    document.getElementById('aboutme').setAttribute('readonly', true);

    for (let i = 0; i < document.getElementsByClassName('fa').length; i++) {
        document.getElementsByClassName('fa')[i].setAttribute('style', 'display:none');
    }

});