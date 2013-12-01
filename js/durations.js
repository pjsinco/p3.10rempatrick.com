var possibleDurations = {

  // just so we have a zero index
  0: [
    []
  ],

  // possible combinations of durations for 1 eighth note
  1: [
    ['8']
  ],
  
  // possible combinations of durations for 2 eighth notes
  2: [
    ['q'], 
    ['8', '8']
  ],

  // possible combinations of durations for 3 eighth notes
  3: [
    ['qd'], 
    ['q', '8'], 
    ['8', '8', '8']
  ],

  // possible combinations of durations for 4 eighth notes
  4: [
    ['h'], 
    ['q', 'q'], 
    ['qd', '8'], 
    ['q', '8', '8'], 
    ['8', '8', '8', '8']
  ],

  // possible combinations of durations for 5 eighth notes
  5: [
    ['h', '8'], 
    ['qd', 'q'], 
    ['qd', '8', '8'], 
    ['q', 'q', '8'], 
    ['q', '8', '8', '8'],
    ['8', '8', '8', '8', '8']
  ],

  // possible combinations of durations for 6 eighth notes
  6: [
    ['h', 'q'],
    ['qd', 'qd'],
    ['h', '8', '8'],
    ['qd', 'q', '8'],
    ['q', 'q', 'q'],
    ['qd', '8', '8', '8'],
    ['q', '8', '8', '8', '8'],
    ['8', '8', '8', '8', '8', '8']
  ],

  // possible combinations of durations for 7 eighth notes
  7: [
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
  ],

  // possible combinations of durations for 8 eighth notes
  8: [
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
  ]
};
