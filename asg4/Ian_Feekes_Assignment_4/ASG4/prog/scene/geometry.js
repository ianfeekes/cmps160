/**
 * Specifies a geometric object.
 *
 * @author Ian Feekes
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    /*Currentlly begins with empty vertices and an empty colour*/ 
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.color = [];    // The color of your geometric object
    this.n = 0;         // The number of vertices of the object. 
    this.modelMatrix = new Matrix4(); //Initialize the model matrix
    this.shader=null;   // shading program you will be using to shade this geometry
    this.currentAngle=0.0;
    this.vecX=0;
    this.vecY=0; 
    this.SIZE_STEP = 0;
    this.shader=null;   //We will have to start using multipl shaders for textures
    this.data = [];
    this.uv_data = []; 
    this.color_data = []; 
    if(this instanceof TiltedCube)
    {
       if(this instanceof CheckerCube)
        {
          this.shader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
          useShader(gl, this.shader); 
        }
    }
    else
    {
       this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER); 
      useShader(gl, this.shader); 
    }
  }

  //Sets color 
  setColor(c)
  {
    //Do this for every vertex still 
    for(let i=0;i<this.n;i++)
    {
      /*this.color.push(c[0]);
      this.color.push(c[1]);
      this.color.push(c[2]); */ 
      this.vertices[i].setColor(c[0],c[1],c[2]); 
    } 
    //console.log(this.color+"\n"); 
  }

  /*Iterates through the number of vertices each object has and generates a 
   *random r, g, b value for them*/ 
  setRandomColor()
  {
    for(let i=0;i<this.n;i++)
    {
      //r g and b are all values between 0-255 inclusive 
      let r = (Math.floor(Math.random()*Math.floor(256)))/256;
      let g = (Math.floor(Math.random()*Math.floor(256)))/256;
      let b = (Math.floor(Math.random()*Math.floor(256)))/256;  
      /*this.color.push(r);
      this.color.push(g); 
      this.color.push(b); */  
      //this.vertices[i].setColor = (r, g, b); 
      this.vertices[i].setColor(r,g,b); 
    }
    //console.log(this.color+"\n"); 
  }

  setArrayValues()
  {
    for(var i=0;i<this.vertices.length;i++)
    {
      //data.push(Array.prototype.slice.call(this.vertices[i].points.elements));
      this.data.push(this.vertices[i].points[0],this.vertices[i].points[1],this.vertices[i].points[2] ); 
      //uv_data.push(Array.prototype.slice.call(this.vertices[i].uv));
      this.uv_data.push(this.vertices[i].uv); 
      //color_data.push(Array.prototype.slice.call(this.vertices[i].color));
      this.color_data.push(this.vertices[i].color[0], this.vertices[i].color[1],this.vertices[i].color[2]); 
    }

    this.data = new Float32Array(this.data);
    this.uv_data = new Float32Array(this.uv_data);
    this.color_data = new Float32Array(this.color_data);
  }

  /**
   * Renders this Geometry within your webGL scene.
   * Sets color, translates vertices, sets vertices, and draws 
   */
  render() {
   /* let data = [];
    let uv_data = []; 
    let color_data = []; 

    for(var i=0;i<this.vertices.length;i++)
    {
      //data.push(Array.prototype.slice.call(this.vertices[i].points.elements));
      data.push(this.vertices[i].points[0],this.vertices[i].points[1],this.vertices[i].points[2] ); 
      //uv_data.push(Array.prototype.slice.call(this.vertices[i].uv));
      uv_data.push(this.vertices[i].uv); 
      //color_data.push(Array.prototype.slice.call(this.vertices[i].color));
      color_data.push(this.vertices[i].color[0], this.vertices[i].color[1],this.vertices[i].color[2]); 
    }

    data = new Float32Array(data);
    uv_data = new Float32Array(uv_data);
    color_data = new Float32Array(color_data); */ 


//    sendAttributeBufferToGLSL(data, 3, 'a_Position'); 
    if(this instanceof TiltedCube)
      {
        if(this instanceof CheckerCube)
        {
          //this.shader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
          //useShader(gl, this.shader); 
          send2DTextureToGLSL(this.texture, 0, 'u_Sampler')
          sendAttributeBufferToGLSL(this.uv_data, 2, 'a_TexCoord', 2, 0); 
        }
        //sendIndicesBufferToGLSL(this.indices)
        else{
          sendAttributeBufferToGLSL(this.color_data, 3, 'a_Color');
        }
        sendAttributeBufferToGLSL(this.data, 3, 'a_Position'); 
        sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');
        //tellGLSLToDrawCurrentBuffer(36);
         sendIndicesBufferToGLSL(this.indices)
         gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
      }
    /*This case applies to all non-cube shapes where we don't have to deal
      with the possibility of applying textures or working with index buffers*/ 
    else 
      {
       // this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER); 
       // useShader(gl, this.shader); 
        /*console.log("logging color_data in geometry render\n");
        console.log(color_data); 
        console.log("logging data in geometry render \n'");
        console.log(data); */
        sendAttributeBufferToGLSL(this.color_data, 3, 'a_Color');
        sendAttributeBufferToGLSL(this.data, 3, 'a_Position'); 
        //tells glsl to apply this shapes transformation matrix
        sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');
        //tells glsl to apply this shapes vertices  
        //console.log(this.vertices); 
        tellGLSLToDrawCurrentBuffer(this.n);
      }
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   *
   * The super method does nothing. Each shape has their own unique update
   * animation method
   */
  updateAnimation() {
    return;
  }

}
