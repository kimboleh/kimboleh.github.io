var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"];
var date = year + "-" + month + "-" + day;

var readings = "";
var color = "";
var title = "";

$(document).ready(function () {
  $.fn.getReadings(date);
});

/* gets reading from a given date */
/* uses the Bootstrap Javascript library for reading icons */
/* I'm also trying to use their tooltips functionality, but it's... bugging out. */
jQuery.fn.getReadings = function (data) {
  $.ajax({
      type: 'GET',
      url: "https://www.ewtn.com/se/readings/readingsservice.svc/day/" + data + "/",
      success: function(resp) {
        readings = resp.ReadingGroups[0].Readings;
        color = resp.Color;
        title =resp.Title;

        for (reading of readings) {
          if (reading.Type == "Gospel") {
            $('#readings').append("<h2>" + "<span class='glyphicon glyphicon-certificate' aria-hidden='true'></span> "
              + reading.Type + "</h2>" + "<hr/>");
          } else if (reading.Type == "Psalm") {
            $('#readings').append("<h2>" + "<span class='glyphicon glyphicon-music' aria-hidden='true'></span> "
              + reading.Type + "</h2>" + "<hr/>");
          } else {
            $('#readings').append("<h2>" + "<span class='glyphicon glyphicon-book' aria-hidden='true'></span> "
              + reading.Type + "</h2>" + "<hr/>");
          }

          $('#readings').append("<h3>" + reading.Citations[0].Reference + "</h3>");
          $('#readings').append("<p id='" + reading.Type.split(" ").join("") + "'></p>");
          $.fn.getScripture(reading);
        }

        $('#dateText').empty();
        $('#dateText').append("<h2>" + days[today.getDay()] + ", "
          + months[today.getMonth()] + " " + today.getDate() + "</h2>");
        $('#dateTitle').empty();
        $('#dateTitle').append('<h2 data-toggle="tooltip" style="z-index:1000; position:relative" title="testing">' + title + '</h2>');
        $('#title').css("color", color);

        $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
      },
      error: function() {}
    });
};

/* pulls the actual Scripture via Ajax call */
/* (this is what's updated if the API used changes) */
jQuery.fn.getScripture = function (reading) {
  var passages = reading.Citations[0].Reference.split(" ").join("");
  passages = passages.split(";").join(",");

  var text = "";

  $.ajax({
      type: 'GET',
      url: "https://bible-api.com/" + passages,
      success: function(resp) {
        $('#' + reading.Type.split(" ").join("")).append(resp.text);
      },
      error: function() {}
    });

  };

/* big thanks to:
 * https://bible-api.com/
 * EWTN
 */
