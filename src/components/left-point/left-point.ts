import { Component, HostListener,Input} from '@angular/core';

@Component({
selector: 'left-point',
templateUrl: './left-point.html'
})
export class LeftPoint {
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
		let pa = this.data["r"]
		angel = (angel>0)?angel:360+angel;
		angel-=180;
		angel = (angel>0)?angel:360+angel;
		angel-=pa;
		angel = (angel>0)?angel:360+angel;
		this.checkOverLines(angel)
	}
	checkOverLines(angel){
		
		for(var i=0;i<this.lines.length;i++){
			this.lines[i].over = ((this.lines[i].start<this.lines[i].end) && (angel>this.lines[i].start && angel<this.lines[i].end)) || ( (this.lines[i].end<this.lines[i].start) && (angel>this.lines[i].start || angel<this.lines[i].end) );
		}
	}
	addLine(){
		this.lines = [{
			start:270,
			r:300,
			end:330,
			over:false
		},{
			start:30,
			r:60,
			end:90,
			over:false
		}]
	}

	selected:boolean = false
	startX:number;
	startY:number;
	draw:boolean;
	rigth:boolean;
	newShape:number = 0;
	lines = [];
	constructor(){

	}
}