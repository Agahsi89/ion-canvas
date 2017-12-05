import { Component,HostListener,Input,EventEmitter,Output} from '@angular/core';

@Component({
selector: 'main-line',
templateUrl: './main-line.html'
})
export class Mainline {
	@Input() data:any = {}

	@Output() create_shape = new EventEmitter<any>()

	@HostListener('touchstart', ['$event'])
	touchstart(event:TouchEvent) {
		console.log("touchstart")
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
		this.selected = true;
		//this.selected = !this.selected;
	}

	@HostListener('touchend', ['$event'])
	touchend(event:TouchEvent) {
		if(this.draw){
			this.draw = false;
			this.selected = false;
			if(this.newShape>0){
				this.create_shape.emit({shape:this.newShape})
			}
		}
		//this.selected = !this.selected;
	}
	@HostListener('touchmove', ['$event'])
	touchmove(event:TouchEvent) {
		if(!this.draw){
			this.draw = true;
		}
		
		let x = event.touches[0].clientX;
		let y = event.touches[0].clientY;
		let nx = x-this.startX;
		let ny = y-this.startY
		let r = Math.sqrt(nx*nx+ny*ny);
		let angel = Math.atan2(-ny,-nx)*(180/Math.PI);
		angel = (angel>0)?angel:360+angel;
		
		let laStart=this.data["r"]
		let laEnd=this.data["r"]+180;
		laEnd = (laEnd<360)?laEnd:(laEnd-360);
		this.rigth = ((laStart<laEnd) && (angel>laStart && angel<laEnd)) || ( (laEnd<laStart) && (angel>laStart || angel<laEnd) );
		if(r>30){
			if(r>50){
				if(r>100){
					if(r>120){
						if(r>140){
							if(r>170){
								this.newShape = 0;
							}else{
								this.newShape = 5;
							}
						}else{
							this.newShape = 4;
						}
						
					}else{
						this.newShape = 3;	
					}
				}else{
					this.newShape = 2;
				}
			}else{
				this.newShape = 1;
			}
			
		}//this.selected = !this.selected;
	}

	selected:boolean = false
	startX:number;
	startY:number;
	draw:boolean;
	rigth:boolean;
	newShape:number = 0;
	constructor(){
		this.draw  = false
	}
}