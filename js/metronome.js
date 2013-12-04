  // With help from:
  //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioContext-section
  //http://www.html5rocks.com/en/tutorials/webaudio/intro/
  //http://www.youtube.com/watch?v=1wYTkZVQKzs
  //http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_8

(function() {
  var context = new webkitAudioContext();
  var kick;
  var tempo = 120;
  var quarterNoteTime = (60 / tempo);
  var startTime;
  var tapDown, tapUp; // track timing of tap
  // helps prevent recording auto-repeat when key is held down
  var keyAllowed = true; 

  // amount of time before and after the precise timing we'll allow
  var graceInterval = 0.1;

  // absolute timing of first tap of spacebar
  var firstTap;
  var tapCount = 0; // track # of times user taps spacebar

  var SPACEBAR = 32; // character code
  var ENTER_KEY = 13; // character code
  var DECIMAL_PLACES = 2; // how tightly we'll track timing
  
  function getCurrentTime() {
    return context.currentTime;
  }

  /*
   *LOAD KICK
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
      kick = buffer;
    });
  };
  request.send();

  $('#next').click(function() {
    location.reload();
  });

  // prevent repeated ENTER presses from triggering multiple beat-plays
  //help from:
  //http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript 

  $(window).keydown(function(event) {
    if (event.which != ENTER_KEY) {
      event.preventDefault(); // disable scrolling
    };
    if (event.which == SPACEBAR && keyAllowed) {
      tapDown = getCurrentTime();
      if (tapDownIsCorrect(tapDown - startTime)) {
        console.log(' expected: ' + measure.tapTimings[tapCount]);
      };
      tapCount++; // increment tap count
      //console.log('abs tapDown: ' + tapDown);
      //console.log('starttime spacebar: ' + startTime);
      console.log(' tapped: ' + 
        (tapDown - startTime).toFixed(DECIMAL_PLACES));
      keyAllowed = false;
    };
  });

  function tapDownIsCorrect(timing) {
    console.log('diff: ' + 
      Math.abs(measure.tapTimings[tapCount] - 
      timing).toFixed(DECIMAL_PLACES));
    return true;
  }
  
  $(window).keyup(function(event) {
    if (event.which == SPACEBAR) {
      tapUp = getCurrentTime();
      //console.log('tapUp: ' + tapUp);
      keyAllowed = true;
      console.log(' tap duration: ' + 
        (tapUp - tapDown).toFixed(DECIMAL_PLACES));
    };
  });

  var beatAllowed = true;
  $(document).keypress(function(event) {
    if (!beatAllowed) {
      return; 
    } else {
      if (event.which == ENTER_KEY) {
        // prevent more than one beat from playing at a time
        beatAllowed = false; 
        tapCount = 0; // reset tapCount
        startTime = context.currentTime;
        console.log('starttime: ' + startTime);
        for (var i = 0; i < 8; i++) {
          playSound(kick, context.currentTime + (quarterNoteTime * i));
        };

        // allow ENTER to start the beat again
        (function(){
          window.setTimeout(function() {
            beatAllowed = true; 
          }, 4000);
        })();
      };
    };
  });


  function playSound(buffer, time) {
    // the 4 lines of code needed to play a kick
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
  }

  function onKeyDown() {
    //NOTE: we need all 4 lines of code each time we want to play a kick

    // initialize a new kick
    var source = context.createBufferSource();
    //attach audio data to playSound as its buffer
    source.buffer = kick;
    //link source to destination, which is our output
    source.connect(context.destination);
    //play kick
    source.start(0);
  }

})();
