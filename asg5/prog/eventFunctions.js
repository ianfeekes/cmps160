/*Ian Feekes
 *#1474914
 *ifeekes@ucsc.edu
 *cmps160 asg5
 *eventFunctions.js
 *
 *This file has been altered significantly from the previous assignment. 
 *Mostly used for dealing with initializing the functionality of html 
 *elements, allong with generating an array of tilted cubes for a maze  
 */ 

 let zoomSlider;          //Responsible for holding camera zoom value 

/*Initiallizes a few sliders, goes through my attempt to procedurally generate the world*/ 
function initEventHandelers() {
  //Initialize the scene we are working with 
  currScene = new Scene();
  myGeometry = new Geometry();

  zoomSlider = document.getElementById('zoom');
  //This adds the main world cube 
    let baseCube = new TiltedCube(1.0,0,0,terrain); 
    currScene.addGeometry(baseCube);

    //sets the flag to false so we can generate things 
    terrain=false; 

    /*Loops through x and y coordinates representing where to generate grid cubes*/ 
    for(var yRange = 0; yRange < 10; yRange++) 
    {
      for(var xRange = 0; xRange < 10; xRange++) 
      {
        /*Logic determining where we want to initialize our grid cubes to give the world
          a somewhat maze-like appearence */ 
        if(worldMap[xRange][yRange]==1)
        {
          /*Create the grid cube and add it to geometry*/ 
          let gridCube = new TiltedCube(.1, -.9+(xRange*.2), .9-(yRange*.2), terrain); 
          currScene.addGeometry(gridCube); 
        }
      }
    }

    //Initializes the key listener functionality for processing which key was pressed 
    document.onkeydown = function(ev) { 
     processKey(ev); 
    };
    //Start up the animation clock 
    tick();
}

/*Processes camera movement on key events*/ 
function processKey(ev) {
  var absX = Math.abs(G_atX);
  var absY = Math.abs(G_atY);
  var rightAngle = (angleRotation - 90);
  var leftAngle = (angleRotation + 90);
  if(Math.sign(rightAngle) == -1) { rightAngle += 360; }
  if(leftAngle >= 360) { leftAngle -= 360; }
  if(ev.keyCode == 68 || ev.keyCode == 39) goRight(rightAngle, absX, absY); 
  else if(ev.keyCode == 65 || ev.keyCode == 37)goLeft(leftAngle, absX, absY)
  else if(ev.keyCode == 87 || ev.keyCode == 38)goForward(absX, absY); 
  else if(ev.keyCode == 83 || ev.keyCode == 40)goBackward(absX, absY); 
  else if(ev.keyCode == 74)leftRotate(); 
  else if(ev.keyCode == 76)rightRotate();
  else if(ev.keyCode == 73)zoomSlider.value -= 3;
  else if(ev.keyCode == 75)zoomSlider.value +=3;  
}

function goBackward(absX, absY)
{
  if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == 1) { //(-)x and (+)y
      if(absX > absY) {
        g_EyeY -= 0.01 * (absY/absX);
        g_EyeX += 0.01;
      } else {
        g_EyeY -= 0.01;
        g_EyeX += 0.01 * (absX/absY);
      } 
    } else if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == -1){                     //if x is positive
      if(absX > absY) {
        g_EyeY += 0.01 * (absY/absX);
        g_EyeX += 0.01;
      } else {
        g_EyeY += 0.01;
        g_EyeX += 0.01 * (absX/absY);
      } 
    } else if (Math.sign(G_atX) == 1 && Math.sign(G_atY) == -1) {
      if(absX > absY) {
        g_EyeY += 0.01 * (absY/absX);
        g_EyeX -= 0.01;
      } else {
        g_EyeY += 0.01;
        g_EyeX -= 0.01 * (absX/absY);
      } 
    } else {
      if(absX > absY) {
        g_EyeY -= 0.01 * (absY/absX);
        g_EyeX -= 0.01;
      } else {
        g_EyeY -= 0.01;
        g_EyeX -= 0.01 * (absX/absY);
      } 
    }
}

function goForward(absX, absY)
{
  if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == 1) { //(-)x and (+)y
      if(absX > absY) {
        g_EyeY += 0.01 * (absY/absX);
        g_EyeX -= 0.01;
      } else {
        g_EyeY += 0.01;
        g_EyeX -= 0.01 * (absX/absY);
      } 
    } else if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == -1){                     //if x is positive
      if(absX > absY) {
        g_EyeY -= 0.01 * (absY/absX);
        g_EyeX -= 0.01;
      } else {
        g_EyeY -= 0.01;
        g_EyeX -= 0.01 * (absX/absY);
      } 
    } else if (Math.sign(G_atX) == 1 && Math.sign(G_atY) == -1) {
      if(absX > absY) {
        g_EyeY -= 0.01 * (absY/absX);
        g_EyeX += 0.01;
      } else {
        g_EyeY -= 0.01;
        g_EyeX += 0.01 * (absX/absY);
      } 
    } else {
      if(absX > absY) {
        g_EyeY += 0.01 * (absY/absX);
        g_EyeX += 0.01;
      } else {
        g_EyeY += 0.01;
        g_EyeX += 0.01 * (absX/absY);
      } 
    } 
}

function goRight(rightAngle, absX, absY)
{
    if(rightAngle < 90 && rightAngle >= 0) { //(-)x and (+)y
      if(rightAngle < 90 && rightAngle >= 45) {
        g_EyeY += 0.01;
        g_EyeX += 0.01 * (absY/absX); 
      } else {
        g_EyeY += 0.01 * (absX/absY);
        g_EyeX += 0.01;
      } 
    } else if(rightAngle < 180 && rightAngle >= 90) { 
      if(rightAngle < 135 && rightAngle >= 90) {
        g_EyeY += 0.01;
        g_EyeX -= 0.01 * (absY/absX);
      } else {
        g_EyeY += 0.01 * (absX/absY);
        g_EyeX -= 0.01;
      } 
    } else if (rightAngle < 270 && rightAngle >= 180) {
      if(rightAngle < 270 && rightAngle >= 225) {
        g_EyeY -= 0.01;
        g_EyeX -= 0.01 * (absY/absX);
      } else {
        g_EyeY -= 0.01 * (absX/absY);
        g_EyeX -= 0.01;
      } 
    } else {
      if(rightAngle < 315 && rightAngle >= 270) {
        g_EyeY -= 0.01;
        g_EyeX += 0.01 * (absY/absX);
      } else {
        g_EyeY -= 0.01 * (absX/absY);
        g_EyeX += 0.01;
      } 
    }
}

function goLeft(leftAngle, absX, absY)
{
  if(leftAngle < 90 && leftAngle >= 0) { //(-)x and (+)y
      if(leftAngle < 90 && leftAngle >= 45) {
        g_EyeY += 0.01;
        g_EyeX += 0.01 * (absY/absX);
      } else {
        g_EyeY += 0.01 * (absX/absY);
        g_EyeX += 0.01;
      } 
    } else if(leftAngle < 180 && leftAngle >= 90){                 
      if(leftAngle < 135 && leftAngle >= 90) {
        g_EyeY += 0.01;
        g_EyeX -= 0.01 * (absY/absX);
      } else {
        g_EyeY += 0.01 * (absX/absY);
        g_EyeX -= 0.01;
      } 
    } else if (leftAngle < 270 && leftAngle >= 180) {
      if(leftAngle < 270 && leftAngle >= 225) {
        g_EyeY -= 0.01;
        g_EyeX -= 0.01 * (absY/absX);
      } else {
        g_EyeY -= 0.01 * (absX/absY);
        g_EyeX -= 0.01;
      } 
    } else {
      if(leftAngle < 315 && leftAngle >= 270) {
        g_EyeY -= 0.01;
        g_EyeX += 0.01 * (absY/absX);
      } else {
        g_EyeY -= 0.01 * (absX/absY);
        g_EyeX += 0.01;
      } 
    }
}

function leftRotate()
{ 
    angleRotation += 2;
    angleRotation%=360;
    G_atX = 100 * Math.cos(angleRotation*(Math.PI/180));
    G_atY = 100 * Math.sin(angleRotation*(Math.PI/180));
}

function rightRotate()
 {
    angleRotation -= 2;
    angleRotation %=360;
    G_atX = 100 * Math.cos(angleRotation*(Math.PI/180));
    G_atY = 100 * Math.sin(angleRotation*(Math.PI/180));
  }

/*Resets the canvas' width and height to default values as specified on 
  the canvas initialization in main, and then calls reload*/ 
function resize() {
  canvas.width=window.innerWidth-200; 
  canvas.height=window.innerHeight-250; 
  window.location.reload(); 
}


