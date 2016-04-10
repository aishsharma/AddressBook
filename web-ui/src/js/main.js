// addrApp namespace. All custom functions shoule be in here
var addrApp = addrApp || {};

//Creating seperate namespace for routing
addrApp.router = addrApp.router || {};

addrApp.config = {
    apiUrl: 'http://localhost:8080/api/',
    pageDir: 'pages/',
    templateDir: 'templates/',
    userLoggedIn: false,
    userToken: null,
    apiRoutes: {
        newUser: 'newUser'
    }
};


addrApp.constants = {
    page: 0,
    template: 1
};


// Starting the app
addrApp.init = function() {
    addrApp.loadHeader();
    addrApp.router.init();
};


// Setting routes
addrApp.router = $.sammy("#content", function() {
    //Index or Home Page
    this.get('#/', function(context) {
        addrApp.loadPage('index');
    });

    //Reistration Page
    this.get('#/register', function(context) {
        addrApp.loadPage('register');
    });
});


//Starting Sammy to listen for routes.
addrApp.router.init = function() {
    // Uncomment the next line for debugging router if needed.
    // $.sammy.raise_errors = true;
    addrApp.router.run('#/');
};

addrApp.showLoadSpinner = function() {
    return "<div id='spinner'><i class='fa fa-spinner fa-pulse fa-5x'></i></div>";
};


addrApp.loadHeader = function() {
    var path = addrApp.config.pageDir + "header.html";

    var fileData = "";

    $.get(path, function(data) {
            fileData = data;
        })
        .done(function() {
            $("#header").html(fileData);
        })
        .fail(function() {
            console.log("Ajax request to get page data failed");
        });
};


addrApp.loadPage = function(pageName) {

    $("#content").html(addrApp.showLoadSpinner());

    var path = addrApp.config.pageDir + pageName + ".html";

    var fileData = "";

    $.get(path, function(data) {
            fileData = data;
        })
        .done(function() {
            $("#content").html(fileData);
        })
        .fail(function() {
            console.log("Ajax request to get page data failed");
        });
};

addrApp.loadTemplate = function() {
    console.log('TODO: implement loadTemplate()');
};

addrApp.showDetails = function(id) {
    // body...
    console.log("Inside show details.");
};

addrApp.newUser = function() {

    data = {
        "username": $("#username").val(),
        "password": $("#password").val(),
        "email": $("#email").val()
    };

    $.post(addrApp.config.apiUrl + addrApp.config.apiRoutes.newUser, function(data, return_data) {
        var status = JSON.parse(return_data);
        if (status.data === true) {
            $("#content").html("Registration successfull!");
        } else {
            $("#content").html("Registration failed!");
        }
    });
};
