<!DOCTYPE html>
<html>
  <head>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		
    <link rel='stylesheet' href='css/style.css'  type='text/css'>
  </head>
  <body>
    <div id='wrapper'>
      <h1>Rhythmr</h1>
      <p>Play the notated rhythm using the spacebar.<br>
      Express a note's duration by holding down the spacebar.<br>
      ENTER starts the kick drum</p>
      <div id='count-in'></div>
      <canvas id='notation' width=550 height=100></canvas>
  
      <button id='next'>New measure</button><br>

      <div id='tap-result'></div>
    </div><!-- end wrapper -->
  	<script type="text/javascript" src="js/vexflow-master/build/vexflow/vexflow-min.js"></script>		
  	<script type="text/javascript" src="js/measure.js"></script>
  	<script type="text/javascript" src="js/possible-durations.js"></script>
  	<script type="text/javascript" src="js/notecluster.js"></script>
    <script>
      var measure = new Measure();
      measure.fill();
      measure.render();
    </script>
    <script type="text/javascript" src='js/rhythmr.js'></script>
  </body>
</html>
