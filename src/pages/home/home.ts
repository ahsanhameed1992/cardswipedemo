
import { Component, ViewChild, ViewChildren, QueryList,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/Rx';
 
import {
  Direction,
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
 
  @Component({
    selector: 'page-home',
  templateUrl: 'home.html'
  })
 
export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  
  constructor( private elmentRef: ElementRef) {
    this.stackConfig = {
       allowedDirections: [ Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }
  
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    
    this.cards = [];
  //  this.addNewCards();

  //   console.log(this.swingStack.cards[0]); // this is the stack
     //console.log(this.swingStack.stack.getCard);
    console.log(this.swingCards); // this is a list of cards
    // we can get the underlying stack
    // which has methods - createCard, destroyCard, getCard etc
  //  console.log(this.swingStack.stack);

    // and the cards
    // every card has methods - destroy, throwIn, throwOut etc
    this.swingCards.forEach((c) => console.log(c.getCard()));
  }

  // Called whenever we drag an element
onItemMove(element, x, y, r) {
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16*16 - abs, 16*16));
  let hexCode = this.decimalToHex(min, 2);
  
  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }
  
  element.style.background = color;
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
}

 onThrowOut(event: ThrowEvent) {
    console.log('Hook from the template', event.throwDirection);
  }
 
// Connected through HTML
voteUp(like: boolean) {
 // let removedCard = this.cards.pop();
 let card = this.swingStack.stack.getCard();
 console.log(card);
  if (like) {
   // this.recentCard = 'You liked: ' + removedCard.name;
    this.getCard().throwOut(Direction.LEFT, 0);
   	 
  } else {
   // this.recentCard = 'You disliked: ' + removedCard.name;
    this.getCard().throwOut(Direction.RIGHT, 0);
  }
}
 
// Add new cards to our array
addNewCards() { 
    for (let val =0; val <100; val++) {
      var name = {
    name: 'ahsan'
     };
      this.cards.push(name);
    }

}
 
// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
  
  while (hex.length < padding) {
    hex = "0" + hex;
  }
  
  return hex;
}

getElementRef() {
    return this.elmentRef;
  }

  getNativeElement() {
    return this.elmentRef.nativeElement;
  }

  getCard(): Card {
    return this.swingStack.stack.getCard(this.getNativeElement());
  }

  getNativeElement() {
    return this.elmentRef.nativeElement;
  }
}