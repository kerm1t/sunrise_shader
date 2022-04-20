#version 410 core

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

uniform float slowtime = 0.4; // < 1 slow down, > 1 speed up
uniform float sun_radius = 0.15;
uniform float sun_east = 1.05; // for full screen (window: 0.6)
uniform float sun_north = 0.8;

float circle(vec2 center, float radius)
{
  float AR = u_resolution.x / u_resolution.y;
  vec2 coord = gl_FragCoord.xy/u_resolution.xy;
  return 1.0-step(sun_radius,distance(vec2(coord.x*AR,coord.y),vec2(0.5*AR+sin(u_time*slowtime)*sun_east,cos(u_time*slowtime)*sun_north)));
}
  
void main(void)
{
  vec2 mouse = u_mouse.xy/u_resolution.xy;
  float y = gl_FragCoord.y/u_resolution.y;

  float r = y*cos(u_time*slowtime);
  float g = y*cos(u_time*slowtime)*0.6;
  float b = y*1.0-cos(u_time*slowtime)*0.5;
  vec3 colb = vec3(r,g,b); // sky = color ramp
  vec3 col = vec3(0.3,0.3,circle(mouse,0.1)); // sun
  gl_FragColor = vec4(colb+col,1.0);
}