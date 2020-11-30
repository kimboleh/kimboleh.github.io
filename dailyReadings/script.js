var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var date = year + "-" + month + "-" + day;

var readings = "";
var color = "";
var title = "";

$(document).ready(function () {
  $.fn.getReadings(date);
});

/* gets reading from a given date */
jQuery.fn.getReadings = function (data) {

  $.getJSON("https://www.ewtn.com/se/readings/readingsservice.svc/day/" + data,
    function (json_data) {
      readings = json_data.ReadingGroups[0].Readings;
      color = json_data.Color;
      title = json_data.Title;

      for (reading of readings) {
        $('#readings').append("<h2>" + reading.Type + "</h2>" + "<hr/>");
        $('#readings').append("<h3>" + reading.Citations[0].Reference + "</h3>");
        $('#readings').append("<p id='" + reading.Type.split(" ").join("") + "'></p>");
        $.fn.getScripture(reading);
      }

      $('#dateTitle').empty();
      $('#dateTitle').append(title);
      $('#title').css("color", color);
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
        console.log(resp.text);
      },
      error: function() {}
    });

  };
