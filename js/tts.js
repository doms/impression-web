function handleVoice() {
  // get text to read from input box
  var textToSpeak = document.getElementById("results").innerText;
  console.log(textToSpeak);

  // read it out loud
  responsiveVoice.speak(textToSpeak);
}

$("#pause-button").on("click", function() {
  if (!responsiveVoice.isPlaying()) {
    return;
  } else {
    responsiveVoice.pause();
  }
});

$("#play-button").on("click", function() {
  if (responsiveVoice.isPlaying()) {
    return;
  } else {
    handleVoice();
  }
});

$("#stop-button").on("click", function() {
  if (!responsiveVoice.isPlaying()) {
    return;
  } else {
    responsiveVoice.cancel();
  }
});
