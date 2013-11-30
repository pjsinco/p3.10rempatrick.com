// a grouping of noteClusters adding up to one 4/4 measure
function Measure() {
  this.numEights = 8; // number of eigth-notes remaining in measure
  this.group = new Array(); // group of NoteClusters for the measure

  // fills measure with NoteClusters whose durations sum to 8
  // for ex., if there are 3 NoteClusters, their durations could
  // be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
  this.fill = function() {
    while (this.numEights > 0) {
      var cluster = new NoteCluster(this.numEights);
      //console.log('cluster: ' + cluster);
      this.group.push(cluster.getCluster());
      //console.log('cluster.length: ' + cluster.length);
      this.numEights -= cluster.length;
    };
  };

  console.log(this.group.length);
};

// a raw, random cluster of eighth notes;
// count of notes is between 1 and number of eigth-notes still available
// in the measure (numNotes)
function NoteCluster(numNotes) { 
  this.numNotes = numNotes;
  this.length = 0;
  this.durations = []; // NoteCluster refined into durations

  // transform raw 8th-note clusters into duration values
  // that are useable in Vex.Flow.StaveNote

  // possible combinations of durations for 1 eighth note
  this.notes1 = [
    ['8']
  ];
  
  // possible combinations of durations for 2 eighth notes
  this.notes2 = [
    ['q'], ['8', '8']
  ];

  // possible combinations of durations for 3 eighth notes
  this.notes3 = [
    ['qd'], 
    ['q', '8'], 
    ['8', '8', '8']
  ];

  // possible combinations of durations for 4 eighth notes
  this.notes4 = [
    ['h'], 
    ['q', 'q'], 
    ['qd', '8'], 
    ['q', '8', '8'], 
    ['8', '8', '8', '8']
  ];

  // possible combinations of durations for 5 eighth notes
  this.notes5 = [
    ['h', '8'], 
    ['qd', 'q'], 
    ['qd', '8', '8'], 
    ['q', 'q', '8'], 
    ['q', '8', '8', '8'],
    ['8', '8', '8', '8', '8']
  ];

  // possible combinations of durations for 6 eighth notes
  this.notes6 = [
    ['h', 'q'],
    ['qd', 'qd'],
    ['h', '8', '8'],
    ['qd', 'q', '8'],
    ['q', 'q', 'q'],
    ['qd', '8', '8', '8'],
    ['q', '8', '8', '8', '8'],
    ['8', '8', '8', '8', '8', '8']
  ];

  // possible combinations of durations for 7 eighth notes
  this.notes7 = [
    ['h', 'qd'],
    ['h', 'q', '8'],
    ['qd', 'qd', '8'],
    ['qd', 'q', 'q'],
    ['qd', 'q', 'q', '8'],
    ['h', '8', '8', '8'],
    ['q', 'q', 'q', '8'],
    ['q', 'q', '8', '8', '8'],
    ['qd', '8', '8', '8', '8'],
    ['q', '8', '8', '8', '8', '8'],
    ['8', '8', '8', '8', '8', '8', '8']
  ];

  // possible combinations of durations for 8 eighth notes
  this.notes8 = [
    ['h', 'h'],
    ['h', 'q', 'q'],
    ['h', 'qd', '8'],
    ['h', 'q', '8', '8'],
    ['h', '8', '8', '8', '8'],
    ['qd', 'qd', 'q'],
    ['qd', 'qd', '8', '8'],
    ['qd', 'q', 'q', '8'],
    ['qd', 'q', '8', '8', '8'],
    ['qd', '8', '8', '8', '8', '8'],
    ['q', 'q', 'q', 'q'],
    ['q', 'q', 'q', '8', '8'],
    ['q', 'q', '8', '8', '8', '8'],
    ['q', '8', '8', '8', '8', '8', '8'],
    ['8', '8', '8', '8', '8', '8', '8', '8']
  ];

  this.getCluster = function() {
    // generate a value between 1 and this.numNotes
    var numNotesToGrab = Math.floor(this.numNotes * Math.random() + 1);
    
    //update number of eighth notes in cluster
    this.length = numNotesToGrab; 

    this.transform();

    return this;
  };

  // randomly transform a cluster into a collection of durations
  // for ex., the duration of a cluster of 3 eighth-notes could be:
  //    ['qd'], ['q', '8'], ['8', '8', '8']
  // duration notation is based on possible values for
  // Vex.Flow.StaveNote.duration 
  //   for ex.: 'q' = quarter-note
  //            'd' = dotted
  //            '8' = eighth-note
  //            'h' = half-note
  this.transform = function() {
    switch(this.length) {
      case 1:
        this.durations.push(this.notes1[0]);
        break;
      case 2:
        var randIndex = 
          Math.floor(this.notes2.length * Math.random());
        this.durations.push(this.notes2[randIndex]);
        //console.log('case2 randIndex: ' + randIndex);
        break;
      case 3:
        var randIndex = 
          Math.floor(this.notes3.length * Math.random());
        this.durations.push(this.notes3[randIndex]);
        //console.log('case3 randIndex: ' + randIndex);
        break;
      case 4:
        var randIndex = 
          Math.floor(this.notes4.length * Math.random());
        this.durations.push(this.notes4[randIndex]);
        //console.log('case4 randIndex: ' + randIndex);
        break;
      case 5:
        var randIndex = 
          Math.floor(this.notes5.length * Math.random());
        this.durations.push(this.notes5[randIndex]);
        //console.log('case5 randIndex: ' + randIndex);
        break;
      case 6:
        var randIndex = 
          Math.floor(this.notes6.length * Math.random());
        this.durations.push(this.notes6[randIndex]);
        //console.log('case6 randIndex: ' + randIndex);
        break;
      case 7:
        var randIndex = 
          Math.floor(this.notes7.length * Math.random());
        this.durations.push(this.notes7[randIndex]);
        //console.log('case7 randIndex: ' + randIndex);
        break;
      case 8:
        var randIndex = 
          Math.floor(this.notes8.length * Math.random());
        this.durations.push(this.notes8[randIndex]);
        //console.log('case8 randIndex: ' + randIndex);
        break;
    }
  };
};

var measure = new Measure();
measure.fill();
//console.log('Number of NoteClusters: ' + measure.group.length);
//for (var i = 0; i < measure.group.length; i++) {
  //console.log('measure.group[' + i + '].length: ' 
    //+ measure.group[i].length);
//}

console.log('how big is our array of NoteClusters? ' +
  measure.group.length);

for (var i = 0; i < measure.group.length; i++) {
  for (var j = 0; j < measure.group[i].durations.length; j++) {
    console.log('what are the values in group #' + i + '? ');
    console.log(measure.group[i].durations[j]);
  }
}

