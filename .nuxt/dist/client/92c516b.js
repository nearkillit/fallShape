(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{383:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return c}));var o=n(19),r=n(32),h=(n(53),n(384)),d=n(386),c=function(){function e(t){Object(o.a)(this,e),this.state={},this.addbox=[],this.lastTime="",this.fixedTimeStep=1/60,this.maxSubSteps=10,this.CONSTANT={initPoint:{x:0,y:0,z:0},initWeight:5,initMass:5,positionY:20,margin:20,rotate:{x:0,y:0,z:0},ground_size:100,axis_rotate:0,limit:2,width:100,height:100,color1:"#cccccc"},this.world=new d.World,this.scene=new h.k,this.camera=new h.i(80,window.innerWidth/window.innerHeight),this.renderer=new h.m({canvas:t.$canvas}),this.props=t,this.init()}return Object(r.a)(e,[{key:"init",value:function(){var e=this;this.world.gravity.set(0,-9.82,0),this.camera.position.set(0,0,100),this.generate();var t=new h.a(16777215,1);this.scene.add(t);var n=new h.c(16777215,1);this.scene.add(n),this.renderer.setSize(window.innerWidth,window.innerHeight),this.render(),requestAnimationFrame((function(){return e.animate(0)}))}},{key:"Ground",value:function(e){var body=new d.Body({mass:0});body.addShape(new d.Plane),body.quaternion.setFromAxisAngle(new d.Vec3(1,0,0),-Math.PI/2);var t=new h.j(e,e),n=new h.f({color:this.CONSTANT.color1,side:h.d}),o=new h.e(t,n);return o.rotation.x=-Math.PI/2,o.position.y=0,{body:body,mesh:o}}},{key:"Box",value:function(e){var t=e.point,n=e.weight,o=e.mass,body=new d.Body({mass:o,position:new d.Vec3(t.x,t.y,t.z),shape:new d.Box(new d.Vec3(n/2,n/2,n/2))}),r=new h.b(n,n,n),c=new h.h({color:11141120,roughness:0}),w=new h.e(r,c);return w.position.set(t.x,t.y,t.z),{body:body,mesh:w}}},{key:"generate",value:function(){var e=this.Ground(this.CONSTANT.ground_size);this.scene.add(e.mesh),this.world.addBody(e.body);var t={x:0,y:this.CONSTANT.positionY,z:0},n=this.state.box=this.Box({point:t,weight:this.CONSTANT.initWeight,mass:this.CONSTANT.initMass});this.scene.add(n.mesh),this.world.addBody(n.body)}},{key:"animate",value:function(time){var e=this,t=this.state.box;if(void 0!==this.lastTime){var dt=(time-this.lastTime)/1e3;this.world.step(this.fixedTimeStep,dt,this.maxSubSteps)}var n=t.mesh,body=t.body;n.position.copy(body.position),n.quaternion.copy(body.quaternion),this.addbox.map((function(e){return e.mesh.position.copy(e.body.position),e.mesh.quaternion.copy(e.body.quaternion),e})),this.lastTime=time,this.render(),requestAnimationFrame((function(){return e.animate(0)}))}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"makeBox",value:function(e){var t=new h.l;t.x=e.x/window.innerWidth*2-1,t.y=-e.y/window.innerHeight*2+1,t.y=t.y<0?.1:t.y;var n={x:t.x*this.CONSTANT.ground_size,y:t.y*this.CONSTANT.ground_size,z:0},o=this.Box({point:n,weight:this.CONSTANT.initWeight,mass:this.CONSTANT.initMass});this.addbox.push(o),this.scene.add(o.mesh),this.world.addBody(o.body)}},{key:"getRandomInt",value:function(e){return Math.floor(Math.random()*e)}}]),e}()}}]);