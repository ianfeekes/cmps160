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
  constructor(size,centerX,centerY,color,cFlag) {
    //
    // YOUR CODE HERE
    //
    //gl.glEnable(GL_DEPTH_TEST); 
     gl.enable(gl.DEPTH_TEST);
    super(size, centerX, centerY, color, cFlag); 
    //this.generateUVCoordinates(); \
    this.generateSpecialUV(); 
    super.setUVArray(); 
    let filename= document.getElementById('textureImage').value.split(/(\\|\/)/g).pop();
    let path = "./"+filename;
    console.log("logging path...\n"); 
    console.log(path); 
    create2DTexture(path,gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT, (texture) => {
         this.texture = texture; 
       }); 


    // Recomendations: Might want to call generateUVCoordinates here.
  }

  generateSpecialUV()
  {
    this.vertices[0].uv = [0.0,  0.0];
     this.vertices[1].uv = [3.0,  0.0];
     this.vertices[2].uv = [3.0,  3.0];
     this.vertices[3].uv = [0.0,  3.0];
     // Back 2x times
     this.vertices[4].uv = [0.0,  0.0];
     this.vertices[5].uv = [2.0,  0.0];
     this.vertices[6].uv = [2.0,  1.0];
     this.vertices[7].uv = [0.0,  1.0];
     // Top half
     this.vertices[8].uv = [0.0,  0.0];
     this.vertices[9].uv = [1.0,  0.0];
     this.vertices[10].uv = [1.0,  0.5];
     this.vertices[11].uv = [0.0,  0.5];
     // Bottom half
     this.vertices[12].uv = [0.0,  0.5];
     this.vertices[13].uv = [1.0,  0.5];
     this.vertices[14].uv = [1.0,  1.0];
     this.vertices[15].uv = [0.0,  1.0];
     // Right 2x times
     this.vertices[16].uv = [0.0,  0.0];
     this.vertices[17].uv = [1.0,  0.0];
     this.vertices[18].uv = [1.0,  1.0];
     this.vertices[19].uv = [0.0,  1.0];
     // Left
     this.vertices[20].uv = [0.0,  0.0];
     this.vertices[21].uv = [1.0,  0.0];
     this.vertices[22].uv = [1.0,  1.0];
     this.vertices[23].uv = [0.0,  1.0];
     //super.setUVArray(); 
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
   // Front
    this.vertices[0].uv = [0.0,  0.0]
    this.vertices[1].uv = [1.0,  0.0]
    this.vertices[2].uv = [1.0,  1.0]
    this.vertices[3].uv = [0.0,  1.0]
    // Back
    this.vertices[4].uv = [0.0,  0.0]
    this.vertices[5].uv = [1.0,  0.0]
    this.vertices[6].uv = [1.0,  1.0]
    this.vertices[7].uv = [0.0,  1.0]
    // Top
    this.vertices[8].uv = [0.0,  0.0]
    this.vertices[9].uv = [1.0,  0.0]
    this.vertices[10].uv = [1.0,  1.0]
    this.vertices[11].uv = [0.0,  1.0]
    // Bottom
    this.vertices[12].uv = [0.0,  0.0]
    this.vertices[13].uv = [1.0,  0.0]
    this.vertices[14].uv = [1.0,  1.0]
    this.vertices[15].uv = [0.0,  1.0]
    // Right
    this.vertices[16].uv = [0.0,  0.0]
    this.vertices[17].uv = [1.0,  0.0]
    this.vertices[18].uv = [1.0,  1.0]
    this.vertices[19].uv = [0.0,  1.0]
    // Left
    this.vertices[20].uv = [0.0,  0.0]
    this.vertices[21].uv = [1.0,  0.0]
    this.vertices[22].uv = [1.0,  1.0]
    this.vertices[23].uv = [0.0,  1.0]

    //console.log("creating uv vertices...\n"); 
    //console.log(this.vertices); 
    //create2DTexture(textureImage.value, gl.LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.REPEAT, gl.REPEAT, send2DTextureToGLSL); 

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders CheckerCube.
   */
  /*render() {
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
  }*/
}
