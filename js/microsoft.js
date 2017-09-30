function handle(e) {
  if (e.keyCode === 13) {
    processImage();
  }
  return false;
}

function processImage() {
  // Get new key: https://azure.microsoft.com/en-gb/try/cognitive-services/
  var subscriptionKey = "2d23052d48564cf19b54bb302da30626";
  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // Request parameters.
  var params = {
    visualFeatures: "Description",
    details: "",
    language: "en"
  };

  // Display the image.
  var sourceImageUrl = document.getElementById("urlInfo").value;
  // document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}'
  })
    .done(function(data) {
      // Parse info we want from results
      var results = JSON.parse(JSON.stringify(data, null, 2));
      console.log(results.description);
      alert(
        "I am " +
          (results.description.captions[0].confidence * 100).toFixed(1) +
          "% sure that this is " +
          results.description.captions[0].text
      );
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
}
