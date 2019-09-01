(function (root) {
	"use strict";

	////////////////////
	// all functions. //
	////////////////////
	// first class instantiation.
	function proBar(options){

		this.colorBar = "#2a2a2a";
		this.wrapper_color = "#ecf0f1";
		this.speedAnimation = 0.3; // in seconds
		this.wrapper = "body"; // default value of appending.
		this.finishAnimation = true;
		this.classNameBar = "progressBar"; // default.
		this.wrapperId = "wrapper-progressBar"; // default.

		this.options = options || {};

		if(this.options.color) { this.colorBar = this.options.color }
		if(this.options.bgColor) { this.wrapper_color = this.options.bgColor }
		if(this.options.speed) { this.speedAnimation = this.options.speed }
		if(this.options.wrapper) { this.wrapper = this.options.wrapper }
		if(this.options.finishAnimation == false) { this.finishAnimation = this.options.finishAnimation;}
		if(this.options.classNameBar) { this.classNameBar = this.options.classNameBar }
		if(this.options.wrapperId) { this.wrapperId = this.options.wrapperId }

	    createBar(this.wrapper,this.classNameBar,this.colorBar,this.wrapperId,this.wrapper_color);

		// move the bar
		this.move = (percent) => {

			$("."+this.classNameBar).css({
				width: percent+"%",
				transition : "width "+this.speedAnimation+"s"
			});

			$("#"+this.wrapperId).css({
				"height": "5px"
			});

			// verify if is 100%
			setTimeout(() => {
				console.log("********************************");
				console.log(this.finishAnimation);
				console.log(percent == 100);
				console.log(percent == 100 && this.finishAnimation == true);
				console.log("********************************");

				if(percent == 100 && this.finishAnimation == true) {
					console.log("je vais faire l'animation bro");
					$("#"+this.wrapperId).css({
						"height": "0px",
						"transition" : "all 0.3s"
					});
					// reset bar to zero.
					$("."+this.classNameBar).css({
						width: "0%"
					});
				}
			},this.speedAnimation * 1000);
		}
		var setSpeed = (speed) => {
			this.speedAnimation = speed;
		}
		var setColor = (color) => {
			this.colorBar = color;
			$("."+this.classNameBar).css({ 
				"background-color" : this.colorBar
			});
		}
		var setWrapperColor = (color) => {
			this.wrapper_color = color;
			$("#"+this.wrapperId).css({ 
				"background-color" : this.wrapper_color
			});
		}
		var setFinishAnimation = (boolean) => {
			this.finishAnimation = boolean;
		}
		
		let ProBar = {
          setSpeed,
          setColor,
          setWrapperColor,
          setFinishAnimation,
          goto: (percent,time = null) => {
          	if(time != null) {setSpeed(time)}
          	this.move(percent);
          }
        };

		return ProBar;
	}	


	var createBar = ( element,classNameBar,colorBar,wrapperId,wrapper_color ) => {
		var Css = `
			.${classNameBar} {
				width : 0px;
				height : 5px;
				background-color: ${colorBar};
			}
			#${wrapperId} {
				width : 100%;
				height : 5px;
				background-color : ${wrapper_color};
    			overflow: hidden;
			}
		`;

		var htmlBar = `<div id="${wrapperId}"><div class="${classNameBar}"></div></div>`;
		$(element).prepend(htmlBar);
		$("head").append(`
			<style>
				${Css}
			</style>
			`);
	}
	
	if (window.jQuery) {  
    	console.log("JQuery is installed !");
	    root.ProBar = proBar;
    } else {
        // jQuery is not loaded
        console.warn("No Jquery - add it as CDN");
        return false;
    }
}(this));