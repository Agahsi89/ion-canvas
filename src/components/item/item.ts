import { Component,Input,Output, EventEmitter} from '@angular/core';

@Component({
selector: 'item',
templateUrl: './item.html'
})
export class Item {
	@Input() data:any
	@Output() create_shape = new EventEmitter<any>()
	selected:boolean = false
	constructor(){

	}
	createShape($event){
		this.create_shape.emit($event)
	}
}