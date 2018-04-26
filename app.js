
//Using library in Non-browser used cased
var user = G$("John", "Robinson", "en" );

//chaining the operation provide better readability
user.greet(true)
    .changeLanguage('es')
    .greet()
    .logActivity();


//Using the library in with dom manipulation
$("#login").click(function(){

    //Lets assume the login was successful and we have received the first and last name from the session
    var greet = G$('Max', 'Demon');
    $('#loginForm').hide();

    //Passing the selected language, setting the greet html and logging the activity
    greet.changeLanguage($('#language').val())
        .htmlGreet('#greeting',true)
        .logActivity();

});