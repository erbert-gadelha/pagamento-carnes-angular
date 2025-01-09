import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent  implements OnInit{


  @ViewChild('textarea') textarea: ElementRef | any;
  @ViewChild('messages') messages: ElementRef | any;

  constructor(private renderer: Renderer2) {}

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
      {sender:'Fulano', value:"da!"},
      {sender:'Sicrano', value:"Tu gosta de peixe, boy?"}
    ];

    messages.forEach(message => this.loadMessage(message))
  }

  public createElement(message:Message):Element {
    const element = this.renderer.createElement('div');

    // Adiciona conteúdo condicionalmente
    if (message.sender) {
      const sender = this.renderer.createElement('h4');
      const text = this.renderer.createText(message.sender);
      this.renderer.appendChild(sender, text);
      this.renderer.appendChild(element, sender);
    }

    const messageText = this.renderer.createText(message.value);
    this.renderer.appendChild(element, messageText);

    this.renderer.addClass(element, 'message');
    if (!message.sender)
      this.renderer.addClass(element, 'mine');

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
    this.renderer.insertBefore(container, element, container.firstChild);
    //container.insertBefore(element, container.firstChild);
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

    //this.messages.nativeElement.appendChild(element);
    const container:Element = this.messages.nativeElement;
    this.renderer.appendChild(container, element);
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