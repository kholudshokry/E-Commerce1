 $('#password, #confirm_password').on('keyup', function() {
     if ($('#password').val() == $('#confirm_password').val()) {
         $('#message').html('Matching').css('color', 'green');
     } else
         $('#message').html('Not Matching').css('color', 'red');
 });
 let found;
 let users = [];
 let form = document.getElementById('form');
 class User {
     constructor(fname, lname, email, password) {
         this.fname = fname;
         this.lname = lname;
         this.email = email;
         this.password = password;
         this.username = fname + lname;
         this.address = '';
         this.city = '';
         this.country = '';
         this.postalcode = '';
         this.aboutme = '';
         this.photosrc = '';
     }
 }

 document.getElementById('signup-btn').addEventListener('click', (e) => { // event on sign up button
     let usersInlocalStorage = JSON.parse(localStorage.getItem("users"));
     let fname = document.forms["form"]["fname"].value;
     let lname = document.forms["form"]["lname"].value;
     let email = document.forms["form"]["email"].value;
     let password = document.forms["form"]["password"].value;
     let confpassword = document.forms["form"]["confirm_password"].value;
     let user = new User(fname, lname, email, password);
     //check validation
     if (/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/g.test(password) && fname != '' && lname != '' && /(?=.*[@])/g.test(email)) {
         if (password == confpassword) { // password and confirm password matches
             if (usersInlocalStorage == null) { //website contains no users
                 users = [];
                 users.push(user);
                 localStorage.setItem("users", JSON.stringify(users));
                 localStorage.setItem("current user", JSON.stringify(email));
                 //  alert("first user added");
                 e.preventDefault();
                 window.location.href = "index.html";
             } else if (usersInlocalStorage != null) { //website contain users
                 if (emailExist(usersInlocalStorage, email)) { // check email exist before or not
                     alert("!email user exist , enter a different email");
                     found = false;
                 } else { //email not exist before
                     users = JSON.parse(localStorage.getItem("users"));
                     users.push(user);
                     localStorage.setItem("users", JSON.stringify(users));
                     localStorage.setItem("current user", JSON.stringify(email));
                     //  alert("anotheruser added");
                     e.preventDefault();
                     window.location.href = "index.html";
                     form.reset();
                 }
             }


         } else { // password and confirm password not matches
             alert("password and confirm password should match");
             $('#message').html('Not Matching').css('color', 'red');
         }
     } else { //user did not enter all values
         alert("all values required for registeration");
         e.preventDefault();
     }
 });

 function emailExist(usersInlocalStorage, email) {
     found = false;
     usersInlocalStorage.forEach(user => {
         if (user.email == email) {
             found = true;
         }
     });
     return found;
 }