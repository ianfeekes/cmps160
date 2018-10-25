/*Ian Feekes
 *ifeekes@ucsc.edu
 *#1474914
 *cmps160 asg3
 *
 *glsFunctions.js
 *contains useful helper functions for sending data to glsl*/ 

/**
 * Sends a WebGL 2D texture object (created by load2DTexture) and sends it to
 * the shaders.
 *
 * @param val The WebGL 2D texture object being passed
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 * @param {String} uniformName The name of the uniform variable where the texture's
 * textureUnit location (0 - 7) will reside
 */
function send2DTextureToGLSL(val, textureUnit, uniformName) {
  //
  // YOUR CODE HERE
  //

  // Recomendations: Within this funciton, you should:
  //    1. Gather your uniform location
  //    2. Determine the exture unit you will be using (gl.TEXTURE"N")
  //    3. Activate your texture unit using gl.activeTexture
  //    4. Bind your texture using gl.bindTexture
  //    5. Send the texture unit (textureUnit not the one you found) to your
  //       uniform location.
}

/**
 * Creates a WebGl 2D texture object.
 *
 * @param imgPath A file path/data url containing the location of the texture image
 * @param magParam texParameteri for gl.TEXTURE_MAG_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param minParam texParameteri for gl.TEXTURE_MIN_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param wrapSParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param wrapTParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param callback A callback function which executes with the completed texture
 * object passed as a parameter.
 */
function create2DTexture(imgPath, magParam, minParam, wrapSParam, wrapTParam, callback) {
  //
  // YOUR CODE HERE
  //

  // Recomendations: This function should see you creating an Image object,
  // setting that image object's ".onload" to an anonymous function containing
  // the rest of your code, and setting that image object's ".src" to imgPath.
  //
  // Within the anonymous function:
  //  1. create a texture object by saving the result of gl.createTexture()
  //  2. Flip your image's y-axis and bind your texture object to gl.TEXTURE_2D
  //  3. Using multiple calls to gl.texParameteri, pass magParam, minParam,
  //     wrapSParam, and wrapTParam.
  //  4. Set the texture's image to the loaded image using gl.texImage2D
  //  5. Pass your completed texture object to your callback function
  //
  // NOTE: This function should not return anything.
}

/**
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
 function sendUniformMatToGLSL(val, uniformName) {
   //
   // YOUR CODE HERE
   //
   var uName = gl.getUniformLocation(gl.program, uniformName);
  if (uName < 0) {
    console.log('Failed to get the storage location of the attribute being sent to glsl\n');
    return -1;
  }

   gl.uniformMatrix4fv(uName, false, val.elements); 
   // Recomendations: This is going to be very similar to sending a float/vec.
}

/* Sends data to an attribute variable using a buffer
 * This is one of the most challenging functions to properly impliment
 * throughout this programming assignment. It essentially just throws
 * data into glsl in preparation for rendering. 
 */ 
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
  //contain data within vertices for easier processing
  var vertices = new Float32Array(data); 
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  //Checks to make sure the buffer has been initialized
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  //gets the attribute ane checks to see if it's valid
  var aName = gl.getAttribLocation(gl.program, attribName);
  if (aName < 0) {
    console.log('Failed to get the storage location of the attribute being sent to glsl\n');
    return -1;
  }
  //Points the attribute to the pointer
  gl.vertexAttribPointer(aName, 2, gl.FLOAT, false, 0, 0);
  // Enable the assignment to the attribute variable
  gl.enableVertexAttribArray(aName);
  // returns the data count passed in
  return dataCount; 
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 *
 * Simply connects the dots, with pointCount specifying how many dots to connect 
 */
function tellGLSLToDrawCurrentBuffer(pointCount) {
 // console.log("telling glsl to draw current buffer \n"); 
 // console.log("point count is: "+pointCount+"\n"); 
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointCount); 
}

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 *
 * Sends the float to the specified glsl uniform
 */
function sendUniformFloatToGLSL(val, uniformName) {
  gl.uniform1f(uniformName, val);
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 *
 * Simply sends the value(assumed to be a 4 entry vector) to the uniform name. 
 * This function is called each time a shape needs to have its colour set. 
 * This function is also called each time a corona gets its lime ;) 
 */
function sendUniformVec4ToGLSL(val, uniformName) {
  gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]); 
}
