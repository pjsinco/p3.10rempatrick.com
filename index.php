<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		
    <link rel='stylesheet' href='css/style.css'  type='text/css'>
    <meta charset="utf-8">
    <title>Rhythmr</title>
  </head>
  <body>
    <div id='wrapper'>
      <h1>Rhythmr</h1>
      <p>Spacebar is your instrument. Play the notated phrase.
<!--       Using the spacebar as your instrument, play the notated rhythm. -->
<!--       <p>Play the notated rhythm using the spacebar.<br> -->
<!--       Express a note's duration by holding down the spacebar.<br> -->
<!--       One-bar count off on ENTER.</p> -->
<!--       ENTER starts the kick drum.</p> -->
<!--       ENTER starts the count off.</p> -->
      Count-off on ENTER.</p>
      <div id='count-in'></div>
      <canvas id='notation' width=550 height=100></canvas>
  
<!--       <button id='next' class='button'>New measure</button><br> -->

      <div id='tap-result'></div>
      <div id='performance-result'></div>
      <aside>
        <p>This application uses the Web Audio API, which Internet Explorer <a href='http://caniuse.com/audio-api' title='Can I use Web Audio API' target='_blank'>does not support</a>.<p>
      </aside>
      
    </div><!-- end wrapper -->
  	<script type="text/javascript" src="js/vexflow-master/build/vexflow/vexflow-min.js"></script>		
  	<script type="text/javascript" src="js/measure.js"></script>
  	<script type="text/javascript" src="js/possible-durations.js"></script>
  	<script type="text/javascript" src="js/notecluster.js"></script>
    <script type="text/javascript" src='js/rhythmr.js'></script>
  </body>
</html>
