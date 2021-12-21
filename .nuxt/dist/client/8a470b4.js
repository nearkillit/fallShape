(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{385:function(t,e,h){"use strict";h.r(e),h.d(e,"default",(function(){return d}));var o=h(19),r=h(32),n=(h(40),h(5),h(15),h(394)),l=h(66),d=function(){function t(e){var h=this;Object(o.a)(this,t),this.floorSize={width:800,height:500,groundHeight:50,wallWidth:100,color:"#000000"},this.humanSize={height:100},this.goalSize={width:90,height:100},this.enviroment={density:5e-4,frictionAir:.02,restitution:.8,friction:.1},this.haveShape={x:1100,y:300},this.startShape="",this.goalShape="",this.Engine=n.Engine,this.Render=n.Render,this.World=n.World,this.Constraint=n.Constraint,this.Body=n.Body,this.Bodies=n.Bodies,this.engine=this.Engine.create(),this.render=this.Render.create({element:e.body,engine:this.engine,options:{width:1400,height:600,wireframes:!1,background:"rgba(255, 255, 255, 0.5)"}}),this.engine.world.gravity.y=.98,this.shapes=[],this.props=e,n.Events.on(this.engine,"collisionStart",(function(t){h.goalCheck(t)})),this.init()}return Object(r.a)(t,[{key:"init",value:function(){this.ground(),this.Engine.run(this.engine),this.Render.run(this.render)}},{key:"hasShape",value:function(t){var e;"circle"===t.name?e=this.circle({x:this.haveShape.x,y:this.haveShape.y,width:t.width}):"rectangle"===t.name?e=this.rectangle({x:this.haveShape.x,y:this.haveShape.y,width:t.width,height:t.height}):"trapezoid"===t.name&&(e=this.trapezoid({x:this.haveShape.x,y:this.haveShape.y,width:t.width,height:t.height,slope:t.slope}));var h=this.Body.create({parts:[e],isStatic:!0});this.World.add(this.engine.world,h)}},{key:"ground",value:function(){var t=this.Body.create({parts:[this.Bodies.rectangle(this.floorSize.width/2,this.floorSize.height-this.floorSize.groundHeight/2,this.floorSize.width-2*this.floorSize.wallWidth,this.floorSize.groundHeight,{render:{fillStyle:this.floorSize.color}}),this.Bodies.rectangle(this.floorSize.wallWidth/2,(this.floorSize.height+this.humanSize.height)/2,this.floorSize.wallWidth,this.floorSize.height-this.humanSize.height,{render:{fillStyle:this.floorSize.color}}),this.Bodies.rectangle(this.floorSize.width-this.floorSize.wallWidth/2,(this.floorSize.height+this.humanSize.height)/2,this.floorSize.wallWidth,this.floorSize.height-this.humanSize.height,{render:{fillStyle:this.floorSize.color}})],isStatic:!0});this.World.add(this.engine.world,t)}},{key:"goal",value:function(){var t=this.Bodies.rectangle(this.floorSize.width-this.floorSize.wallWidth/2,this.humanSize.height/2,this.goalSize.width,this.goalSize.height,{render:{sprite:{texture:"/images/20735.jpg"}}});this.goalShape=t,this.World.add(this.engine.world,[t])}},{key:"circle",value:function(t){var e=this.Bodies.circle(t.x,t.y,t.width/2,this.enviroment);return this.shapes.push(e),this.World.add(this.engine.world,[e]),e}},{key:"rectangle",value:function(t){var rect=this.Bodies.rectangle(t.x,t.y,t.width,t.height,this.enviroment);return this.shapes.push(rect),this.World.add(this.engine.world,[rect]),rect}},{key:"trapezoid",value:function(t){var e=this.Bodies.trapezoid(t.x,t.y,t.width,t.height,t.slope,this.enviroment);return this.shapes.push(e),this.World.add(this.engine.world,[e]),e}},{key:"polygon",value:function(t){var e=this.Bodies.polygon(t.x,t.y,t.sides,t.width,this.enviroment);return this.shapes.push(e),this.World.add(this.engine.world,[e]),e}},{key:"makeShape",value:function(t){var e={x:0,y:this.humanSize.height/2};if(!(t.x>this.floorSize.width)){t.x<this.floorSize.wallWidth+t.width/2?e.x=this.floorSize.wallWidth+t.width/2:t.x>this.floorSize.width-this.floorSize.wallWidth-t.width/2?e.x=this.floorSize.width-this.floorSize.wallWidth-t.width/2:e.x=t.x;var h=t;h.x=e.x,h.y=e.y,"trapezoid"===t.name?this.trapezoid(h):"circle"===t.name?this.circle(h):"rectangle"===t.name&&this.rectangle(h)}}},{key:"readyShape",value:function(){var t={x:this.floorSize.wallWidth/2,y:0,width:60};this.startShape=this.circle(t),this.goal()}},{key:"start",value:function(){this.Body.applyForce(this.startShape,{x:this.startShape.position.x,y:this.startShape.position.y},{x:.2,y:0})}},{key:"reset",value:function(){this.Body.setVelocity(this.startShape,{x:0,y:0}),this.Body.setPosition(this.startShape,{x:this.floorSize.wallWidth/2,y:0})}},{key:"goalCheck",value:function(t){var e=this,h=t.pairs;h.length>0&&h.forEach((function(p){p.bodyA===e.startShape&&p.bodyB===e.goalShape&&(alert("ゴール！！"),l.UsersStore.fetchGoalAt(new Date),l.UsersStore.incrementGoal(),n.Events.off(e.engine,"collisionStart"))}))}},{key:"makeShapeStateRandom",value:function(t){var e=0,h=new Date,o={name:"",width:0,height:0,slope:0};e=t+h.getFullYear()+(h.getMonth()+1)+h.getDate(),e=Math.sin(e);var r=Math.round(100*(e+1))%3;return o.name=0===r?"circle":1===r?"trapezoid":"rectangle",e=t+h.getFullYear()+(h.getMonth()+1)+h.getDate()*h.getDate(),e=Math.sin(e),o.width=Math.round(150+100*e),e=t+h.getFullYear()+(h.getMonth()+1)*(h.getMonth()+1)+h.getDate(),e=Math.sin(e),o.height=Math.round(150+100*e),e=t+h.getFullYear()*h.getFullYear()+(h.getMonth()+1)+h.getDate(),e=Math.sin(e),o.slope=1+e,o}}]),t}()}}]);