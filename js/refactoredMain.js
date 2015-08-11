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
  $('#answers').append("<h3 class = 'answers'>" + this.name +"</h3>");
  for (var i = 0; i < this.library.length; i++) {
    $('#answers')
      .append('<div><li><span id="sib">Title: ' + this.library[i].title + "        "  + '</span><button class="delete-click">x</button></li><br><li>Genre: ' + this.library[i].genre + '</li></div>')
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

//adding library form to html
var libraryForm = '<div class = "container"><div id="lib-div"><form name = "allLibraries">Game Library: <br><input type="text" name="libtitle" id="libtitle"><br><br><input type="submit" value="Create Library" class="submit" id= "new-library-submit"><br><br><select id ="lib"><option value ="">Create a library</option></select></form><br></div><div id="answers"><ul id="games"> </ul></div></div>';

//adding game form to html
var gameForm = '<div class = "container"><div id="game-div"><form>Game Title: <br><input type="text" name="game-title" id="title"><br>Game Genre: <br><input type="text" name="game-genre" id="genre"><br><br><input type="submit" value="Add Game" class="submit" id= "new-game"></form><br><button id ="reset">Reset</button></div></div></div>';

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

//DOM
$(document).on('ready', function() {
  var libraries = [];
  $('body').append(libraryForm);
  $('body').append(gameForm);

  //position divs
  $('#lib-div').css({"position":"block", "float": "left", 'padding-left': '50px'});
  $('#game-div').css({"position":"absolute","top":"230px", 'clear': 'both', 'float':'left', 'padding-left': '50px'});
  $('#answers').css({"position":"block","float":"left", 'padding-left':'50px',});

  //create new libary
  $('#new-library-submit').on("click", function(e){
    e.preventDefault();
    var libr = $('#libtitle').val();
    libr = new Library(libr);
    libraries.push(libr);
    newDropdownOption(libraries);
    });

  //create new game
  $('#new-game').on("click", function(e){
    e.preventDefault();
    $('#answers').html('');
    //get name from dropdown menu
    var libName = $("#lib option:selected").val();
    var useLibrary;
    //connect name with library object in array
    for (var i = 0; i < libraries.length; i++) {
      if(libName === libraries[i].name){
        useLibrary = libraries[i];
     }
    }
    //creates new game, pushes to library, appends to DOM
    var newGame = new Game($("#title").val(), $('#genre').val());
    useLibrary.addGame(newGame);
    for (var l = 0; l < libraries.length; l++) {
      libraries[l].render();
    }
  });

  //resets all libraries and clears DOM
  $('#reset').on("click", function(e){
    e.preventDefault();
    $('#answers').html('');
    $('#lib').html("");
    libraries = [];
  });


  $(document).on("click", '.delete-click', function(){
    var index = $(this).prev().html().split(':').splice(1, 1);
    var trimTitle = index[0].trim();
    var gameDelete;
    var indexD;
    var libraryD;
    for (var i = 0; i < libraries.length ; i++) {
      for (var j = 0; j <libraries[i].library.length; j++) {
        if (trimTitle === libraries[i].library[j].title){
          gameDelete = libraries[i].library[j];
          libraryD = libraries[i];
          indexD = libraryD.library.indexOf(gameDelete);
          libraryD.library.splice(indexD, 1);
      }
    }
  }
    $(this).closest('div').remove();
    $('#answers').html('');
    for (var l = 0; l < libraries.length; l++) {
    libraries[l].render();
    }
});


}); //end of document
