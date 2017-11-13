function handleVoice() {
  // get text to read from input box
  var textToSpeak = document.getElementById("api-description").innerText;
  console.log(textToSpeak);

  // read it out loud
  responsiveVoice.speak(textToSpeak);
}

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

// TODO: implement different languages (watch for change on dropdown menu)
