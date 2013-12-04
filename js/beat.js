function Beat() {

  // With help from:
  //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioContext-section
  //http://www.html5rocks.com/en/tutorials/webaudio/intro/
  //http://www.youtube.com/watch?v=1wYTkZVQKzs
  //http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_8

  this.context = new webkitAudioContext();
  this.kick;

  /*
   *LOAD SOUND
   */
  this.loadSound = function(filename) {
    $(document).ready(function() {
      var sound;
      var request = new XMLHttpRequest();
      request.open('get', 'sounds/' + filename, true);
      request.responseType = 'arraybuffer'; //get raw binary data, not text
      //set up what we do with onload once it's finished loading
      request.onload = function() {
        //pass decoder response from request; 
        //for the callback, pass in buffer, which is what has just loaded
        //(is buffer what is returned from decodeAudioData()?)
        this.context.decodeAudioData(request.response, function(buffer) {
          //decode audio and store in a variable so we can refer back to it
          sound = buffer;
        });
      };
      request.send();
      return sound;
    });
  };
  
  this.kick = this.loadSound('kick.wav');
  this.tempo = 120;
  this.quarterNoteTime = (60 / this.tempo);

  // prevent repeated ENTER presses from triggering multiple beat-plays
  //help from:
  //http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript 
  this.allowed = true;

  // amount of time before and after teh precise timing we'll allow
  this.graceInterval = 0.1;

  // absolute timing of first tap of spacebar
  this.firstTap;

  this.SPACEBAR = 32; // character code
  this.ENTER_KEY = 13; // character code
  
  this.getCurrentTime = function() {
    return this.context.currentTime;
  }


  
  $(window).keypress(function(event) {
    if (event.which == 32) {
      event.preventDefault(); // disable scrolling
      tapped = getCurrentTime();
      console.log('tapped: ' + tapped);
    };
  });

  $(document).keypress(function(event) {
    if (!allowed) {
      return;
    } else {
      if (event.which == 13) {
        allowed = false;
        startTime = context.currentTime;
        for (var i = 0; i < 8; i++) {
          playSound(kick, context.currentTime + (quarterNoteTime * i));
        };
      };
    };
  });


  //$(window).keydown(function() {
  $('#4beats').click(function() {
    startTime = context.currentTime;
    for (var i = 0; i < 4; i++) {
      playSound(kick, context.currentTime + (quarterNoteTime * i));
      console.log(context.currentTime + (quarterNoteTime * i));
    }
  });

  $('#8beats').click(function() {
    startTime = context.currentTime;
    for (var i = 0; i < 8; i++) {
      playSound(kick, context.currentTime + (quarterNoteTime * i));
      console.log(context.currentTime + (quarterNoteTime * i));
    }
  });


  $('#16beats').click(function() {
    startTime = context.currentTime;
    for (var i = 0; i < 16; i++) {
      playSound(kick, context.currentTime + (quarterNoteTime * i));
      console.log(context.currentTime + (quarterNoteTime * i));
    }
  });

  //$(window).keyup(function() {
    //allowed = true;
  //});

  /*
   *ADD EVENT LISTENER
   */
  //$(window).keydown(function() {
  //    //console.log(event.timeStamp);
  //    for (var i = 0; i < 4; i++) {
  //      playSound(kick, context.currentTime + (quarterNoteTime * i));
  //      console.log(context.currentTime + (quarterNoteTime * i));
  //    }
  //});

      //playSound(kick, 0)

      //for (var bar = 0; bar < 2; bar++) {
      //  var time = context.currentTime + bar * 8 * eighthNoteTime;
      //  playSound(kick, time);
      //  playSound(kick, time + 4 * eighthNoteTime);
      //}
  //});

  function playTenPerSecond() {
    var time = 0;
    for (var i = 0; i < 10; i += 0.1) {
      playSound(kick, time + i);
    }    
  }

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

  

};
