
// Create demo application
var app = new p2.WebGLRenderer(function(){

  // Create a World
  var world = new p2.World({
      gravity: [0, -10] // Set gravity to -10 in y direction
  })
  this.setWorld(world)

  // Set high friction so the wheels don't slip
  world.defaultContactMaterial.friction = 100

  // Create ground shape (plane)
  var planeShape = new p2.Plane();
  // Create a body for the ground
  planeBody = new p2.Body({
    mass: 0  // Mass == 0 makes the body static
  });
  planeBody.addShape(planeShape); // Add the shape to the body
  world.addBody(planeBody);       // Add the body to the World


  // ## vvv demo code vvv

  // Add circle bump in the center
  circleShape = new p2.Circle(2); // Circle shape of radius 2
  circleBody = new p2.Body({
      position:[0, -1] // Set initial position
  });
  circleBody.addShape(circleShape);
  world.addBody(circleBody);
  // Create chassis for our car
  chassisBody = new p2.Body({
      mass : 1,        // Setting mass > 0 makes it dynamic
      position: [-4,1] // Initial position
  });
  chassisShape = new p2.Rectangle(1,0.5);                     // Chassis shape is a rectangle
  chassisBody.addShape(chassisShape);
  world.addBody(chassisBody);
  // Create wheels
  wheelBody1 = new p2.Body({ mass : 1, position:[chassisBody.position[0] - 0.5,0.7] });
  wheelBody2 = new p2.Body({ mass : 1, position:[chassisBody.position[0] + 0.5,0.7] });
  wheelShape1 = new p2.Circle(0.2);
  wheelShape2 = new p2.Circle(0.2);
  wheelBody1.addShape(wheelShape1);
  wheelBody2.addShape(wheelShape2);
  world.addBody(wheelBody1);
  world.addBody(wheelBody2);
  // Constrain wheels to chassis with revolute constraints.
  // Revolutes lets the connected bodies rotate around a shared point.
  revoluteBack = new p2.RevoluteConstraint(chassisBody, wheelBody1, {
      localPivotA: [-0.5, -0.3],   // Where to hinge first wheel on the chassis
      localPivotB: [0, 0],
      collideConnected: false
  });
  revoluteFront = new p2.RevoluteConstraint(chassisBody, wheelBody2, {
      localPivotA: [0.5, -0.3], // Where to hinge second wheel on the chassis
      localPivotB: [0, 0],      // Where the hinge is in the wheel (center)
      collideConnected: false
  });
  world.addConstraint(revoluteBack);
  world.addConstraint(revoluteFront);

  // Enable the constraint motor for the back wheel
  // revoluteBack.enableMotor();
  // revoluteBack.setMotorSpeed(10); // Rotational speed in radians per second

  // ## ^^^ demo code ^^^

  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 87: // w
        chassisBody.force[1] += 2000
        break
      case 65: // a
        chassisBody.force[0] -= 100
        break
      case 83: // s
        chassisBody.force[1] -= 1000
        break
      case 68: // d
        chassisBody.force[0] += 100
        break
    }
    switch (event.Keycode) {
      case 81: // q
        chassisBody.angularVelocity -= 40
        break
      case 69: // e
        chassisBody.angularVelocity += 40
        break
    }
  })

  // Set our camaera viewport
  this.frame(0, 0, 8, 6)
})
