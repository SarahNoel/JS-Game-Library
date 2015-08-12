//create new Library
var Library = function(name){
  this.name = name;
  this.library = [];
};

//add game to library
Library.prototype.addGame = function(game) {
  if($("#title").val() === ""){
    alert("Please enter the game title.");
    return null;
  }
  this.library.push(game);
};

//put game library on DOM
Library.prototype.render = function(library){
  $('#answers').append("<h3>" + this.name +"</h3>");
  for (var i = 0; i < this.library.length; i++) {
    $('#answers')
      .append('<div><li><span id="sib">Title: ' + this.library[i].title + "        "  + '</span><button class="delete-click">x</button></li><li>Genre: ' + this.library[i].genre + '</li></div>')
      .append('<br>');
  }
  $('input').not('.submit').val('');
};

//create new game
var Game = function (title, genre) {
  this.title = title;
  this.genre = genre;
};

Game.prototype.deleteGame = function(libraryDelete){
  index = libraryDelete.library.indexOf(this);
  libraryDelete.library.splice(index, 1);
};

//makes new library a dropdown option
function newDropdownOption (array){
  $('#lib').html("");
  var option = '';
  for (var i = 0; i < array.length; i++){
     option += '<option value="'+ array[i].name + '">' + array[i].name + '</option>';
  }
  $('#lib').append(option);
  $('#libtitle').val('');
}

