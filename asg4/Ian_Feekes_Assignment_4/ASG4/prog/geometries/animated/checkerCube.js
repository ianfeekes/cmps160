/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube.
 *
 * @author "Your Name Here"
 * @this {CheckerCube}
 */
class CheckerCube extends TiltedCube {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {CheckerCube}
   */
  constructor() {
    //
    // YOUR CODE HERE
    //
    super(); 
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
    //create2DTexture(textureImage.value, gl.LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.REPEAT, gl.REPEAT, send2DTextureToGLSL); 

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders CheckerCube.
   */
  render() {
    //
    // YOUR CODE HERE
    //
    var vertexTexBuffer = gl.createBuffer(); 
    var FSIZE = this.vertices.BYTES_PER_ELEMENT; 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
    gl.enableVertexAttribArray(a_Position); 
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4, FSIZE*2); 
    gl.enableVertexAttribArray(a_TexCoord);

    create2DTexture(textureImage.value, gl.LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.REPEAT, gl.REPEAT, send2DTextureToGLSL); 
    tellGLSLToDrawCurrentBuffer(this.n); 
    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value.
  }
}
