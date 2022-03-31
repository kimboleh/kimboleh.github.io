var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var numericalDay = today.getDate();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"];
var dateString = months[month] + " " + numericalDay + ", " + year;

var apiDay = "";
var fast = "";
var fastDetails = "";

$(document).ready(function () {
  $.fn.getFastDetails();
});

/* gets fasting details from the current date */
jQuery.fn.getFastDetails = function () {
  $.ajax({
      type: 'GET',
      url: "https://orthocal.info/api/oca/",
      success: function(resp) {
        console.log(resp);
        apiDay = resp;
        $('#title').append(resp.titles[0].toLowerCase());
        $('#fasting').append("<h1>What Can Austin & Kimberly Eat Today?</h1>");
        $('#dateText').append(dateString);
        $('#sidebar').append("<br><br><br><br>Coming soon: date picker!");

        if (resp.fast_level !== 0) {
          setFastDetails(resp, resp.fast_exception);
          $('#fasting').append("Kimberly & Austin are participating in the <strong>"
            + fast + "</strong> right now, which means <em>" + fastDetails + "</em>.");
        }
      },
      error: function() {}
    });
};

function setFastDetails() {
  if (apiDay.fast_level_desc == "Fast" && (apiDay.weekday == 5 || apiDay.weekday == 3)) {
    fast = "regular Wednesday & Friday fasting";
  } else if (apiDay.titles[0].includes("Cheesefare")) {
    fast = "week of Cheesefare";
    fastDetails = "no meat</em>. Since it's only a <strong>Meat Fast</strong>, <em>fish, dairy, and alcohol are allowed";
  } else {
    fast = apiDay.fast_level_desc;
  }

  if (fast != "week of Cheesefare" &&
      (fast == "Lenten Fast" || apiDay.fast_level_desc == "Fast")) {
    fastDetails = "no meat, no dairy, and no alcohol";
    switch (apiDay.fast_exception) {
      case 2:
          fastDetails += "</em>. However, today is a <strong>Fish Day</strong>, so both <em>fish and alcohol are allowed";
          break;
      case 7:
          fastDetails += "</em>. However, today is only a <strong>Meat Fast</strong>, so <em>fish, dairy, and alcohol are allowed";
          break;

    }
  }
};
