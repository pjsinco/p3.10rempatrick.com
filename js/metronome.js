(function() {

  //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioContext-section
  //http://www.html5rocks.com/en/tutorials/webaudio/intro/
  //http://www.youtube.com/watch?v=1wYTkZVQKzs
  //http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_8
  
  var context = new webkitAudioContext();
  var sound;
  var tempo = 80;
  var eighthNoteTime = (60 / tempo) / 2;

  /*
   *LOAD SOUND
   */
  var request = new XMLHttpRequest();
  request.open('get', 'sounds/kick.wav', true);
  request.responseType = 'arraybuffer'; //get raw binary data, not text
  //set up what we do with onload once it's finished loading
  request.onload = function() {
    //pass decoder response from request; 
    //for the callback, pass in buffer, which is what has just loaded
    //(is buffer what is returned from decodeAudioData()?)
    context.decodeAudioData(request.response, function(buffer) {
      //decode audio and store in a variable so we can refer back to it
      sound = buffer;
    });
  };
  request.send();

  /*
   *ADD EVENT LISTENER
   */
  //$(window).keydown(onKeyDown);
  $(window).keydown(function() {
      //playSound(sound, 0)
      for (var bar = 0; bar < 2; bar++) {
        var time = context.currentTime + bar * 8 * eighthNoteTime;
        playSound(sound, time);
        playSound(sound, time + 4 * eighthNoteTime);
      }
    }
  );

  function playTwoBars() {
  }

  function playSound(buffer, time) {
    // the 4 lines of code needed to play a sound
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
  }
  
  

  function onKeyDown() {
    //NOTE: we need all 4 lines of code each time we want to play a sound

    // initialize a new sound
    var source = context.createBufferSource();
    //attach audio data to playSound as its buffer
    source.buffer = sound;
    //link source to destination, which is our output
    source.connect(context.destination);
    //play sound
    source.start(0);

  }

  

})();
