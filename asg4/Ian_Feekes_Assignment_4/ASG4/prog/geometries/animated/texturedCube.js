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
    let filename = "flcl.jpg"; 
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

     console.log("In multiTextureCube logging vertices...\n"); 
     console.log(this.vertices); 
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
