import { Component, ViewChild, Renderer ,Output,EventEmitter} from '@angular/core';
import { Platform } from 'ionic-angular';
 
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDraw {
    @Output() draw = new EventEmitter<any>()


    @ViewChild('myCanvas') canvas: any;
 
    canvasElement: any;
    lastX: number;
    lastY: number;
 
    currentColour: string = 'rgba(200,200,200,1)';
    brushSize: number = 20;
    private startX;
    private startY;
    constructor(public platform: Platform, public renderer: Renderer) {
        console.log('Hello CanvasDraw Component');
    }
 
    ngAfterViewInit(){
 
        this.canvasElement = this.canvas.nativeElement;
 
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', (this.platform.height()- 150)+ '');
 
    }
 
    handleStart(ev){
 
        this.startX =  this.lastX = ev.touches[0].pageX;
        this.startY =  this.lastY = ev.touches[0].pageY-56;
    }
    handleEnd(ev){
      let _x = (this.startX + this.lastX)/2 ;
      let _y = (this.startY + this.lastY)/2;
      let _xD = (this.startX - this.lastX) ;
      let _yD = (this.startY - this.lastY);
     
      let ctx = this.canvasElement.getContext('2d');
      ctx.clearRect(0, 0, 1500, 2000);
      if(_xD*_xD +_yD*_yD<25) return;
      let angel = Math.atan2(_yD,_xD)*(180/Math.PI);
      angel = (angel>0)?angel:360+angel;
      this.draw.emit({x:_x, y:_y,r:angel,right:false, newShape:0})
    }
    handleMove(ev){
 
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY-56;
 
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();      
 
        this.lastX = currentX;
        this.lastY = currentY;
 
    }
 
}
