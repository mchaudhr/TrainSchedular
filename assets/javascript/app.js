var config = {
  apiKey: "AIzaSyC-bgd7eBsDk8xcMuqWOa3tMGgLt7yFQt0",
  authDomain: "clicking-project.firebaseapp.com",
  databaseURL: "https://clicking-project.firebaseio.com",
  projectId: "clicking-project",
  storageBucket: "clicking-project.appspot.com",
  messagingSenderId: "251779705795"
};

firebase.initializeApp(config);

var database = firebase.database();
var remainder = 0;
// var momentTime = moment(localTime, "hh:mm a").format("X");

var name = "";
var destination = "";
var time = 0;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

// take your initial time, take your current time, find difference in minutes, divide(%) minutes by freq, take remainder and thats your time remaining 
// % 

$("#add-user").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name        = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time        = moment($("#time-input").val().trim(), "HH:mm").format("X");
  frequency   = parseInt($("#frequency-input").val().trim());
  

  // Code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  });

});

database.ref().on("child_added", function(childSnapshot) {

	    time        = childSnapshot.val().time;
      frequency   = childSnapshot.val().frequency + 000;
      newTime = moment(moment.unix(time).add(frequency, "m")).format("X");

    // take your initial time, take your current time, find difference in minutes, divide(%) minutes 
    // by freq, take remainder and thats your time remaining 


      // newTime = time

      nextArrival = moment.unix(time).format("hh:mm A");
      minutesAway = moment.unix(time).diff(moment(), "minutes");
      remainder   = minutesAway % frequency;


      if (remainder < 0) {

        nextArrival = moment.unix(newTime).format("hh:mm A");
        minutesAway = moment.unix(newTime).diff(moment(), "minutes");

      }


    // minutesAway = moment.unix(moment.unix(time).add(frequency, "m").format("X")).diff(moment(), "minutes")
    // moment.unix(time).diff(moment(), "minutes")
      

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);

      $("#display").append("<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + nextArrival +
        "</td><td>" + minutesAway + " min" +"</td></tr>");

      $("#name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    // nextArrival = parseInt(moment().diff(moment.unix(time), "hh:mm"));
    // minutesAway = moment().endOf('day').fromNow("time");

// moment(moment.unix(time).diff(moment())).format("mm")

      // console.log(moment(time).diff(moment(momentTime), "days"));
