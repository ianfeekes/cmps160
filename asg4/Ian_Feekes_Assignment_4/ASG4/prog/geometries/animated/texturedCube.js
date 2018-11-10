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
  constructor(size, centerX, centerY, color, cFlag) {
    //
    // YOUR CODE HERE
    //
    super(size, centerX, centerY, color, cFlag); 
    this.generateUVCoordinates();
    super.setUVArray(); 
    //let filename = "checkerboard.png"; 
    let filename= document.getElementById('textureImage').value.split(/(\\|\/)/g).pop();
    let path = "./"+filename; 
    create2DTexture(path, gl.Linear, gl.Linear, gl.REPEAT, gl.REPEAT, (texture) => {
       this.texture = texture
     });

   // this.texturePath = texturePath; 
   // this.generateUVCoordinates(); 
    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
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

     //console.log("In multiTextureCube logging vertices...\n"); 
     //console.log(this.vertices); 

   /*   this.vertices[0].uv = [0.0,  0.0]
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
    this.vertices[23].uv = [0.0,  1.0] */ 
  }

}
