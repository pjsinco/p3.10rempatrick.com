 /*
  * A grouping of NoteCluster objects adding up to one 4/4 measure
  *
  */
function Measure() {
  /*
   * Set up blank staff
   */
  this.canvas = $('#notation')[0];
  this.renderer = 
    new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.CANVAS);
  this.ctx = this.renderer.getContext();
  this.stave = new Vex.Flow.Stave(10, 0, 500);
  this.stave.addClef('treble');
  this.stave.setContext(this.ctx).draw();

  /*
   * Set up constants
   */
  this.HALF = 1.0; // duration in seconds of a half note, 120 bpm
  this.DOTTED_QUARTER = 0.75; // duration in seconds of a dotted quarter
  this.QUARTER = 0.5; // duration in seconds of a quarter note
  this.EIGHTH = 0.25; // duration in seconds of a eighth note
  this.COUNT_IN = 4; // number of quarter notes in a count-in
  this.MAX_REST_NOTES = 4; // max. number of rest notes allowed
  this.BEATS_IN_MEASURE = 4; // we're in 4/4 time

  /*
   * Set up other instance variables
   */
  this.numEights = 8; // number of eighth-notes remaining in measure
  this.group = new Array(); // array of NoteCluster objects
  this.allNotes = new Array(); // of Vex.Flow.StaveNote objects
  this.tapTimings = new Array(); // schedule of expected taps 
  this.tapDurations = new Array(); // schedule of expected taps 
  this.restNotes = 0; // # of rest notes, measured in 8th-note values

  // track how many seconds have elapsed in measure;
  // used to help calculate tapTimings
  this.timeElapsed = this.COUNT_IN * this.QUARTER; 

  /*
   * @desc Fills measure with NoteClusters whose durations sum to 8;
   *   for ex., if there are 3 NoteClusters, their durations could
   *   be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
   */
  this.fill = function() {
    // generate NoteCluster objects
    while (this.numEights > 0) {
      var cluster = new NoteCluster(this.numEights);
      this.group.push(cluster);
      this.numEights -= cluster.clusterSum;
    };

    // convert array of NoteCluster objects into a group of
    // Vex.Flow.StaveNote objects;
    // iterate over each NoteCluster object in this.group
    for (var i = 0; i < this.group.length; i++) {
      // iterate over each duration array in each NoteCluster
      // and make a new Vex.Flow.StaveNote
      for (var j = 0; j < this.group[i].durations.length; j++) {
        var dur = this.group[i].durations[j];

        // randomly convert note to rest note
        if (this.isRestNote(dur)) {
          dur += 'r'; // adding an 'r' changes note to rest
        }

        // instantiate a new StaveNote object
        var note = new Vex.Flow.StaveNote({
          keys: ['b/4'], // we'll stick with B notes
          duration: dur
        });

        // if duration is dotted, add the dot
        if (this.isDotted(dur)) {
          note.addDotToAll();
        };

        this.allNotes.push(note);

        // update tapTimings based on this note
        this.processTapTiming(dur);
      };
    };
  };

  /*
   * @desc Randomly generates a rest note 
   * @param a Vex.Flow.StaveNote duration to possibly
   *   convert into a rest
   * @return boolean indicating whether the note should
   *   be a rest 
   */
  this.isRestNote = function(duration) {
    if (this.restNotes < this.MAX_REST_NOTES) {
      // generate a 0 or 1
      if (Math.floor(Math.random() * 2) == 0) {
        // we have rest, so appropriately increment tally of rest notes
        switch (duration) {
          case '8':
            this.restNotes += 1;
            break;
          case 'q':
            this.restNotes += 2;
            break;
          case 'qd':
            this.restNotes += 3;
            break;
          case 'h':
            this.restNotes += 4;
            break;
        }

        return true; // note will be a rest
      }
    }
  
    return false;
  }

  /*
   * @desc Determines if a note is dotted
   * @param duration: the note to check
   * @return boolean - true if note is dotted
   *
   */
  this.isDotted = function(duration) {
    //iterate through duration, checking for a 'd'
    for (var i = 0; i < duration.length; i++) {
      if (duration.charAt(i) == 'd') {
        return true;
      }
    }
    return false;
  }

  /*
   *@desc Draws the staff and notes
   *
   */
  this.render = function() {
    Vex.Flow.Formatter.FormatAndDraw(
      this.ctx, this.stave, this.allNotes
    );
  };

   /*
    * @desc Translates notes into tap timings,
    * measured in seconds
    * @param a Vex.Flow.StaveNote duration
    *
    */
  this.processTapTiming = function(dur) {
    if (dur == 'h' || dur == 'hr') {
      if (dur == 'h') {
        this.tapTimings.push(this.timeElapsed);
        this.tapDurations.push(this.HALF);
      };
      this.timeElapsed += this.HALF;
    } else if (dur == 'qd' || dur == 'qdr') {
      if (dur == 'qd') {
        this.tapTimings.push(this.timeElapsed);
        this.tapDurations.push(this.DOTTED_QUARTER);
      };
      this.timeElapsed += this.DOTTED_QUARTER;
    } else if (dur == 'q' || dur == 'qr') {
      if (dur == 'q') {
        this.tapTimings.push(this.timeElapsed);
        this.tapDurations.push(this.QUARTER);
      };
      this.timeElapsed += this.QUARTER;
    } else {
      if (dur == '8') {
        this.tapTimings.push(this.timeElapsed);
        this.tapDurations.push(this.EIGHTH);
      };
      this.timeElapsed += this.EIGHTH;
    };
  };

}; //eoc
