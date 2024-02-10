var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
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
          $('#fasting').append("Austin & Kimberly are participating in the <strong>"
            + fast + "</strong> right now, " + fastDetails + "</em>.");
        } else {
          $('#fasting').append("Anything they want! Today's a non-fasting day.");
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
    fastDetails = "no red & white meat</em>. Since it's only a <strong>Meat Fast</strong>, <em>fish, dairy, and alcohol are fine";
  } else {
    fast = apiDay.fast_level_desc;
  }

  <!-- main fast details -->
  if (fast != "week of Cheesefare" &&
      (fast == "Lenten Fast" || fast == "Nativity Fast" || apiDay.fast_level_desc == "Fast")) {
    fastDetails = "which means <em>no meat, no dairy, and no alcohol</em>";
  }

  <!-- exceptions -->
  switch (apiDay.fast_exception) {
    case 2:
        fastDetails = "but today is a <strong>Fish Day</strong>, so only <em>red & white meat and dairy are off-limits</em>";
        break;
    case 7:
        fastDetails = "but today is only a <strong>Meat Fast</strong>, so <em>only red & white meats are off-limits</em>";
        break;

  }
};

/**
 * Special thanks to
 * https://orthocal.info/api
 */
