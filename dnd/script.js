var name = "Bob";
var level = 1;
var charClass = "Wizard";
var spells = [];
var weapons = [];

$(document).ready(function () {
  $.fn.getClasses();

  $('#name-input').change(function() {
    name = $('#name-input').val();
    $('#charName').append(name);
    event.preventDefault();
  });

  $("#char-level").change(function() {
    level = $("#char-level").val();
    $('#charLvl').append(level);
    event.preventDefault();
  });

  $("#getCharClass").change(function() {
    charClass = $("#getCharClass input[type='radio']:checked").val();
    $('#charClass').append(charClass);
    $.fn.getSpells();
    event.preventDefault();
  });

  $('#submitAll').click(function() {
    $('input[type=checkbox]:checked').each(function () {
      for(spell of spells) {
        if (JSON.parse(spell).index == this.value) {
          $('#charSpells').append(JSON.parse(spell).name + "<br>" + JSON.parse(spell).desc + "<br>");
        }
        // console.log(JSON.parse(spell).desc);
      }
    });

    $('#onboarding-content').css("display", "none");
    $('#characterContent').css("display", "grid");
  });

});

/* may not need this as a function? could call auto */
jQuery.fn.getClasses = function () {
  $.getJSON("https://www.dnd5eapi.co/api/classes/", function (json_data) {
    var results = json_data.results;
    for (var i of results) {
      $("#getCharClass").append(
        "<div class='classCheckbox'> <input type='radio' id=" +
          i.name +
          " name=radioClass" +
          " value=" +
          i.name +
          "> <label for=" +
          i.name +
          ">" +
          i.name +
          "</label></div>"
      );
    }
    // $("#getCharClass").append("<button type='submit'>Submit</button>");
  });
};

jQuery.fn.getSpells = function () {
  // set level GET parameter
  var lvlParam = "";
  for (i = 1; i <= level; i++) {
    if(i == 1) { lvlParam += "1"; } else { lvlParam += "," + i; }
  }

  $('#getSpells').empty();

  $.ajax({
      type: 'GET',
      url: "https://www.dnd5eapi.co/api/spells?level=" + lvlParam,
      success: function(resp) {
        for (spell of resp.results) {
          $.fn.getClassSpells(spell);
        }
      },
      error: function() {}
    });
  };

jQuery.fn.getClassSpells = function (data) {
    $.ajax({
        type: 'GET',
        url: "https://www.dnd5eapi.co" + data.url,
        success: function(resp) {
          console.log("resp: " + resp);
          for (_class of resp.classes) {
            if (_class.name == charClass) {
              spells.push(JSON.stringify(resp));
              $('#getSpells').append(
                '<li><input type="checkbox" id=' +
                  data.name + ' name=' + data.name + ' value=' +
                  data.index + ' /> <label for=' + data.name + '>' + data.name +
                  '</label></li>'
              );
            }
          }
        },
        error: function() {}
      });
  };
