// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQONUfU3Vh8EoKaNUZxgYzExY6BWFaG4U",
    authDomain: "trains-db.firebaseapp.com",
    databaseURL: "https://trains-db.firebaseio.com",
    projectId: "trains-db",
    storageBucket: "",
    messagingSenderId: "652058643727"
};
firebase.initializeApp(config);

var database = firebase.database();

//add train button
$("#add-train-btn").on("click",function (event) {
    event.preventDefault();

    //grab users input
    var trainNam = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var startTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    var freq = $("#freq-input").val().trim();

    console.log(trainNam);
    console.log(dest);
    console.log(startTime);
    console.log(freq);

    //push input to firebase database
    database.ref().push({
        name: trainNam,
        dest: dest,
        start: startTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //alert that a new train has been added
    alert("Train successfully added");


    //clear out the fields
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

});
