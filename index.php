<!DOCTYPE html>
<html>
  <head>
<!-- 	<script type="text/javascript" src="js/vexflow-json.js"></script> -->

<!-- 	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		 -->
    <style type="text/css" media="screen">
      #tap {
        height: 100px;
        width: 100px;
        background-color: #f5f5f5;
        margin: 0 auto;
        cursor: pointer;
      }
      #tap-feedback {
        display: none
      }

    </style>
  </head>
  <body>
    <h1>Rhythmr</h1>
<!--     <button id='4beats'>4 beats</button> -->
<!--     <button id='8beats'>8 beats</button> -->
<!--     <button id='16beats'>16 beats</button> -->
    <p><strong>Tap the rhythm using the spacebar.</strong> Press enter to start (count-in: 1 bar)</p>

<!--     <div id='tap'></div> -->

    <canvas id='notation' width=700 height=100></canvas>
    <div class='tap-feedback' id='correct'></div>
    <div class='tap-feedback' id='incorrect'></div><br>

    <button id='next'>New measure</button><br>
    <div id='results'></div>

<!--     <canvas id='one' width=700 height=100></canvas> -->
<!--     <canvas id='two' width=700 height=100></canvas> -->
<!--     <canvas id='three' width=700 height=100></canvas> -->
<!--     <canvas id='four' width=700 height=100></canvas> -->
<!--     <canvas id='five' width=700 height=100></canvas> -->
<!--     <canvas id='six' width=700 height=100></canvas> -->
<!--     <canvas id='seven' width=700 height=100></canvas> -->

<!--    <script>
      var canvas = $('#one')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble').setContext(ctx).draw();

      //create some notes
      var notes = [
        //quarter-note C
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
        //quarter-note D
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
        //quarter-note rest. 
        //note; the key (b/4) specifies the vertical position of the rest
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
        //a C-major chord
        new Vex.Flow.StaveNote({ keys: ["c/4", 'e/4', 'g/4'], duration: "q" })
      ];

      //create a new voice in 4/4
      var voice = new Vex.Flow.Voice({
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
      });

      voice.addTickables(notes);

      var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 500);

      voice.draw(ctx, stave);
    </script>

    <script type="text/javascript" charset="utf-8">
      var canvas = $('#two')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble').setContext(ctx).draw();

      //quarter-note E, half-note D, quarter-note C-Maj
      var notes = [
        new Vex.Flow.StaveNote({keys: ['e/5'], duration: 'q' }),
        new Vex.Flow.StaveNote({keys: ['d/5'], duration: 'h' }),
        new Vex.Flow.StaveNote({keys: ['c/5', 'e/5', 'g/5'], duration: 'q' })
      ];

      // create a second voice w/just one whole note
      var notes2 = [ 
        new Vex.Flow.StaveNote({keys: ['c/4'], duration: 'w'})
      ];
      
      //create a voice in 4/4
      function create44Voice() {
        return new Vex.Flow.Voice({
          num_beats: 4,
          beat_value: 4,
          resolution: Vex.Flow.RESOLUTION
        }) 
      };

      //create voices and add notes to each
      var voice = create44Voice().addTickables(notes);
      var voice2 = create44Voice().addTickables(notes2);

      //format and justify notes to 500px
      var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).format([voice, voice2], 500);

      //render voice
      voice.draw(ctx, stave);
      voice2.draw(ctx, stave);
    </script>

    <script>
      //practice adding 8th notes
      var canvas = $('#three')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble').setContext(ctx).draw();

      var notes = [
        new Vex.Flow.StaveNote({keys: ['c/4'], duration: '8'}),
        new Vex.Flow.StaveNote({keys: ['d/4'], duration: '8'}),
        new Vex.Flow.StaveNote({keys: ['b/4'], duration: '8r'}),
        new Vex.Flow.StaveNote({keys: ['f/4'], duration: '16m'}),
        new Vex.Flow.StaveNote({keys: ['f/4'], duration: '16m'}),
        new Vex.Flow.StaveNote({keys: ['g/4'], duration: '8'}),
        new Vex.Flow.StaveNote({keys: ['a/4'], duration: '8'}),
        new Vex.Flow.StaveNote({keys: ['b/4'], duration: '8'}),
        new Vex.Flow.StaveNote({keys: ['c/4'], duration: '8'})
      ];

      var voice = new Vex.Flow.Voice({
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
      });
      
      //add notes to voice
      voice.addTickables(notes);
    
      var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 500);

      voice.draw(ctx, stave);
    </script>      

    <script>
      //set up and render treble clef
      var canvas = $('#four')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble').setContext(ctx).draw();

      var notes = [
        //dotted E##
        new Vex.Flow.StaveNote({
          keys: ['e##/5'],
          duration: '8d'
        }).addAccidental(0, new Vex.Flow.Accidental('##')).addDotToAll(),
        //16th Eb
        new Vex.Flow.StaveNote({
          keys: ['eb/5'],
          duration: '16'
        }).addAccidental(0, new Vex.Flow.Accidental('b')),

        //half D
        new Vex.Flow.StaveNote({
          keys: ['d/5'],
          duration: 'h'
        }),

        //quarter Cm#5
        new Vex.Flow.StaveNote({
          keys: ['c/5', 'eb/5', 'g#/5'],
          duration: 'q'
        }).addAccidental(1, new Vex.Flow.Accidental('b')).
          addAccidental(2, new Vex.Flow.Accidental('#'))
      ]; 
      
      //helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);
    </script>
      
    <script>
      //set up and render treble clef
      var canvas = $('#five')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble');
      stave.setContext(ctx).draw();
      
      var notes = [
        new Vex.Flow.StaveNote({
          keys: ['g/4', 'b/4', 'cb/4', 'e/5', 'g#/5', 'b/5'],
          duration: 'h'
        }).addAccidental(0, new Vex.Flow.Accidental('bb')).
          addAccidental(1, new Vex.Flow.Accidental('b')).
          addAccidental(2, new Vex.Flow.Accidental('#')).
          addAccidental(3, new Vex.Flow.Accidental('n')).
          addAccidental(4, new Vex.Flow.Accidental('b')).
          addAccidental(5, new Vex.Flow.Accidental('##')),
        new Vex.Flow.StaveNote({
          keys: ['x/4'],
          duration: 'q'
        }),
        new Vex.Flow.StaveNote({
          keys: ['x/4'],
          duration: '8'
        }),
        new Vex.Flow.StaveNote({
          keys: ['x/4'],
          duration: '8'
        })
      ];

      Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);
    </script>

    <script>
      //set up and render treble clef
      var canvas = $('#six')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble');
      stave.setContext(ctx).draw();
      
      var notes = [
        new Vex.Flow.StaveNote({
          keys: ['e##/5'],
          duration: '8d'
        }).addAccidental(0, new Vex.Flow.Accidental('##')).
          addDotToAll(),
        new Vex.Flow.StaveNote({
          keys: ['b/4'],
          duration: '16'
        }).addAccidental(0, new Vex.Flow.Accidental('b'))
      ];      
  
      var notes2 = [
        new Vex.Flow.StaveNote({
          keys: ['c/4'],
          duration: '8'
        }),
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: '16'
        }),
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: '16'
        }).addAccidental(0, new Vex.Flow.Accidental('b'))
      ];

      var notes3 = [
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: '16'
        }),
        new Vex.Flow.StaveNote({
          keys: ['e/4'],
          duration: '16'
        }).addAccidental(0, new Vex.Flow.Accidental('#')),
        new Vex.Flow.StaveNote({
          keys: ['g/4'],
          duration: '32'
        }),
        new Vex.Flow.StaveNote({
          keys: ['a/4'],
          duration: '32'
        }),
        new Vex.Flow.StaveNote({
          keys: ['g/4'],
          duration: '16'
        })
      ];
      
      var notes4 = [
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: 'q'
        })
      ];
  
      //create the beams
      var beam = new Vex.Flow.Beam(notes);
      var beam2 = new Vex.Flow.Beam(notes2);
      var beam3 = new Vex.Flow.Beam(notes3);
    
      var allNotes = 
        notes.concat(notes2).concat(notes3).concat(notes4);
    
      //helper function to justify and render a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, stave, allNotes);

      //render beams
      beam.setContext(ctx).draw();
      beam2.setContext(ctx).draw();
      beam3.setContext(ctx).draw();
    </script>

    <script>
      //set up and render treble clef
      var canvas = $('#seven')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble');
      stave.setContext(ctx).draw();
      
      

      var notes = [
        new Vex.Flow.StaveNote({
          keys: ['e##/5'],
          duration: '8d'
        }).addAccidental(0, new Vex.Flow.Accidental('##')).
          addDotToAll(),
        new Vex.Flow.StaveNote({
          keys: ['b/4'],
          duration: '16'
        })
      ];

      var notes2 = [
        new Vex.Flow.StaveNote({
          keys: ['b/4'],
          duration: '8'
        }),
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: '16'
        }),
        new Vex.Flow.StaveNote({
          keys: ['d/4', 'e/4'],
          duration: '16'
        }).addAccidental(0, new Vex.Flow.Accidental('b'))
      ];

      var notes3 = [
        new Vex.Flow.StaveNote({
          keys: ['c/4', 'e/4'],
          duration: '8'
        }),
        new Vex.Flow.StaveNote({
          keys: ['e/4'],
          duration: '8'
        }).addAccidental(0, new Vex.Flow.Accidental('#'))
      ];

      var notes4 = [
        new Vex.Flow.StaveNote({
          keys: ['e/4'],
          duration: '8'
        }),
        new Vex.Flow.StaveNote({
          keys: ['d/4'],
          duration: '8'
        })
      ];

      //create the beams
      var beam = new Vex.Flow.Beam(notes);
      var beam2 = new Vex.Flow.Beam(notes2);
      var beam3 = new Vex.Flow.Beam(notes3);
      var beam4 = new Vex.Flow.Beam(notes4);

      // Create a tie between the last note of the first group and the
      // first note of the last group.
      var tie = new Vex.Flow.StaveTie({
        first_note: notes[1],
        last_note: notes2[0],
        first_indices: [0],
        last_indices: [0]
      });
    
      // Create another tie between the two chords in the tune
      var tie2 = new Vex.Flow.StaveTie({
        first_note: notes2[2],
        last_note: notes3[0],
        first_indices: [0, 1],
        last_indices: [0, 1]
      });

      var allNotes = 
        notes.concat(notes2).concat(notes3).concat(notes4);

      //helper function to justify and render a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, stave, allNotes);

      //render the beams
      beam.setContext(ctx).draw();
      beam2.setContext(ctx).draw();
      beam3.setContext(ctx).draw();
      beam4.setContext(ctx).draw();
      
      //render the ties
      tie.setContext(ctx).draw();
      tie2.setContext(ctx).draw();
      
    </script>
-->

	<script type="text/javascript" src="js/jquery.min.js"></script>		
	<script type="text/javascript" src="js/vexflow-master/build/vexflow/vexflow-min.js"></script>		
	<script type="text/javascript" src="js/measure.js"></script>
	<script type="text/javascript" src="js/possible-durations.js"></script>
	<script type="text/javascript" src="js/notecluster.js"></script>
  <script>
    var measure = new Measure();
    measure.fill();
    measure.render();
    //console.log('measure.group.length: ' + measure.group.length);
  </script>
  <script type="text/javascript" src='js/rhythmr.js'></script>
  </body>
</html>
