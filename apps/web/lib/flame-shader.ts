export const flameVertex = `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
export const flameFragment = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uGravity;
uniform float uFlow;
uniform float uOxygen;
uniform float uCool;
uniform float uAngle;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float noise(vec3 p){
 vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){float value=0.0;float amplitude=.5;for(int i=0;i<4;i++){value+=amplitude*noise(p);p=p*2.03+vec3(1.7,2.4,3.1);amplitude*=.5;}return value;}
void main(){
 vec2 uv=(vUv-.5)*vec2(3.7,3.4);
 vec3 color=vec3(0);float alpha=0.0;
 float ca=cos(uAngle),sa=sin(uAngle);
 for(int i=0;i<48;i++){
  vec3 p=vec3(uv,2.0-float(i)*.085);
  p.x-=uFlow*(p.y+.65)*.32;
  p.xz=mat2(ca,-sa,sa,ca)*p.xz;
  float sphere=.69-length(vec3(p.x,p.y*.92,p.z));
  float y=clamp((p.y+.8)/(1.65+uGravity*.8),0.0,1.0);
  float radius=.52*pow(max(0.0,1.0-y),.72);
  float tapered=radius-length(p.xz);
  tapered=min(tapered,min(p.y+.8,1.0+uGravity*.8-p.y));
  float shape=mix(sphere,tapered,clamp(uGravity*1.7,0.0,1.0));
  float turbulence=fbm(p*4.2+vec3(0,-uTime*1.6,0));
  float density=clamp(shape*7.0+(turbulence-.5)*1.25,0.0,1.0);
  if(uCool>.5){density=exp(-abs(sphere)*28.0)*.04;}
  float sampleAlpha=density*.18*(.65+uOxygen*.6);
  vec3 blue=vec3(.12,.42,1.0),amber=vec3(1.0,.2,.025),cream=vec3(1.0,.72,.24);
  vec3 heat=mix(blue,amber,smoothstep(-.65,.4,p.y));
  heat=mix(heat,cream,pow(density,1.9));
  heat=mix(heat,vec3(.3,.52,.7),uCool);
  color+=(1.0-alpha)*heat*sampleAlpha*1.0;
  alpha+=(1.0-alpha)*sampleAlpha;
 }
 gl_FragColor=vec4(color,alpha);
}
`;
