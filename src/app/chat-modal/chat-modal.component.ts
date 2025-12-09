import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  clickable?: boolean
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModalComponent implements AfterViewChecked {

  @Input() drawer: MatSidenav | any;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @Output() closeChatEvent = new EventEmitter<void>();

  newMessage: string = '';

  messages: ChatMessage[] = [
    // {
    //   id: '1',
    //   text: "Hello! Welcome to Bhulekha Assistant. How can I help you today?p you today?",
    //   sender: 'bot',
    //   timestamp: new Date()
    // }
  ];

  inactiveTimer: any = null;
  lastActivityTime: number = Date.now();

  showmainmenu = true;

  subModules = [];
  awaitingApplicationNumber = false;
  showApplicationStatus = false;

  statusModules_AS: string[] = [
    "Mortgage Registration",
    "Certified Copy",
    "Mutation Request",
    "Property Transfer",
    "Land Records Viewing"
  ];

  quickActions: QuickAction[] = [
    { id: 'status', label: 'Application Status', colorClass: 'blue', icon: 'description' },
    { id: 'services', label: 'Services', colorClass: 'purple', icon: 'menu' },
    { id: 'faqs', label: 'FAQs', colorClass: 'green', icon: 'help' },
    { id: 'downloads', label: 'Downloads', colorClass: 'orange', icon: 'download' },
    { id: 'contact', label: 'Contact Us', colorClass: 'teal', icon: 'call' },
    { id: 'end', label: 'End Chat', colorClass: 'red', icon: 'cancel' }
  ];

  headerActions = [
    { icon: 'translate', title: 'Translate', click: () => this.onTranslateClick() },
    { icon: 'settings', title: 'Settings', click: () => this.onSettingsClick() },
    { icon: 'remove', title: 'Minimize', click: () => this.onMinimizeClick() },
    { icon: 'close', title: 'Close', click: () => this.closeChat() }
  ];

  languages = [
    { id: 1, code: 'en', label: 'English' },
    { id: 2, code: 'hi', label: 'हिंदी' }
  ];

  settingsOptions = [
    { id: 1, label: 'Clear History', action: () => this.onClearHistory() },
    { id: 2, label: 'Sound Notifications', action: () => this.onToggleSound() }
  ];

  lastSelectedModule: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked(): void { this.scrollToBottom(); }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch { }
  }

  trackByMessageId(index: number, msg: ChatMessage): string {
    return msg.id;
  }

  formatTimestamp(date: Date): string {
    const h = date.getHours();
    const m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 || 12;
    const mm = m < 10 ? `0${m}` : m;
    return `${hh}:${mm} ${ampm}`;
  }

  /* SEND MESSAGE */
  sendMessage(customText?: string): void {
    const text = (customText || this.newMessage).trim();
    if (!text) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages = [...this.messages, newUserMessage];
    this.newMessage = '';
    this.cdr.detectChanges();

    if (this.awaitingApplicationNumber) {
      this.awaitingApplicationNumber = false;
      this.handleApplicationNumber(text);
      return;
    }
  }

  showServices = false;

  /* QUICK ACTIONS HANDLER */
  handleAction(action: QuickAction): void {
    this.showmainmenu = false;

    if (action.id === 'status') {
      this.sendMessage("Application Status");
      this.subModules = this.statusModules_AS;
      this.showApplicationStatus = true;
      this.cdr.detectChanges();
      return;
    }

   else if (action.id === 'services') {
      this.showmainmenu = false;
      this.subModules = []; 
      this.showServices = true;
      this.cdr.detectChanges();
      return;
    }
    

    if (action.id === 'end') {
      this.closeChat();
      return;
    }

    this.sendMessage(action.label);
  }

  onServiceSelected(service: string) {
    this.sendMessage(service);  // user message
    this.showServices = false;
  
    this.messages = [
      ...this.messages,
      {
        id: Date.now().toString(),
        text: `You selected: ${service}`,
        sender: 'bot',
        timestamp: new Date()
      }
    ];
  
    this.cdr.detectChanges();
  }
  

  selectStatusModule(moduleName: string) {
    this.lastSelectedModule = moduleName;
    this.sendMessage(moduleName);

    this.subModules = [];
    setTimeout(() => {
      this.messages = [
        ...this.messages,
        {
          id: Date.now().toString(),
          text: "Please enter your Application Number (8–12 alphanumeric characters):",
          sender: 'bot',
          timestamp: new Date()
        }
      ];

      this.awaitingApplicationNumber = true;
      this.cdr.detectChanges();
    }, 200);
  }

  botHelpMessage: ChatMessage = {
    id: (Date.now() + 2).toString(),
    text: "Can I help you with anything else?",
    sender: 'bot',
    timestamp: new Date(),
    clickable: true
  };

  handleApplicationNumber(appId: string) {
    const pattern = /^[A-Za-z0-9]{8,12}$/;

    if (!pattern.test(appId)) {
      const errorMsg = `
❌ Invalid Application Number
━━━━━━━━━━━━━━━━━━
Please enter a valid application number  
(8–12 alphanumeric characters).
━━━━━━━━━━━━━━━━━━
`;
      this.messages = [...this.messages, {
        id: Date.now().toString(),
        text: errorMsg,
        sender: 'bot',
        timestamp: new Date()
      }];
      this.awaitingApplicationNumber = true;
      this.cdr.detectChanges();
      return;
    }

    let response: any = {};

    switch (this.lastSelectedModule) {
      case "Mortgage Registration":
        response = {
          title: "Application Status:",
          applicationId: appId,
          status: "Application Submitted",
          lastUpdated: "2025-11-15"
        };
        break;

      case "Certified Copy":
        response = {
          title: "Certified Copy Status:",
          applicationId: appId,
          status: "Document Ready for Download",
          lastUpdated: "2025-11-12"
        };
        break;

      case "Mutation Request":
        response = {
          title: "Mutation Request Status:",
          applicationId: appId,
          status: "Pending Field Verification",
          lastUpdated: "2025-11-14"
        };
        break;

      case "Property Transfer":
        response = {
          title: "Property Transfer Status:",
          applicationId: appId,
          status: "Awaiting Registration Approval",
          lastUpdated: "2025-11-10"
        };
        break;

      case "Land Records Viewing":
        response = {
          title: "Land Record Request:",
          applicationId: appId,
          status: "Record Retrieved Successfully",
          lastUpdated: "2025-11-09"
        };
        break;
    }

    const msg = `
${response.title}

Application Number: ${response.applicationId}
Status: ${response.status}
Last Updated: ${response.lastUpdated}
`;

    this.messages = [...this.messages, {
      id: Date.now().toString(),
      text: msg,
      sender: 'bot',
      timestamp: new Date()
    }];
    this.cdr.detectChanges();

    setTimeout(() => {
      this.messages = [...this.messages, this.botHelpMessage];
      this.cdr.detectChanges();
    }, 300);
  }

  onMessageClick(message: ChatMessage) {
    if (message.clickable) {
      message.clickable = false;
      this.sendMessage("Yes");
      this.showmainmenu = true;
      this.subModules = [];
      this.awaitingApplicationNumber = false;
      this.cdr.detectChanges();
    }
  }

  /* HEADER MENU ACTIONS */
  showLanguageMenu = false;
  showSettingsMenu = false;

  onTranslateClick() { this.showLanguageMenu = !this.showLanguageMenu; }
  onSettingsClick() { this.showSettingsMenu = !this.showSettingsMenu; }

  onClearHistory() {
    this.showmainmenu = true;
    this.awaitingApplicationNumber = false;
    this.subModules = [];
    this.messages = []
    // this.messages = [{
    //   id: '1',
    //   text: "Hello! Welcome to Bhulekha Assistant. How can I help you today?",
    //   sender: 'bot',
    //   timestamp: new Date()
    // }];
  }

  onToggleSound() { }
  onEmojiClick() { }

  onMinimizeClick() { this.drawer?.close(); }
  closeChat() {
    this.onClearHistory();
    this.drawer?.close();
    this.closeChatEvent.emit();
  }

  autoResizeTextArea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  onEnterPress(event: KeyboardEvent): void {
    if (!event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

}
