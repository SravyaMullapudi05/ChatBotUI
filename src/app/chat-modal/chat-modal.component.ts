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
import { FaqsService } from '../services/faqs.service';
import { StatusService } from '../services/status.service';

type Sender = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  clickable?: boolean;
  modules?: any[];
  buttons?: any[];
  questions?: any[];
  statusData?: any;
  [key: string]: any;
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

  @Input() drawer!: MatSidenav;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Output() closeChatEvent = new EventEmitter<void>();

  messages: ChatMessage[] = [];
  showmainmenu = true;
  awaitingApplicationNumber = false;
  selectedAction = '';
  lastSelectedModule = '';
  subModules: any[] = [];

  typingMessage: ChatMessage = {
    id: 'typing',
    text: '',
    sender: 'bot',
    timestamp: new Date()
  };

  /* QUICK ACTIONS */
  quickActions: QuickAction[] = [
    { id: 'status', label: 'Application', icon: 'description', colorClass: 'blue' },
    { id: 'services', label: 'Services', icon: 'menu', colorClass: 'purple' },
    { id: 'faqs', label: 'FAQs', icon: 'help', colorClass: 'green' },
    { id: 'downloads', label: 'Downloads', icon: 'download', colorClass: 'orange' },
    { id: 'contact', label: 'Contact Us', icon: 'call', colorClass: 'teal' },
    { id: 'end', label: 'End Chat', icon: 'cancel', colorClass: 'red' }
  ];

  /* MODULES */
  applicationModules = [
    { id: 1, name: 'Application Status', action: () => this.selectStatusModule('Application Status') },
    { id: 2, name: 'Grievance Status', action: () => this.selectStatusModule('Grievance Status') }
  ];

  serviceModules = [
    { id: 1, name: 'Transaction Details', action: () => this.openGIS('home/transaction-details') },
    { id: 2, name: 'Re-assessment (Diversion)', action: () => this.openGIS('user-management/signin') },
    { id: 3, name: 'Re-assessment Fee Calculator', action: () => this.openGIS('home') },
    { id: 4, name: 'Agri. Land Revenue Payment', action: () => this.openGIS('user-management/internal-signin') },
    { id: 5, name: 'Diverted Land Revenue Payment', action: () => this.openGIS('user-management/signin') },
    { id: 6, name: 'Land Mortgage', action: () => this.openGIS('home') },
    { id: 7, name: 'Village Map Purchase', action: () => window.open('https://geoportal.mp.gov.in/khasraservice/uLogin.aspx', '_blank') }
  ];

  faqModules: any[] = [];
  fqaQuestions: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private faqService: FaqsService,
    private statusService: StatusService
  ) { }

  /* AUTO SCROLL */
  ngAfterViewChecked() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch { }
  }

  trackByMessageId(index: number, msg: ChatMessage) {
    return msg.id;
  }

  formatTimestamp(date: Date): string {
    const h = date.getHours(), m = date.getMinutes();
    return `${h % 12 || 12}:${m < 10 ? '0' + m : m} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  /* FOOTER SEND */
  sendMessage(text?: string) {
    if (!text?.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    this.messages = [...this.messages, newUserMessage];
    this.cdr.detectChanges();

    if (this.awaitingApplicationNumber) {
      this.awaitingApplicationNumber = false;
      this.handleApplicationNumber(text.trim());
    }
  }

  onEmojiClick() {
    console.log("Emoji clicked");
  }

  /* TYPING */
  showTyping(sender: Sender) {
    this.typingMessage.sender = sender;
    if (!this.messages.some(m => m.id === 'typing')) {
      this.messages = [...this.messages, this.typingMessage];
      this.cdr.detectChanges();
    }
  }

  hideTyping(newMsgs: ChatMessage | ChatMessage[]) {
    this.messages = this.messages.filter(m => m.id !== 'typing');
    this.messages = Array.isArray(newMsgs)
      ? [...this.messages, ...newMsgs]
      : [...this.messages, newMsgs];
    this.cdr.detectChanges();
  }

  /* QUICK ACTION HANDLER */
  handleAction(action: QuickAction) {
    this.selectedAction = action.id;

    if (action.id === 'end') return this.closeChat();

    this.messages = [];
    this.sendMessage(action.label);
    this.showTyping('bot');

    if (action.id === 'status') return this.loadStatusModule();
    if (action.id === 'services') return this.loadServiceModule();
    if (action.id === 'faqs') return this.loadFaqModule();
  }

  private loadStatusModule() {
    const msg = this.createMessage('Please select a module:', 'bot', this.applicationModules);
    setTimeout(() => { this.hideTyping(msg); this.showmainmenu = false; }, 600);
  }

  private loadServiceModule() {
    const msgs = [
      this.createMessage('Please pick a service:', 'bot', this.serviceModules),
      this.createMessage('Are you satisfied?', 'bot', undefined, [
        { label: 'Yes', class: 'primary_btn', action: () => this.onservicebuttonclick('yes') },
        { label: 'No', class: 'tersary_btn', action: () => this.onservicebuttonclick('no') }
      ])
    ];
    setTimeout(() => { this.hideTyping(msgs); this.showmainmenu = false; }, 600);
  }

  private loadFaqModule() {
    this.faqModules = this.faqService.getAllFaqs();
    const msg = this.createMessage('Please select a category for your question:', 'bot', this.faqModules);
    setTimeout(() => { this.hideTyping(msg); this.showmainmenu = false; }, 600);
  }

  /* MESSAGE CREATOR */
  createMessage(text: string, sender: Sender, modules?: any[], buttons?: any[]): ChatMessage {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };

    if (modules) msg.modules = modules;
    if (buttons) msg.buttons = buttons;

    return msg;
  }

  /* FAQ MODULE */
  moduleAction(module: any) {
    if (module.action) return module.action(); // services

    if (this.selectedAction === 'faqs') {
      this.fqaQuestions = this.faqService.getfaqSubmodules(module);
      this.sendMessage(module.name);
      this.showTyping('bot');

      const faqMsgs: ChatMessage[] = [
        { ...this.createMessage('Here are common questions:', 'bot'), questions: this.fqaQuestions }
      ];

      setTimeout(() => this.hideTyping(faqMsgs), 600);
    }
  }

  showAnsforFaq(list: any[], selected: any) {
    list.forEach(q => q.showanswer = (q.id === selected.id ? !q.showanswer : false));
  }

  /* SELECT STATUS MODULE */
  selectStatusModule(moduleName: any) {
    setTimeout(() => {
      this.lastSelectedModule = moduleName.name || moduleName;
      this.sendMessage(this.lastSelectedModule);

      this.messages = [
        ...this.messages,
        this.createMessage('Please enter your Application Number', 'bot')
      ];

      this.awaitingApplicationNumber = true;
      this.cdr.detectChanges();
    }, 150);
  }

  /* ───────────────────────────────────────────────
     FIXED + FINAL STATUS HANDLER
     ─────────────────────────────────────────────── */
  handleApplicationNumber(appId: string) {
    const valid = /^[0-9]{8,12}$/;

    //     if (!valid.test(appId)) {
    //       this.addBotMessage(`
    // ❌ Invalid Application Number  
    // ━━━━━━━━━━━━━━━━━━  
    // Enter 8–12 alphanumeric characters  
    // ━━━━━━━━━━━━━━━━━━`);
    //       this.awaitingApplicationNumber = true;
    //       return;
    //     }

    this.showTyping('bot');

    this.statusService.getTicketStatus(appId).subscribe({
      next: (res) => {
        this.hideTyping([]);

        if (!res?.data || res.data.length === 0) {
          this.addBotMessage("No records found for this Application Number.");
          return;
        }

        const sorted = [...res.data].sort(
          (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
        );

        const latest = sorted[0];

        const statusData = {
          title: this.lastSelectedModule,
          applicationNumber: appId,
          designation: latest.designation_en || "-",
          status: latest.status || "-",
          lastUpdated: latest.transaction_date,
          class: this.getStatusClass(latest.status)
        };

        this.messages = [
          ...this.messages,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: `${statusData.title} for ${statusData.applicationNumber}:`,
            timestamp: new Date(),
            statusData: statusData
          }
        ];

        // ADD SATISFACTION BUTTONS AS SEPARATE BOT MESSAGE  
        const feedbackMessage = this.createMessage(
          "Are you satisfied?",
          "bot",
          undefined,
          [
            { label: "Yes", class: "primary_btn", action: () => this.onservicebuttonclick("yes") },
            { label: "No", class: "tersary_btn", action: () => this.onservicebuttonclick("no") }
          ]
        );

        this.messages = [...this.messages, feedbackMessage];

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err)
        this.hideTyping([]);
        this.addBotMessage("⚠️ Unable to fetch status. Please try again later.");
      }
    });
  }


  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'closed': return 'status-closed';
      case 'open': return 'status-open';
      case 'request initiated': return 'status-live';
      default: return '';
    }
  }

  /* ADD BOT MESSAGE */
  addBotMessage(text: string) {
    this.messages = [...this.messages, this.createMessage(text, 'bot')];
    this.cdr.detectChanges();
  }

  /* SERVICE FEEDBACK */
  onservicebuttonclick(ans: string) {
    this.messages = [...this.messages, this.createMessage(ans, 'user')];
    setTimeout(() => { this.messages = []; this.showmainmenu = true; }, 400);
  }

  /* HEADER EVENTS */
  onTranslateClick() { }
  onSettingsClick() { }
  selectLanguage(lang: any) { console.log('Language selected:', lang); }
  onHeaderSettingSelected(setting: any) {
    if (setting?.label === 'Clear History') this.onClearHistory();
  }

  onClearHistory() {
    this.messages = [];
    this.showmainmenu = true;
    this.awaitingApplicationNumber = false;
    this.subModules = [];
  }

  onMinimizeClick() { this.drawer?.close(); }
  closeChat() { this.onClearHistory(); this.drawer?.close(); }

  openGIS(path: string) {
    window.open(`https://webgis2.mpbhulekh.gov.in/#/${path}`, '_blank');
  }

  onMessageClick(msg: ChatMessage) {
    if (!msg.clickable) return;
    msg.clickable = false;
    this.sendMessage("Yes");
    this.messages = [];
    this.showmainmenu = true;
  }

}
