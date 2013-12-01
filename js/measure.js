// a grouping of NoteCluster objects adding up to one 4/4 measure
function Measure() {
  this.numEights = 8; // number of eigth-notes remaining in measure
  this.group = new Array(); // array of NoteCluster objects

  // Fills measure with NoteClusters whose durations sum to 8;
  // for ex., if there are 3 NoteClusters, their durations could
  // be 2, 1, 5; if there are 4, durations could be 1, 1, 5, 1
  this.fill = function() {
    while (this.numEights > 0) {
      var cluster = new NoteCluster(this.numEights);
      console.log('cluster.durations: ' + cluster.durations);
      this.group.push(cluster);
      this.numEights -= cluster.clusterSum;
    };
  };
};


