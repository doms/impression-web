// get text to read from input box
// var textToSpeak = document.getElementById("results").value;

function handleVoice() {
  // read it out loud
  responsiveVoice.speak(textToSpeak);

  // add event listeners for play/pause/cancel
  $("#pauseButton").on("click", function() {
    if (!responsiveVoice.isPlaying()) {
      return;
    } else {
      responsiveVoice.pause();
    }
  });

  $("#playButton").on("click", function() {
    if (responsiveVoice.isPlaying()) {
      return;
    } else {
      responsiveVoice.resume();
    }
  });

  $("#stopButton").on("click", function() {
    if (!responsiveVoice.isPlaying()) {
      return;
    } else {
      responsiveVoice.cancel();
    }
  });
}
