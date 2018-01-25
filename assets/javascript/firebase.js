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
    var startTime = moment($("#time-input").val().trim(), "HH:mm").format("h:mm a");
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

//getting the data already stored in firebase
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    //create variables and assign the values from the database
    var trainNam = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var starTime = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;


    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(starTime, "hh:mm").subtract(1, "years");
    console.log(startTimeConverted);

    // Current Time
    var currTime = moment();
    console.log("CURRENT TIME: " + moment(currTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % freq;
    console.log(timeRemainder);

    // Minute Until Train
    var minTillTrain = freq - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minTillTrain);

    // Next Train
    var nextTrain = moment().add(minTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainNam + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + minTillTrain + "</td><td><button type='button' class='btn btn-link' id='remove' value='"+ trainNam + "'>Remove</button></td></tr>");

    $(document).ready(function () {

        $(".btn").on("click", function (event) {
            var data = $(this).val().trim();
            alert(data);
            var test = childSnapshot;
            console.log(test);

        });

    });
});

// $(document).ready(function () {

//     $(".btn").on("click",function (event) {
//         var data = $(this).val().trim();
//         alert(data);
//     });

// });

