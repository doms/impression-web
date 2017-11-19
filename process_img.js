var subscriptionKey = "bec8ef1cee50434e9df96dc6b28d8dd2";

function AnalyzeImage(sourceImageUrl, responseTextArea, captionSpan) {
  // Request parameters.
  var params = {
    "visualFeatures": "Categories,Description,Color",
    "details": "",
    "language": "en",
  };

  // Perform the REST API call.
  $.ajax({
    url: common.uriBasePreRegion + 
         $("#subscriptionRegionSelect").val() + 
         common.uriBasePostRegion + 
         common.uriBaseAnalyze +
         "?" + 
         $.param(params),

    // Request headers.
    beforeSend: function(jqXHR){
        jqXHR.setRequestHeader("Content-Type","application/json");
        jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", 
            encodeURIComponent($("#subscriptionKeyInput").val()));
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

    .done(function(data) {
        // Show formatted JSON on webpage.
        responseTextArea.val(JSON.stringify(data, null, 2));

        // Extract and display the caption and confidence from the first caption in the description object.
        if (data.description && data.description.captions) {
            var caption = data.description.captions[0];

            if (caption.text && caption.confidence) {
                captionSpan.text("Caption: " + caption.text +
                    " (confidence: " + caption.confidence + ").");
            }
        }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Prepare the error string.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;

        // Put the error JSON in the response textarea.
        responseTextArea.val(JSON.stringify(jqXHR, null, 2));

        // Show the error message.
        alert(errorString);
    });
}

function analyzeButtonClick() {
    // Clear the display fields.
    $("#sourceImage").attr("src", "#");
    $("#responseTextArea").val("");
    $("#captionSpan").text("");

    // Display the image.
    var sourceImageUrl = $("#inputImage").val();
    $("#sourceImage").attr("src", sourceImageUrl);

    AnalyzeImage(sourceImageUrl, $("#responseTextArea"), $("#captionSpan"));
}