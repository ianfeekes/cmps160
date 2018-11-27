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

function tick() {
  //Updates animation of all geometry before rendering 
  currScene.updateAnimation(); 
  viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, G_atX, G_atY, 0, 0, 0, 1);
  //Checks to see if we need to be dealing with orthagonal or perspective view 
  if(perspective){
  /*For some reason casting the value of the far slider to a "number" works*/ 
    projMatrix.setPerspective(25, canvas.width/canvas.height, .2, 10);
  }
  else{
    projMatrix.setOrtho(-1, 1, -1, 1, .2, 10);
  }

  //Determining 
  if(normS)
  {
    //useShader(gl, lightingShaders);
    gl.uniform1f(u_LightSwitch, 1.0);
  }
  else
  {
    //useShader(gl, regularShaders); 
    gl.uniform1f(u_LightSwitch, 0.0);
  }

  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
  //gl.uniform3f(u_AmbientLight, aSlider.value/10, aSlider.value/10, aSlider.value/10);
  gl.uniform3f(u_AmbientLight, aVal/10, aVal/10, aVal/10); 
  ambientThrob(); 

  // Set the light direction (in the world coordinate)
  gl.uniform3f(u_LightPosition, lX, lY, lZ);
  sendTextToHTML(strArr[idx], textBox); 

  currScene.render();
  requestAnimationFrame(tick, canvas);
}

function ambientThrob()
{
  if(ticker<30)
  {
    ticker+=.5; 
    aVal+=.03; 
  }
  else if(ticker<60)
  {
    ticker+=.5; 
    aVal-=.03; 
  }
  else ticker =0; 
}


