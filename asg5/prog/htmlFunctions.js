/**
 * Updates the text within an HTML element.
 *
 * @param {String} text String being sent to HTML element.
 * @param {String} htmlID The ID of an html element.
 */
function sendTextToHTML(text, htmlID) {
    htmlID.innerHTML = text;
}


/*function addFiles() {
  var objectFile = document.getElementById("objInput").files[0];
  var textureFile = document.getElementById("objInput").files[1];
  console.log( "tex: " + textureFile);

  var fileReader = new FileReader();

  fileReader.onloadend = function() {
    var objString = fileReader.result;
    fileReader.onloadend = function() {
      var textureURL = fileReader.result;
      var loadedOBJ = new LoadedOBJ(objString);

      var callback = function(texture) { loadedOBJ.textures[0] = texture; }

      create2DTexture(textureURL, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
      myScene.addGeometry(loadedOBJ);
    }
    fileReader.readAsDataURL(textureFile);
  }
  fileReader.readAsText(objectFile);
} */ 


worldMap = [
 /* [1,1,1,0,1,1,1,1,1,1],
  [0,2,0,0,0,0,0,0,0,3],
  [1,1,1,1,0,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,3],
  [1,0,1,1,1,1,0,1,1,1],
  [3,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,0,1,0,1,1],
  [3,0,0,0,0,0,0,2,0,0],
  [1,1,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0]*/

 /* [1,0,1,1,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,1,0,0],
  [0,0,1,1,0,0,1,1,1,1],
  [1,1,1,1,0,0,1,1,1,1],
  [1,0,1,0,0,0,0,1,1,1],
  [1,0,1,0,0,0,0,1,1,1],
  [0,0,1,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,1,0,0,1],
  [1,1,1,1,0,0,1,1,0,0] */ 

  [1,1,0,1,1,1,1,1,1,0],
  [1,0,0,1,1,1,1,1,0,0],
  [1,0,1,1,1,1,1,0,0,1],
  [1,0,1,1,1,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0], 
  [1,0,1,1,1,0,0,0,1,1],
  [1,0,1,1,1,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,1,1],
  [1,1,1,0,1,1,1,0,1,1]
]


 
//Large in order to account for 100 sgements circles
verticesColors = new Float32Array([
  // Vertex coordinates and color
   1.0,  1.0,  1.0,  // v0 White
   1.0,  0.0,  1.0,  // v1 Magenta
   1.0,  0.0,  0.0,  // v2 Red
   1.0,  1.0,  0.0,  // v3 Yellow
   0.0,  1.0,  0.0,  // v4 Green
   0.0,  1.0,  1.0,  // v5 Cyan
   0.0,  0.0,  1.0,  // v6 Blue
   0.0,  0.0,  0.0,  // v7 Black
   1.0,  1.0,  1.0,  // v8 White
   1.0,  0.0,  1.0,  // v9 Magenta
   1.0,  0.0,  0.0,  // v10 Red
   1.0,  1.0,  0.0,  // v11 Yellow
   1.0,  1.0,  1.0,  // v12 White
   1.0,  0.0,  1.0,  // v13 Magenta
   1.0,  0.0,  0.0,  // v14 Red
   1.0,  1.0,  0.0,  // v15 Yellow
   0.0,  1.0,  0.0,  // v16 Green
   0.0,  1.0,  1.0,  // v17 Cyan
   0.0,  0.0,  1.0,  // v18 Blue
   0.0,  0.0,  0.0,  // v19 Black
   1.0,  1.0,  1.0,  // v20 White
   1.0,  0.0,  1.0,  // v21 Magenta
   1.0,  0.0,  0.0,  // v22 Red
   1.0,  1.0,  0.0,  // v23 Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow  
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow  
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow 
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow         
]); 
