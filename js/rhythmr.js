  // With help from:
  //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioContext-section
  //http://www.html5rocks.com/en/tutorials/webaudio/intro/
  //http://www.html5rocks.com/en/tutorials/audio/scheduling/
  //http://www.youtube.com/watch?v=1wYTkZVQKzs
  //http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_8

(function() {
  // set up Web Audio API AudioContext
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  var kick;
  //var osc; // user's tap sound
  var tempo = 120;
  var quarterNoteTime = (60 / tempo);
  var startTime;
  var tapDown, tapUp; // track timing of tap
  // help us prevent auto-repeat when key is held down
  var keyAllowed = true; 

  // absolute timing of first tap of spacebar
  var firstTap;
  var tapCount = 0; // track # of times user taps spacebar

  var SPACEBAR = 32; // character code
  var ENTER_KEY = 13; // character code
  var DECIMAL_PLACES = 2; // how tightly we'll track timing
  // amount of time before and after the precise timing we'll allow
  var GRACE_TAP_TIME = 0.13;
  var GRACE_DURATION_TIME = 0.33;

  /*
   * Load kick drum
   *
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

  /*
   * EVENT LISTENERS
   */

  // load a new measure
  $('#next').click(function() {
    location.reload();
  });

  // prevent repeated ENTER presses from triggering multiple beat-plays
  //help from:
  //http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript 

  /*
   * User starts a tap
   */
  $(window).keydown(function(event) {
    if (event.which == SPACEBAR) {
      event.preventDefault(); // disable scrolling
    };
    if (event.which == SPACEBAR && keyAllowed) {
      tapDown = getCurrentTime();

      //console.log('abs tapDown: ' + tapDown);
      //console.log('starttime spacebar: ' + startTime);
      console.log(' tapped: ' + 
        (tapDown - startTime).toFixed(DECIMAL_PLACES));
      keyAllowed = false;
    };
  });

  /*
   * User ends a tap
   */
  $(window).keyup(function(event) {
    if (event.which == SPACEBAR) {
      //console.log('tapCount: ' + tapCount);
      //console.log(' startTime: ' + startTime);
      //console.log(' tapdown: ' + tapDown);
      //console.log(' tapdown - startTime: ' + (tapDown - startTime));
      tapUp = getCurrentTime();
      var duration = (tapUp - tapDown).toFixed(DECIMAL_PLACES);
      //console.log(' tapup: ' + tapUp);
      if (tapDownIsCorrect(tapDown - startTime) &&
          tapDurationIsCorrect(duration)) {
        //$('#correct').show(200, function() {
          //$(this).hide();
        //});

        $('#tap-result').append('Yep ');
        //console.log('good');
        //console.log(' expected: ' + measure.tapTimings[tapCount]);
      } else if (tapDownIsCorrect(tapDown - startTime)) {
        $('#tap-result').append('Nope <small>(duration off)</small> ');
        //$('#incorrect').show(100).hide();
      } else {
        $('#tap-result').append('Nope ');
        //console.log('bad');
      };
      //console.log('tapUp: ' + tapUp);
      keyAllowed = true;
      tapCount++; // increment tap count
      //console.log(' tap duration: ' + 
        //((tapUp - tapDown).toFixed(DECIMAL_PLACES)));
    };
  });

  /*
   * User presses ENTER, starts the beat
   *
   */
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
        //$('#notation').css('opacity', '0.0'); // make staff disappear ...
        //$('#notation').fadeTo((measure.COUNT_IN * measure.QUARTER) * 1000, 1.0); // ... then fade in during count-in
        $('#tap-result').html(''); // reset feedback zone
        console.log('starttime: ' + startTime);
        for (var i = 0;  // seems to be more reliable with slight delay
          i < measure.COUNT_IN + measure.BEATS_IN_MEASURE; 
          i++) {
          // schedule the kick drum hits
          playSound(kick, 0.01 + context.currentTime + (quarterNoteTime * i));
          // triggering of first beat more reliable with slight delay
        };

        countIn();

        // allow ENTER to start the beat again after beat has played
        (function(){
          window.setTimeout(function() {
            beatAllowed = true; 
          }, quarterNoteTime * 
            (measure.COUNT_IN + measure.BEATS_IN_MEASURE) * 1000);
        })();
  
        //(function(){
          //window.setTimeout(function() {
            //$('#notation').css('opacity', '1.0')
          //}, quarterNoteTime * measure.COUNT_IN * 1000);
        //})();
      };
    };
  });
  
  /*
   * FUNCTIONS
   *
   */
  function getCurrentTime() {
    return context.currentTime;
  }

  function tapDurationIsCorrect(duration) {
    // calculate difference between expected duration and user's duration
    var durationDiff = Math.abs(measure.tapDurations[tapCount] -
      duration).toFixed(DECIMAL_PLACES);
    //console.log(' durationDiff: ' + durationDiff);    
    
    // anything smaller than a quarter note will pass for an eighth
    if (durationDiff <= GRACE_DURATION_TIME) {
      //console.log('  duration: good');
      //console.log('  durationDiff: ' + durationDiff);
      //console.log('  duration: ' + duration);
      //console.log('  expected: ' + measure.tapDurations[tapCount]);
      return true;
    } else {
      //console.log('  duration: bad');
      //console.log('  durationDiff: ' + durationDiff);
      //console.log('  duration: ' + duration);
      //console.log('  expected: ' + measure.tapDurations[tapCount]);
      return false;
    };
  };

  function countIn() {
    // fade out staff during count-in
    $('canvas').css('opacity', '0.2');

    // fade it back in
    window.setTimeout(function() {
      $('canvas').css('opacity', '1.0')
    }, quarterNoteTime * measure.COUNT_IN * 1000);

    // show count-in
    var count = 1;
    $('#count-in').html(count).show();
    var countInterval = window.setInterval(function() {
      count++;
      $('#count-in').html(count);
    }, 500);

    // clear the interval after count-in
    window.setTimeout(function() {
      window.clearInterval(countInterval);
      $('#count-in').hide();
    }, quarterNoteTime * measure.COUNT_IN * 1000);
    
    // fade in staff
    //window.setTimeout(function() {
      //$('canvas').fadeTo(50, 1.0);
    //}, quarterNoteTime * measure.COUNT_IN);

  };

  function tapDownIsCorrect(timing) {
    //console.log('  inside tapDownIsCorrect; timing: ' + timing);
    //console.log('  compare to: ' + measure.tapTimings[tapCount]);
    var timingDiff = Math.abs(measure.tapTimings[tapCount] -
      timing).toFixed(DECIMAL_PLACES);
    if (timingDiff <= GRACE_TAP_TIME ) {
      return true;
    };
    
    return false;
    //console.log('diff: ' + 
      //Math.abs(measure.tapTimings[tapCount] - 
      //timing).toFixed(DECIMAL_PLACES));
  };
  
  function playSound(buffer, time) {
    // the 4 lines of code needed to play a kick
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
  };

})(); // end rhythmr
