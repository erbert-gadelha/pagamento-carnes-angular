import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit{


  @ViewChild('textarea') textarea: ElementRef | any;
  @ViewChild('messages') messages: ElementRef | any;

  private lastMessage:Message|null|undefined = undefined;
  private lastElement:Element|null = null;

  private lastFetchedMessage:Message|null = null;
  private lastFetchedElement:Element|null = null;

  ngOnInit(): void {
    setTimeout(() => {
        this.fetchMessages();
        this.createMessage({sender:null, value:"Gosto não, boy."});
    }, 200);

  }

  public fetchMessages(): void {
    const messages = [
      {sender:'Fulano', value:"Olá, aspirantes!"},
      {sender:'Fulano', value:"Dale Comparça!"},
      {sender:'Sicrano', value:"Tu gosta de peixe, boy?"}
    ];

    messages.forEach(message => this.loadMessage(message))
  }

  public createElement(message:Message):Element {
    const element = document.createElement("div");
    if(message.sender)
      element.innerHTML = `<h4>${message.sender}</h4> <span>${message.value}</span>`;
    else {
      element.innerHTML = `<span>${message.value}</span>`;
      element.classList.add("mine");
    }
    element.classList.add("message");

    return element;
  }


  public loadMessage(message:Message): void {
    const element:Element = this.createElement(message);

    if(this.lastFetchedMessage?.sender != message.sender) {
      element.classList.add("header-message", "footer-message");
    }
    if(this.lastFetchedMessage?.sender ==  message.sender) {
      this.lastFetchedElement?.classList.remove("header-message");
      element.classList.add("header-message");
    }

    const container = this.messages.nativeElement;
    container.insertBefore(element, container.firstChild);
    this.lastFetchedMessage = message;
    this.lastFetchedElement = element;
  }

  public createMessage(message:Message):void {
    const element:Element = this.createElement(message);

    if(this.lastMessage?.sender !== message.sender) {
      element.classList.add("header-message", "footer-message");
    }
    if(this.lastMessage?.sender ===  message.sender) {
      this.lastElement?.classList.remove("footer-message");
      element.classList.add("footer-message");
    }

    this.messages.nativeElement.appendChild(element);
    this.messages.nativeElement.scrollTo({ top: this.messages.nativeElement.scrollHeight, behavior: "instant" });
    this.lastMessage = message;
    this.lastElement = element;   
  }

  public submit(): void {
    let value = this.textarea.nativeElement.value;
    if(!value)
      return;

    value = value.trim();
    if(value.length == 0)
      return;

    this.textarea.nativeElement.value = null;
    this.createMessage({sender:null, value:value});
  }

}

interface Message {
  sender:string|null,
  value:string
}