/*Ian Feekes
 *ifeekes@ucsc.edu
 *#1474914
 *cmps160 asg5
 *
 *main.js
 */ 

var ev;
var output, interSlider;
var u_FragColor, a_PointSize, u_ModelMatrix, u_ViewMatrix, u_ProjMatrix;
var mouseDown = 0, mouseUp = true, x, y, xy, size, rgb, vertexBuffer, rgba;
var triangleVertices, squareVertices, numberOfSegments, circleVertices;
var squareButton = true, triangleButton = false, circleButton = false; 
var tiltedCubeButton = false;
var  myGeometry, mySquare, myTriange, myCircle;

let currScene;          
let canvas; 
let gl; 
let a_Position; 

var ANGLE_STEP = 60.0, currentAngle = 0.0, currentSize = 1.0;
var g_last = Date.now();
var upward = true;
var radian, cosB, sinB;
var vertexData;
var a_Color;
var vertexTexCoordBuffer;
var textureButton = true;
var a_TexCoord;
var verticesColors;
var indices;
var indice;
var vertexColorBuffer;
var reader;
var image;
var cubeVertices;
var worldMap, gameOverMap, color, start = false;
var once = true;
var goingLeft = true;
var g_EyeX = 0, g_EyeY = -1, g_EyeZ = 0;
var fileReader, fileOBJ, objString, loadedOBJ, terrain = true;
var viewMatrix = new Matrix4(); 
var projMatrix = new Matrix4();  
var xStart, xDelta, angleRotation = 90;
var G_atX = 0, G_atY = 100, angleRotationRads = 0;
var leftRotation;

/**
 * Function called when the webpage loads.
 */ 

function main() {
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

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Gets the location of the fragments and shader variables.
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position<0)
  {
    console.log("Error: could not retrieve a_Position value\n");
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
  a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if(a_TexCoord<0)
  {
    console.log("Error: could not retrieve a_TexCoord value\n");
    return -1; 
  }
  

  //Start with rainbow colors
  //gl.uniform1f(u_FSwitch, 0.5); 
  gl.uniform1f(u_FSwitch, 1.0);
  //gl.uniform1f(u_VSwitch, 1.0);


  vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color); 
  
  //Call initialize event handlers
  initEventHandelers();
}






