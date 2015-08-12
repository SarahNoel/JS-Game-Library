$(document).on('ready', function() {
  var libraries = [];

  //create new libary
  $('#new-library-submit').on("click", function(e){
    e.preventDefault();
    var libr = $('#libtitle').val();
    for (var i = 0; i <= libraries.length; i++) {
      if(libraries.length === 0 || libraries[i].name != libr){
        libr = new Library(libr);
        libraries.push(libr);
        newDropdownOption(libraries);
        clearPrintLibraries(libraries);
        console.log(libraries[i].name, libr);
        return libraries;
      }else{
        $('#libtitle').val("");
        alert("Sorry, that library name already exists.  Please choose a unique library name.");

      }
    }
  });

  //create new game
  $('#new-game').on("click", function(e){
    e.preventDefault();
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
    clearPrintLibraries(libraries);
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
    clearPrintLibraries(libraries);
});


}); //end of document
