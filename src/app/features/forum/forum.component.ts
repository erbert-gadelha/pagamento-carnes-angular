import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { UserService } from '../../service/user.service';

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

  private lastMessage:MessageDTO|null|undefined = undefined;
  private lastElement:Element|null = null;

  private lastFetchedMessage:MessageDTO|null = null;
  private lastFetchedElement:Element|null = null;

  private lastIndex:number = 0;
  private socket:WebSocket|null = null;


  async getLastIndex () {
    const response1:Response|null = await ServerService.fetch('api/v1/messages','GET', null);
    this.lastIndex = Number.parseInt(await response1?.json().then((data) => data));
    console.log("lastIndex", this.lastIndex);

    this.fetchMessages();
  }

  async fetchMessages() {
    if(this.lastIndex < 0)
      return;

    const response2:Response|null = await ServerService.fetch(`api/v1/messages/${this.lastIndex}`,'GET', null);
    const messages:string[] = await response2?.json().then((data) => data);

    const messageDTOs:MessageDTO[] = messages.map(message => { return JSON.parse(message)}).reverse();
    messageDTOs.forEach(message => this.loadMessage(message));
    messageDTOs.forEach(message => console.log(message));
    this.lastIndex = this.lastIndex - 5;
  }

  async messageWebsocket() {
    this.socket = new WebSocket("ws://localhost:8080/ws");

    this.socket.onopen = () => {
        console.log("Conexão estabelecida")    
        this.socket?.send("SUBSCRIBE /topic/news");    
    };    
    this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.createMessage(data);
    }
    this.socket.onerror = (error) => {
      console.error("Erro:", error)
      setTimeout(this.messageWebsocket, 1000);
    };
    this.socket.onclose = () => console.log("Conexão fechada");    
    
    
  }

  public sendMessage(message:string):void {
    this.socket?.send("SEND /topic/news " + JSON.stringify({
        sender: UserService.getUser()?.login,
        content: message
    }));
  }




  ngOnInit(): void {
    this.getLastIndex();
    this.messageWebsocket();
  }

  public createElement(message:MessageDTO):Element {
    const element = this.renderer.createElement('div');

    // Adiciona conteúdo condicionalmente
    if (message.sender) {
      const sender = this.renderer.createElement('h4');
      const text = this.renderer.createText(message.sender);
      this.renderer.appendChild(sender, text);
      this.renderer.appendChild(element, sender);
    }

    const messageText = this.renderer.createText(message.content);
    this.renderer.appendChild(element, messageText);

    this.renderer.addClass(element, 'message');
    if (message.sender == UserService.getUser()?.login)
      this.renderer.addClass(element, 'mine');

    return element;
  }


  public loadMessage(message:MessageDTO): void {
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

  public createMessage(message:MessageDTO):void {
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
    this.sendMessage(value);
    //this.createMessage({sender:null, content:value});
  }

}

interface MessageDTO {
  sender:string|null,
  content:string
}