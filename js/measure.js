 /*
  * A grouping of NoteCluster objects adding up to one 4/4 measure
  */
function Measure() {
  /*
   * set up blank staff
   */
  this.canvas = $('#notation')[0];
  this.renderer = 
    new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.CANVAS);
  this.ctx = this.renderer.getContext();
  this.stave = new Vex.Flow.Stave(10, 0, 500);
  this.stave.addClef('treble');
  this.stave.setContext(this.ctx).draw();

  this.numEights = 8; // number of eigth-notes remaining in measure
  this.group = new Array(); // array of NoteCluster objects
  this.allNotes = new Array(); // array of Vex.Flow.StaveNote objects

  // Fills measure with NoteClusters whose durations sum to 8;
  // for ex., if there are 3 NoteClusters, their durations could
  // be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
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
        var note = new Vex.Flow.StaveNote({
          keys: ['b/4'],
          duration: dur
        });

        // if duration is dotted, add the dot
        if (this.isDotted(dur)) {
          note.addDotToAll();
        };

        this.allNotes.push(note);
      }
    }

    console.log('Measure.allNotes.length: ' +
      this.allNotes.length);
  };

  this.isDotted = function(duration) {
    // we know there's a dot if the length of duration is more than 1;
    // for ex., 'qd' instead of 'q'
    return duration.length > 1;
  }

  this.render = function(duration) {
    Vex.Flow.Formatter.FormatAndDraw
    (
      this.ctx, this.stave, this.allNotes
    );
  };
};


