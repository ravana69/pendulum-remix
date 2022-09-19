// BEGIN CUSTOMIZATION //

// Number of pendulums
var count = 120;
// Duration of entire oscillation cycle (seconds)
var cycle_duration = 500;
// Duration of one full swing of bottom pendulum (seconds)
var max_swing_duration = 10;
// Length of pendulum's arc (degrees)
var arc = 720;

// END CUSTOMIZATION //

// number of swings bottom pendulum makes in full cycle
var min_swings = cycle_duration / max_swing_duration;

// create pendulums such that each one performs one more oscillation per the entire cycle than the pendulum beneath it
for (var i = count - 1; i >= 0; i--) {
	var length = Math.pow(min_swings / (i + min_swings), 2);
	var p = new Pendulum(length, arc, max_swing_duration, i / count * 360);
}

function Pendulum(length, arc, max_swing_duration, hue) {
	// pendulum representation
	this.node = document.createElement('div');
	this.mass = document.createElement('div');
	this.mass.style.backgroundColor = 'hsla(' + hue + ', 100%, 50%, 0.075)';
	this.node.appendChild(this.mass);
	// unitless length, 0.0 - 1.0, shortest to longest
	this.length = length;
	this.swing_arc_half = arc / 2;
	// the part of the pendulum equation that matters for calculating a swing period is the square root of the length. All other constants are the same, so ignore them.
	this.swing_duration = max_swing_duration * Math.sqrt(length);
	
	this.node.classList.add('pendulum');
	if (arc <= 180) {
		this.node.style.top = '10%';
		this.node.style.height = 'calc(' + length * 80 + '% - 30px)';
	} else {
		this.node.style.top = '50%';
		this.node.style.height = 'calc(' + length * 80 + '% - 30px)';
	}
	
	document.body.appendChild(this.node);
	
	// animate rotation, forever, using yoyo
	var anim_from = {
		rotation: this.swing_arc_half + 'deg'
	};
	var anim_to = {
		yoyo: true,
		repeat: -1,
		ease: Power0.easeInOut,
		
		rotation: -this.swing_arc_half + 'deg'
	};
	this.animation = TweenMax.fromTo(this.node, this.swing_duration / 2, anim_from, anim_to);
	this.animation.timeScale(0.5);
}