/*Ian Feekes
 *ifeekes@ucsc.edu
 *#1474914
 *cmps160 asg5
 *
 *main.js
 */ 

let u_FragColor
let a_PointSize
let u_ModelMatrix
let u_ViewMatrix
let u_ProjMatrix;
let a_Normal; 
let currScene;          
let canvas; 
let gl; 
let a_Position; 
let a_Color;
let a_TexCoord;
let cubeVertices;
let map1;
let g_EyeX; 
let g_EyeY;
let g_EyeZ;
let viewMatrix; 
let projMatrix;
let xStart;
let xDelta;
let angleRotation; 
let G_atX; 
let G_atY; 
let u_LightColor        //added for lighting
let u_LightPosition     //added for lighting 
let u_AmbientLight      //added for lighting 
let u_NormalMatrix      //added for lighting 
var leftRotation;

let regularShaders; 
let lightingShaders; 

/*Initializes a few important variables and glsl values before simply calling 
  initializeEventHandlers()
  */ 
function main() {
  //Set up a few important perspective variables
  viewMatrix = new Matrix4(); 
  projMatrix = new Matrix4(); 
  angleRotation=90; 
  G_atX=0;
  G_atY=100; 
  g_EyeX=0;
  g_EyeY=-1;
  g_EyeZ=0; 
  map1 = [
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
  //Initialize the canvas element and checks to make sure it exists 
  canvas = document.getElementById('canvas');
  if(!canvas){
    console.log("Error: could not retrieve the canvas element\n");
    return -1; 
  }
  /*Hard-coded values for the width and height are result
   *of a design decision for what I believe to be the most
   *aesthetically-pleasing initial view for the users*/ 
  canvas.width = window.innerWidth - 200;
  canvas.height = window.innerHeight-250; 
  //Initializes gl and checks to make sure it exists
  gl = getWebGLContext(canvas);
  if(!gl){
    console.log("Error: could not retrieve the gl operations\n");
    return -1; 
  } 

regularShaders=createShader(gl, ASSIGN5_VSHADER, ASSIGN5_FSHADER); 

  //Initialize the new lighting shaders for the program 
  if (!initShaders(gl, VSHADER_SOURCE, ASSIGN5_FSHADER)) {
    console.log('Failed to intialize lighting shaders.');
    return;
  }

  /*if(!initShaders(gl, ASSIGN5_VSHADER, ASSIGN5_FSHADER)){
    console.log('Failed to initialize normal shaders');
    return; 
  }*/ 

  //Create the two shaders we will be switching between for this assignment
 // lightingShaders=createShader(gl, VSHADER_SOURCE, ASSIGN5_FSHADER); 
  

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  //Gets the location of the fragments and shader variables.
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position<0)
  {
    console.log("Error: could not retrieve a_Position value\n");
    return -1; 
  }
  a_Normal= gl.getAttribLocation(gl.program, 'a_Normal'); 
  if(a_Normal<0)
  {
    console.log("Error: could not retreeive a_Normal value\n");
    return -1; 
  }
  a_PointSize = gl.getUniformLocation(gl.program, 'a_PointSize');
  if(a_PointSize<0)
  {
    console.log("Error: could not retrieve a_PointSize value\n");
    return -1; 
  }
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(u_ModelMatrix<0)
  {
    console.log("Error: could not retrieve u_ModelMatrix value\n");
    return -1; 
  }
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(u_ViewMatrix<0)
  {
    console.log("Error: could not retrieve u_ViewMatrix value\n");
    return -1; 
  }
  u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if(u_ProjMatrix<0)
  {
    console.log("Error: could not retrieve u_ProjMatrix value\n");
    return -1; 
  }
  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color<0)
  {
    console.log("Error: could not retrieve a_Color value\n");
    return -1; 
  }
  u_Switch = gl.getUniformLocation(gl.program, 'u_Switch');
  if(u_Switch<0)
  {
    console.log("Error: could not retrieve u_Switch value\n");
    return -1; 
  }
  u_FSwitch = gl.getUniformLocation(gl.program, 'u_FSwitch');
  if(u_FSwitch<0)
  {
    console.log("Error: could not retrieve u_FSwitch value\n");
    return -1; 
  }
  u_VSwitch = gl.getUniformLocation(gl.program, 'u_VSwitch');
  if(u_VSwitch<0)
  {
    console.log("Error: could not retrieve u_VSwitch value\n");
    return -1; 
  }
  //lighting global variables 
  u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition'); 
  u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight'); 
  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix'); 
 /* a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if(a_TexCoord<0)
  {
    console.log("Error: could not retrieve a_TexCoord value\n");
    return -1; 
  } */ 
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  // Set the light direction (in the world coordinate)
  gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);
  // Set the ambient light
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);
  
  gl.uniform1f(u_FSwitch, 1.0);
  //Call initialize event handlers
  initEventHandelers();
}






