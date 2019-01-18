$(document).ready(function() {

  let $url = "https://pokeapi.co/api/v2/";

  $("#submitPoke").click(function() {
    var newUrl;
    let evoname;
    let $input = $("#input").val();

    $.ajax({
      method: "GET",
      url: ($url + "pokemon/" + $input + "/"),
      dataType: "json"
    }).done(function(data) {
      $("#movelist").empty();
      console.log(data);
      $("#name").html(
        '<p>' + data.name + '</p>');
      $("#id").html('<p> ' + data.id + '</p>');
      $("#pic").html('<img src="' + data.sprites.front_default + ' "width=250px" "heigth=250px">');
      if (data.moves.length >= 4) {
        for (var i = 0; i < 4; i++) {
          $("#movelist").append('<li>' + data.moves[i].move.name + '</li>');
        }
      } else {
        for (var i = 0; i < data.moves.length; i++) {
          $("#movelist").append('<li>' + data.moves[i].move.name + '</li>');
        }
      }

    });

    $.ajax({
      method: "GET",
      url: ($url + "pokemon-species/" + $input + "/"),
      dataType: "json"
    }).done(function(data1) {
      $("#evo-pic").empty();
      $("#evo-name").empty();
      if (data1.evolves_from_species != null) {
        console.log(data1);
        evoname = data1.evolves_from_species.name;
        newUrl = $url + "pokemon/" + data1.evolves_from_species.name + "/";
        $("#evo-name").html('<p>' + data1.evolves_from_species.name + '</p>');
        $("#evo-pic").html("<p>hi</p>"); //'<img src"' + data.sprites.front_default + '"width="300" heigth="400">'

        $.ajax({
          method: "GET",
          url: (newUrl),
          dataType: "json"
        }).done(function(x) {
          console.log(newUrl);
          console.log(x);
          $("#evo-pic").html('<img src="' + x.sprites.front_default + ' "width=200px" "heigth=200px">');
        });
      }

    });

  });
});
