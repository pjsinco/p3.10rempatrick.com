// a grouping of NoteCluster objects adding up to one 4/4 measure
function Measure() {
  console.log('Measure constructor called');
  this.numEights = 8; // number of eigth-notes remaining in measure
  this.group = new Array(); // array of NoteCluster objects

  // fills measure with NoteClusters whose durations sum to 8
  // for ex., if there are 3 NoteClusters, their durations could
  // be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
  this.fill = function() {
    while (this.numEights > 0) {
      var cluster = new NoteCluster(this.numEights);
      //console.log('cluster: ' + cluster);
      this.group.push(cluster);
      //console.log('cluster.length: ' + cluster.length);
      this.numEights -= cluster.size;
    };
  };

//  // pass in array of durations
//  this.getVexNotesForCluster = function(cluster) {
//    // init an array to hold our instances of Vex.Flow.StaveNote
//    var vexNotes = Array();
//
//    // for each note in a cluster, convert it to Vex.Flow.StaveNote
//    // and append to vexNotes array
//    for (var i = 0; i < cluster.durations.length; i++) {
//      console.log('inside getVexNotesForCluster for loop');
//      console.log('what is the length of this cluster.durations? ' + 
//        cluster.durations.length);
//      console.log('what is the value of cluster.durations[i]? ' + 
//        cluster.durations[i]);
//      console.log(cluster.durations[i]);
//      //var d = cluster.durations[i];
//      //var n = new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" });
//      //var note = new Vex.Flow.StaveNote({
//          //keys: ['c/5'],
//          //duration: cluster[i]
//      //});
//      //vexNotes.push(n);
//    }
//
//    return vexNotes;
//  };

//  this.render = function() {
//
//  };

  //console.log(this.group.length);
};


