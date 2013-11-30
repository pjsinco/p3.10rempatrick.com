// create a random note
// half-, quarter-, eighth- or 16th

var noteLengths = [];
// generate a random number between 1 and 4
// 1 = half note
// 2 = quarter note
// 3 = eighth note
// 4 = 16th note
//var noteLength = Math.floor(4 * Math.random() + 1);
//console.log(noteLength);
//console.log(1 / noteLength);
//console.log((1 / 3) + (1 / 3) + (1 / 3));

var beatLength = 0;

while (beatLength < 1) {
  var noteLength = Math.floor(4 * Math.random() + 1);
  console.log('noteLength: ' + noteLength);
  beatLength += (1 / noteLength);
  noteLengths.push(noteLength);
  console.log("beatLength: " + beatLength);
}

//for (var i = 0; i < noteLengths.length; i++) {
  //console.log(noteLengths[i]);
//}

//var randomNote = function() {
//  var randomLength = 4 * Math.random();
//  return randomLength;
//};
//
//for (var i = 0; i < 10; i ++) {
//  var noteLength = randomNote;
//  randNotes.push(noteLength);
//}
//
//for (var i = 0, l = randNotes.length; i < l; i ++) {
//  console.log(randNotes[i]);
//}
