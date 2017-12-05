import { Component, HostListener, Input} from '@angular/core';

@Component({
selector: 'rigth-point',
templateUrl: './rigth-point.html'
})
export class RigthPoint {
	@Input() data:any = {}
	
		@HostListener('touchstart', ['$event'])
		touchstart(event:TouchEvent) {
			console.log("start")
			this.startX = event.touches[0].clientX;
			this.startY = event.touches[0].clientY;
			this.selected = true;
			//this.selected = !this.selected;
		}
	
	
		@HostListener('touchend', ['$event'])
		touchend(event:TouchEvent) {
			console.log("end")
			if(this.draw){
				this.draw = false;
				this.selected = false;
				this.lines = [];
			}
			//this.selected = !this.selected;
		}
	
		@HostListener('touchmove', ['$event'])
		touchmove(event:TouchEvent) {
			console.log("move")
			if(!this.draw){
				this.draw = true;
				this.addLine()
			}
			let x = event.touches[0].clientX;
			let y = event.touches[0].clientY;
			let nx = x-this.startX;
			let ny = y-this.startY
			let r = Math.sqrt(nx*nx+ny*ny);
			let angel = Math.atan2(-ny,-nx)*(180/Math.PI);
			//angel = (angel>0)?angel:360+angel;
			let pa = this.data["r"]
			
			angel+=180;
			angel-=pa;
			angel = (angel>0)?angel:360+angel;
		//	
		//	angel = (angel>360)?angel-360:angel;
			//angel-=pa;
			//angel = (angel>0)?angel:360+angel;
			this.checkOverLines(angel,r)
		}
		checkOverLines(angel,r){
			for(var i=0;i<this.lines.length;i++){
				
				this.lines[i].over =r && ((this.lines[i].start<this.lines[i].end) && (angel>this.lines[i].start && angel<this.lines[i].end)) || ( (this.lines[i].end<this.lines[i].start) && (angel>this.lines[i].start || angel<this.lines[i].end) );
			}
		}
		selected:boolean = false
		startX:number;
		startY:number;
		draw:boolean;
		rigth:boolean;
		newShape:number = 0;
		lines = [];
		addLine(){
			this.lines = [{
				start:90,
				r:120,
				end:150
			},{
				start:210,
				r:240,
				end:270
			}]
		}

		constructor(){
	
		}
	}