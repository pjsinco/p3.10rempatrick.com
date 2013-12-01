 /*
  * A grouping of NoteCluster objects adding up to one 4/4 measure
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
   * Set up other instance variables
   */
  this.numEights = 8; // number of eigth-notes remaining in measure
  this.group = new Array(); // array of NoteCluster objects
  this.allNotes = new Array(); // array of Vex.Flow.StaveNote objects

  // keep track of number of rest notes, measured in 8th-note values
  this.restNotes = 0; 

  /*
   * Set up constants
   */
  this.MAX_REST_NOTES = 4;

  /*
   * Fills measure with NoteClusters whose durations sum to 8;
   * for ex., if there are 3 NoteClusters, their durations could
   * be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
   */
  this.fill = function() {
    // generate NoteCluster objects
    while (this.numEights > 0) {
      var cluster = new NoteCluster(this.numEights);
      console.log('cluster.durations: ' + cluster.durations);
      this.group.push(cluster);
      this.numEights -= cluster.clusterSum;
    };

    // convert array of NoteCluster objects into a group of
    // Vex.Flow.StaveNote objects
    console.log('this.group.length: ' + this.group.length);
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
          keys: ['b/4'],
          duration: dur
        });

        // if duration is dotted, add the dot
        if (this.isDotted(dur)) {
          note.addDotToAll();
        };

        this.allNotes.push(note);
      };
    };
  };

  //randomly generate rest notes based on a coin-flip
  this.isRestNote = function(duration) {
    if (this.restNotes < this.MAX_REST_NOTES) {
      // generate a 0 or 1
      var coinFlip = Math.floor(Math.random() * 2);
      console.log("coinFlip: " + coinFlip);
      if (coinFlip == 0) {
      //if (Math.floor(Math.random() * 2) == 0) {
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

  this.isDotted = function(duration) {
    //iterate through duration, checking for a 'd'
    for (var i = 0; i < duration.length; i++) {
      if (duration.charAt(i) == 'd') {
        return true;
      }
    }
    return false;
  }

  this.render = function(duration) {
    Vex.Flow.Formatter.FormatAndDraw(
      this.ctx, this.stave, this.allNotes
    );
  };
};


