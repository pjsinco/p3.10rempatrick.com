<!DOCTYPE html>
<html>
  <head>
    <link rel='stylesheet' href='css/style.css'  type='text/css'>
    <meta charset="utf-8">
    <title>Rhythmr | Practice sight-reading rhythms</title>
  </head>
  <body>
    <div id='wrapper'>
      <h1>Rhythmr <span>Practice sight-reading rhythms</span></h1>
      <p>Spacebar is your instrument. ENTER starts the count-off.</p>
      <div id='count-in'></div>
      <canvas id='notation' width=550 height=100></canvas>
  
      <div id='tap-result'></div>
      <div id='performance-result'></div>
      <button id='try-again' class='options'>Try again</button>
      <button id='new-measure' class='options'>New measure</button><br>

      <aside>
        <p>This application uses the Web Audio API, which Internet Explorer <a href='http://caniuse.com/audio-api' title='Can I use Web Audio API' target='_blank'>does not support</a>.<p>
      </aside>
      
    </div><!-- end wrapper -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		
    <script type="text/javascript" src="js/vexflow-min.js"></script>		
    <script type="text/javascript" src="js/measure.js"></script>
    <script type="text/javascript" src="js/possible-durations.js"></script>
    <script type="text/javascript" src="js/notecluster.js"></script>
    <script type="text/javascript" src='js/rhythmr.js'></script>
  </body>
</html>
