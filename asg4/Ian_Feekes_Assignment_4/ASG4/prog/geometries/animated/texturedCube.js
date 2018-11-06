/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */
class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */
  constructor(texturePath) {
    //
    // YOUR CODE HERE
    //
    console.log("creating multiTextureCube"); 
    console.log("texture path is: "+texturePath+"\n"); 
    
    super(20, 0, 0, [1.0,1.0,1.0],1); 
    this.texturePath = texturePath; 
    this.generateUVCoordinates(); 
    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    //
    // YOUR CODE HERE
    //
    this.vertices = new Float32Array([
      -.5, .5, 0.0, 1.0, 
      -.5, -.5, 0.0, 0.0, 
      .5, .5, 1.0, 1.0, 
      .5, -.5, 1.0, 0.0,
      ]);
    this.n=4; 
    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }


 /*  loadTexture(gl,n,texture,u_Sampler,image){
       gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
      gl.activeTexture(gl.TEXTURE0); 
      gl.bindTexture(gl.TEXTURE_2D, texture); 
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGV, gl.UNSIGNED_BYTE, image); 
      gl.uniform1i(u_Sampler,0); 

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); 
    }*/ 

  /**
   * Renders MultiTextureCube.
   */
  render() {
    //
    // YOUR NAME HERE
    //
    let n = this.n; 
    var vertexTexCoordBuffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer); 
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW); 
    var FSIZE = this.vertices.BYTES_PER_ELEMENT; 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT, false, FSIZE*4, 0); 
    gl.enableVertexAttribArray(a_Position); 
    var a_TexCoord=gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*4, FSIZE*2); 
    gl.enableVertexAttribArray(a_TexCoord); 

    //super.render(); 
    var texture = gl.createTexture(); 
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler'); 
    var image = new Image(); 
    image.onload = function()
    {
      /*gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
      gl.activeTexture(gl.TEXTURE0); 
      gl.bindTexture(gl.TEXTURE_2D, texture); 
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGV, gl.UNSIGNED_BYTE, image); 
      gl.uniform1i(u_Sampler,0); 

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.n); */
      loadTexture(gl,n,texture,u_Sampler,image); 
    };
    
   // image.src  = '../../../external/textures/checkerboard.png';   
   image.src = this.texturePath; 



  /*  var vertexTexBuffer = gl.createBuffer(); 

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW); 

    var FSIZE = this.vertices.BYTES_PER_ELEMENT; 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
    gl.enableVertexAttribArray(a_Position); 
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4, FSIZE*2); 
    gl.enableVertexAttribArray(a_TexCoord);

    create2DTexture(this.texturePath, gl.LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.REPEAT, gl.REPEAT, send2DTextureToGLSL); 
    tellGLSLToDrawCurrentBuffer(this.n); */ 



    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value. Might want to use
  }

}
