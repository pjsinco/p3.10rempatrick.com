/*
 * With help from:
 * https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioContext-section
 * http://www.html5rocks.com/en/tutorials/webaudio/intro/
 * http://www.html5rocks.com/en/tutorials/audio/scheduling/
 * http://www.youtube.com/watch?v=1wYTkZVQKzs
 * http://chimera.labs.oreilly.com/books/1234000001552/ch01.html#s01_8
 *
 */

(function() {
  /*
   * Set up the measure
   *
   */
  var measure = new Measure();
  measure.fill();
  measure.render();

  /*
   * Set up Web Audio API AudioContext
   *
   */
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  var kick;
  var tempo = 120;
  var quarterNoteTime = (60 / tempo); // each quarter note gets 0.5 sec
  var startTime;
  var tapDown, tapUp; // track timing of a tap

  // help prevent auto-repeat when key is held down
  var keyAllowed = true; 

  // absolute timing of first tap of spacebar
  var firstTap;

  // track # of times user taps spacebar
  var tapCount = 0; 

  // track user's success
  var successfulPerformance = true;


  /*
   * Set up our constants
   *
   */
  var SPACEBAR = 32; // character code
  var ENTER_KEY = 13; // character code
  var DECIMAL_PLACES = 2; // how tightly we'll track timing

  // amount of time before and after the precise timing we'll allow
  var GRACE_TAP_TIME = 0.12;
  var GRACE_DURATION_TIME = 0.33;

  /*
   * Load kick drum
   *
   */
  var request = new XMLHttpRequest();
  request.open('get', 'sounds/kick.wav', true);
  request.responseType = 'arraybuffer'; //get raw binary data, not text

  // set up what we do with onload once it's finished loading
  request.onload = function() {
    // for the callback, pass in buffer, which is what has just loaded
    context.decodeAudioData(request.response, function(buffer) {
      //decode audio and store in a variable so we can refer back to it
      kick = buffer;
    });
  };
  request.send();

  /*
   * FUNCTIONS
   *
   */

  /*
   * Plays four-on-the-floor to accompany user
   *
   */
  function playBeat() {
    // resets
    $('#performance-result').css('opacity', '0.0');
    $('.options').css('opacity', '0.0');
    $('#tap-result').html(''); 
    beatAllowed = false; 
    successfulPerformance = true; 
    tapCount = 0; // reset tapCount
    startTime = context.currentTime;

    // schedule the beats
    for (var i = 0;  
      i < measure.COUNT_IN + measure.BEATS_IN_MEASURE; 
      i++) {
      // schedule the kick drum hits
      playSound(kick, 0.01 + context.currentTime + 
        (quarterNoteTime * i));
      // note: sounding of first beat is more reliable with slight delay
    };

    countIn();

    // schedule feedback after beat is through 
    window.setTimeout(function() {
      beatAllowed = true; // ENTER can once again begin the beat
      $('.options').fadeTo(200, 1.0);
      if (tapsAreCorrect()) { 
        $('#performance-result').css('background-color', 'seagreen').
          html('<p>Good!</p>').fadeTo(200, 1.0);
      } else {
        $('#performance-result').css('background-color', 'indianred').
          html('<p>Not quite.</p>').fadeTo(200, 1.0);
      }; 
    }, quarterNoteTime * 
      (measure.COUNT_IN + measure.BEATS_IN_MEASURE) * 1000);
  };

  /*
   * @desc Determines the current time of the AudioContext object
   * @return the current time as a float
   *
   */
  function getCurrentTime() {
    return context.currentTime;
  }

  /*
   * @desc Determines whether the user's tap was the correct ruation
   * for the given note
   * @return boolean
   *
   */
  function tapDurationIsCorrect(duration) {
    // calculate difference between expected duration and user's duration
    var durationDiff = Math.abs(measure.tapDurations[tapCount] -
      duration).toFixed(DECIMAL_PLACES);
    
    // anything smaller than a quarter note will pass for an eighth
    if (durationDiff <= GRACE_DURATION_TIME) {
      return true;
    } 

    return false;
  };

  /*
   * @desc Takes care of everything that needs to happen
   * during the count-in
   *
   */
  function countIn() {
    // fade out staff during count-in
    $('canvas').css('opacity', '0.2');

    // fade it back in after count-in
    window.setTimeout(function() {
      $('canvas').css('opacity', '1.0')
    }, quarterNoteTime * measure.COUNT_IN * 1000);

    // show count-in
    var count = 1;
    $('#count-in').html(count).show();
    var countInterval = window.setInterval(function() {
      count++;
      $('#count-in').html(count);
    }, quarterNoteTime * 1000);

    // clear the interval after count-in
    window.setTimeout(function() {
      window.clearInterval(countInterval);
      $('#count-in').hide();
    }, quarterNoteTime * measure.COUNT_IN * 1000);
  };

  /*
   * @desc Determines if the user's tap-down timing is correct
   * @param The timing of the user's tap-down
   * @return boolean - true for correct timing
   *
   */
  function tapDownIsCorrect(timing) {
    var timingDiff = Math.abs(measure.tapTimings[tapCount] -
      timing).toFixed(DECIMAL_PLACES);
    if (timingDiff <= GRACE_TAP_TIME ) {
      return true;
    };
    
    return false;
  };
  
  /*
   * @desc Determines if all of the users taps were correct
   * @return boolean - true for all correct
   *
   */
  function tapsAreCorrect() {
    // make sure # of taps match
    if (successfulPerformance && tapCount == measure.tapTimings.length) {
      return true
    } 
    return false;
  }

  /*
   * @desc Plays a sound
   * @param buffer: the sound to play
   * @param time: when to play the sound
   *
   */
  function playSound(buffer, time) {
    // Need 4 lines of code to play a kick every time!
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
  };

  /*
   * EVENT LISTENERS
   *
   */

  /*
   * User presses ENTER, starts the beat
   */
  var beatAllowed = true;
  $(document).keypress(function(event) {
    if (!beatAllowed) { // make sure multiple beat sets can't play 
      return;
    } else {
      if (event.which == ENTER_KEY) {
        playBeat();
      };
    };
  });


  /*
   * Load a new measure
   */
  $('#new-measure').click(function() {
    location.reload();
  });


  /*
   * User starts a tap
   */
  $(window).keydown(function(event) {
    if (event.which == SPACEBAR) {
      event.preventDefault(); // disable scrolling
    };
    if (event.which == SPACEBAR && keyAllowed) {
      tapDown = getCurrentTime();
      keyAllowed = false;
    };
  });

  /*
   * User ends a tap
   */
  $(window).keyup(function(event) {
    if (event.which == SPACEBAR) {
      tapUp = getCurrentTime();
      var duration = (tapUp - tapDown).toFixed(DECIMAL_PLACES);
      if (tapDownIsCorrect(tapDown - startTime) &&
        tapDurationIsCorrect(duration)) {
        $('#tap-result').append('Yep ');
      } else if (tapDownIsCorrect(tapDown - startTime)) {
        $('#tap-result').append('Nope <small>(duration off)</small> ');
        successfulPerformance = false;
      } else {
        $('#tap-result').append('Nope ');
        successfulPerformance = false;
      };
      keyAllowed = true;
      tapCount++; // increment tap count
    };
  });

  $('#try-again').click(function() {
    if (!beatAllowed) {
      return;
    } 
    playBeat();
  });

})(); // end rhythmr
