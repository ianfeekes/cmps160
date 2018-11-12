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

function tick() {
  for(let i=0;i<currScene.geometries.length;i++)
  {
    currScene.geometries[i].updateAnimation(); 
  }
  viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, G_atX, G_atY, 0, 0, 0, 1);
  projMatrix.setPerspective(zoomSlider.value, canvas.width/canvas.height, 0.1, 100);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
  currScene.renderGeometry();
  requestAnimationFrame(tick, canvas);
}


