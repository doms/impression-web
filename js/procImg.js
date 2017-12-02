const microsoftApiKey = "bec8ef1cee50434e9df96dc6b28d8dd2";
const googleApiKey = "AIzaSyAegC2YEg7TclrJD_sDnJCSSyNjihnf93A";

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 300);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

function compareResults(microsoft, google) {
  // parse results
  var microsoftResults = JSON.parse(JSON.stringify(microsoft, null, 2));
  var googleResults = JSON.parse(JSON.stringify(google, null, 2));

  console.log(
      "microsoft:",
      microsoftResults.description.captions[0].confidence * 100
  );
  console.log(
    "google:",
    googleResults.responses[0].labelAnnotations[0].score * 100
  );

  // return results object of higher accuracy score
  return microsoftResults.description.captions[0].confidence * 100 >
    googleResults.responses[0].labelAnnotations[0].score * 100
    ? { name: "microsoft", data: microsoft }
    : { name: "google", data: google };
}

function processImage() {
  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
    

  // Request parameters.
  var params = {
    visualFeatures: "Description",
    details: "",
    language: "en"
  };

  var preview = document.getElementById("sourceImage").src;
  var sourceImageUrl = document.getElementById("url").value;

  console.log("preview.src:", preview);

  // add photo to img tag if from URL
  if (sourceImageUrl) {
    document.querySelector("#sourceImage").src = sourceImageUrl;
  }

  // dynamically create request header
  var headerType =
    sourceImageUrl === "" ? "application/octet-stream" : "application/json";
  console.log("headerType: ", headerType);

  // set data to send depending on headerType
  var inputType =
    headerType === "application/octet-stream"
      ? makeBlob(preview)
      : '{"url": ' + '"' + sourceImageUrl + '"}';
  console.log("inputType:", inputType);

  // Microsoft API call.

  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", headerType);
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", microsoftApiKey);
    },

    type: "POST",
    processData: false,
    data: inputType,
    success: function(data) {
      // Parse info to use for comparison
      var microsoftResults = JSON.parse(JSON.stringify(data, null, 2));
      console.log("microsoft response body:", microsoftResults);

      // prepare request object
      var requests;

      // URL's and local files requests are structured differently
      // https://cloud.google.com/vision/docs/request#providing_the_image
      if (sourceImageUrl === "") {
        // remove base64 tag
        var formattedInput = preview.replace(/(.*,)/, "");
        console.log("Formatted:", formattedInput);

        requests = {
          requests: [
            {
              image: {
                content: formattedInput
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 1
                }
              ]
            }
          ]
        };
      } else {
        requests = {
          requests: [
            {
              image: {
                source: {
                  imageUri: sourceImageUrl
                }
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 1
                }
              ]
            }
          ]
        };
      }

      $.ajax({
        url: `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,

        // Might have to set size....
        beforeSend: function(xhrObj) {
          // xhrObj.setRequestHeader("Content-Length", formattedInput.length);
          xhrObj.setRequestHeader("Content-Type", "application/json");
        },

        type: "POST",
        processData: false,
        data: JSON.stringify(requests),
        success: function(data) {
          var googleResults = JSON.parse(JSON.stringify(data, null, 2));
          console.log("google response body: ", googleResults);

          // get accurate results
          var accurateResults = compareResults(microsoftResults, googleResults);
          console.log("accurate results:", accurateResults);
            
          // microsoft
          if (accurateResults.name === "microsoft") {
              if(accurateResults.data.description.captions[0].confidence * 100 < 80)
                  alert("Microsoft accuracy of: "+accurateResults.data.description.captions[0].confidence * 100+" is below 80%");
            $(".modal-body").append(
              "<h1 id='results'>" +
                "I am <strong>" +
                (accurateResults.data.description.captions[0].confidence * 100
                ).toFixed(2) +
                "%</strong> sure that this is " +
                accurateResults.data.description.captions[0].text +
                "</h1>" +
                "<h1 id='api-description' style='display: none;'>" +
                accurateResults.data.description.captions[0].text +
                "</h1>" +
                "<form action=/save method='post' id='submit-form' style='display: none;'>" +
                "<input type='text' name='url'/>" +
                "<input type='text' name='confidence'/>" +
                "<input type='text' name='text'/>" +
                "<input type='text' name='tags'/>" +
                "</form>"
            );

            // programmatically fill input form for /save
            $("input[name='url']").val(sourceImageUrl);
            $("input[name='confidence']").val(
              (accurateResults.data.description.captions[0].confidence * 100
              ).toFixed(2)
            );
            $("input[name='text']").val(
              accurateResults.data.description.captions[0].text
            );
            $("input[name='tags']").val(accurateResults.data.description.tags);
          } else {
            // Google had better results...
              if(accurateResults.data.responses[0].labelAnnotations[0].score * 100 < 80)
                  alert("Google accuracy of: "+(accurateResults.data.responses[0].labelAnnotations[0].score * 100).toFixed(2) +" is below 80%");
            $(".modal-body").append(
              "<h1 id='results'>" +
                "I am <strong>" +
                (accurateResults.data.responses[0].labelAnnotations[0].score *
                  100
                ).toFixed(2) +
                "%</strong> sure that this is a " +
                accurateResults.data.responses[0].labelAnnotations[0]
                  .description +
                "</h1>" +
                "<h1 id='api-description' style='display: none;'>" +
                accurateResults.data.responses[0].labelAnnotations[0]
                  .description +
                "</h1>" +
                "<form action=/save method='post' id='submit-form' style='display: none;'>" +
                "<input type='text' name='url'/>" +
                "<input type='text' name='confidence'/>" +
                "<input type='text' name='text'/>" +
                "<input type='text' name='tags'/>" +
                "</form>"
            );

            // programmatically fill input form for /save
            $("input[name='url']").val(sourceImageUrl);
            $("input[name='confidence']").val(
              (accurateResults.data.responses[0].labelAnnotations[0].score * 100
              ).toFixed(2)
            );
            $("input[name='text']").val(
              accurateResults.data.responses[0].labelAnnotations[0].description
            );
            $("input[name='tags']").val(
              accurateResults.data.responses[0].labelAnnotations[0].description
            );
          }

          $("#myModal").modal("show");
        }
      });
    }
  });

  // clear input
  document.getElementById("url").value = "";
}

/*
  Input requirements:

  Supported image formats: JPEG, PNG, GIF, BMP.
  Image file size must be less than 4MB.
  Image dimensions must be at least 50 x 50.
*/

// Cycle new API keys since they expire quickly :(
// https://azure.microsoft.com/en-gb/try/cognitive-services/

// DB
// https://console.firebase.google.com/u/0/project/impression-web/database/data
