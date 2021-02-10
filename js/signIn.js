let usernotEist = false;
let helper = 0; // to not display "wrong email and password" message after success authentication
let userIndex;
let form = document.getElementById('form');
document.getElementById('loginbtn').addEventListener('click', (e) => { //login button in login page
    let email = document.forms["form"]["email"].value;
    let password = document.forms["form"]["password"].value;
    let usersInlocalStorage = JSON.parse(localStorage.getItem("users"));
    if (usersInlocalStorage == null) {
        alert("website have no users yet , go to Sign Up page and Create account");
        e.preventDefault();
    } else if (usersInlocalStorage != null) {
        if (email != '' && password != '') {
            e.preventDefault();
            usersInlocalStorage.forEach(user => {
                if (user.email == email && user.password == password) { // loop on all users and also check if email and pass at the same user
                    usernotEist = false;
                    helper = 1;
                    localStorage.setItem("current user", JSON.stringify(email));
                    window.location.href = "index.html";
                    return false;
                } else {
                    usernotEist = true;
                    console.log("this loop has no user , wait ");
                }

            });
            if (usernotEist && helper == 0) {
                alert("wrong email or password");
                usernotEist = false;
            }

            // function emailExist() {
            //     foundEmail = false;
            //     usersInlocalStorage.forEach(user => {
            //         if (user.email == email) {
            //             emailIndex = usersInlocalStorage.indexof(user); // to compare with pass index , to check email and pass for one user or not
            //             foundEmail = true;

            //         }
            //     });
            // }

            // function passwordExist() {
            //     foundPassword = false;
            //     usersInlocalStorage.forEach(user => {
            //         if (user.password == password) {
            //             passwordIndex = usersInlocalStorage.indexof(user); // to compare with email index , to check email and pass for one user or not
            //             foundPassword = true;
            //         }
            //     });
            // }
            // if (foundEmail) { // check email andpassword exist or not
            //     alert('exist')
            //     e.preventDefault();
            // foundEmail = false; //email exist ? ok , retrive it to default value
            // foundPassword = false; //email exist ? ok , retrive it to default value

            // if (emailIndex == passwordIndex) { // check password and email for the same user or not
            //     window.location.href = "index.html";

            // } else {
            //     e.preventDefault();
            //     alert("Wrong email or Password");

            // }
            // form.reset();

            // } else {
            //     alert("email not exist , create account");
            //     e.preventDefault();
            // }
        } else { // if the user didn't enter emaail or pass or both
            alert("email and password required");
            e.preventDefault();


        }

    }

});