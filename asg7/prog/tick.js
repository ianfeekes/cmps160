/*Ian Feekes
 *#1474914
 *ifeekes@ucsc.edu
 *cmps160 asg5
 *tick.js
 *
 *pretty much copied directly from previous assignments. It goes through the 
 *scene and animates all the geometries. It adjust the view matrix for 
 *perspective purposes. It calls requestAnimationFrame to the canvas
 */ 
 let ticker = 15; 
 let aVal = 2.5; 
 let deathFlag = false; 
 let onceFlag=  false; 
 let aFluc=30; 
 let rate=.5; 

function tick() {
  //Updates animation of all geometry before rendering 
  currScene.updateAnimation(); 
  viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, G_atX, G_atY, 0, 0, 0, 1);
  //Checks to see if we need to be dealing with orthagonal or perspective view 
  if(perspective){
  /*For some reason casting the value of the far slider to a "number" works*/ 
    projMatrix.setPerspective(30, canvas.width/canvas.height, .2, 10);
  }
  else{
    projMatrix.setOrtho(-1, 1, -1, 1, .2, 10);
  }


  //set camera parameters 
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
  gl.uniform3f(u_AmbientLight, aVal/10, aVal/10, aVal/10); 
  //constantly throb ambient light 
  ambientThrob(); 

  //detect if the user has their glowstick out and change lighting variables based on this. 
  if(gToggle)
  {
    //So if we want to continue toggling we can move the shape again 
    if(onceFlag)
    {
      //move it back to where we want it
      lightCube.move(-1000,-1000); 
      //reset the ambient lighting to default
      aVal-=.2; 
      onceFlag=false; 
    }
    gl.uniform1f(u_LightSwitch, 1.0); 
    // Set the light direction (in the world coordinate)
    gl.uniform3f(u_LightPosition, lX, lY, lZ);
  }
  else if(!gToggle)
  {
    gl.uniform1f(u_LightSwitch, 0.0);
    if(!onceFlag)
    {
     /*This is a very crude solution, but it works. We only want to have one glowstick, 
       and we don't want to re-instantiate a large and significant data structure every 
       single time some monkey at the keyboard presses 'u' even though this feature of
       changing lighting is still desirable. Hence we just send the light cube out of sight
       and it won't bother us. However, it will start tanking our performance is an extra
       linear transformation must be performed each frame, so we keep a flag to make sure
       it's only done once*/  
     lightCube.move(1000,1000); 
     aVal+=.2; 
     onceFlag=true; 
    }
  }

  sendTextToHTML(strArr[idx], textBox); 

  if(outOfBounds())
  {
    idx=4; 
    if(!deathFlag)
    {
    currScene.clearGeometry(); 
    let c = new Cube(8,0,0,true); 
    c.setColor([.5,.5,.5]); 
    currScene.addGeometry(c);
    deathFlag=true; 
    }
  }

  currScene.render();
  requestAnimationFrame(tick, canvas);
}

/*Creates a pulsing ambient light for the rave atmosphere*/ 
function ambientThrob()
{
  if(ticker<aFluc)
  {
    ticker+=rate; 
    aVal+=rate/15; 
  }
  else if(ticker<aFluc*2)
  {
    ticker+=rate; 
    aVal-=rate/15; 
  }
  else ticker =0; 
}


