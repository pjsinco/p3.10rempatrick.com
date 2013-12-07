 /*
  * A raw, random cluster of eighth notes;
  * count of notes is between 1 and number of eigth-notes still available
  * in the measure (size)
  */
function NoteCluster(size) { 
  //instance variables
  this.durations = new Array(); // NoteCluster refined into durations

  // cluster will have a random length between 1 and 
  // the size passed into the constructor
  this.clusterSum = Math.floor(size * Math.random() + 1);

 /*
  * @desc Transforms a cluster into a collection of durations;
  * for ex., the duration of a cluster of 3 eighth-notes could be:
  *    ['qd'], ['q', '8'], ['8', '8', '8'];
  * duration notation is based on possible values for
  * Vex.Flow.StaveNote.duration:
  *   'q' = quarter-note
  *   'd' = dotted
  *   '8' = eighth-note
  *   'h' = half-note
  */
  this.generateDurations = function() {
    //console.log('inside generateDurations');
    //console.log('possibleDurations[size].length: ' + possibleDurations[this.clusterSum].length);

    //we're going to yank a random array from durations.js
    //that corresponds to the size of our cluster
    this.randIndex = 
      Math.floor(possibleDurations[this.clusterSum].length * 
        Math.random());

    // iterate through the array in possibleDurations that was chosen,
    // adding each item to this.durations
    for (
      var i = 0; 
      i < possibleDurations[this.clusterSum][this.randIndex].length; 
      i++
    ) {
      this.durations.
        push(possibleDurations[this.clusterSum][this.randIndex][i]);
    }
  }

  this.generateDurations();

};
