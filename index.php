<!DOCTYPE html>
<html>
  <head>
	<script type="text/javascript" src="js/jquery.min.js"></script>		
	<script type="text/javascript" src="js/raphael-min.js"></script>	  
	<script type="text/javascript" src="js/underscore-min.js"></script>
<!-- 	<script type="text/javascript" src="js/vexflow-json.js"></script> -->
	<script type="text/javascript" src="js/vexflow-master/build/vexflow/vexflow-min.js"></script>		

<!-- 	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		 -->
    <style type="text/css" media="screen">
      #tap {
        height: 100px;
        width: 100px;
        background-color: #f5f5f5;
        margin: 0 auto;
        cursor: pointer;

      }
    </style>
  </head>
  <body>
    <h1>Testing Web Audio API</h1>
    <button id='4beats'>4 beats</button>
    <button id='8beats'>8 beats</button>
    <button id='16beats'>16 beats</button>

    <div id='tap'></div>

    <canvas id='staff' width=700 height=100></canvas>

    <script>
      var canvas = $('#staff')[0];
      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef('treble').setContext(ctx).draw();
      //var json = new Vex.Flow.JSON(['C', 'E', 'G']);
      //var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      //
      //var ctx = renderer.getContext();
      //var stave = new Vex.Flow.Stave(10, 0, 500);
      //stave.addClef("treble").setContext(ctx).draw();



      //var canvas = $('div.one div.a canvas')[0];
      //var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      //var ctx = renderer.getContext();
      //var stave = new Vex.Flow.Stave(10, 0, 500);
      //stave.addClef('treble').setContext(ctx).draw();
    </script>
      

  <script type="text/javascript" src='js/metronome.js'></script>
  </body>
</html>
