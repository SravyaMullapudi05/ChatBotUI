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
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FaqsService } from '../services/faqs.service';
import { StatusService } from '../services/status.service';
import { DownloadsService } from '../services/downloads.service';

import { WelcomeScreenComponent } from '../welcome-screen/welcome-screen.component';
import { ChatFooterComponent } from '../shared-module/chat-footer/chat-footer.component';
import { HeaderComponent } from '../shared-module/chat-header/header.component';
import { ConnecttobotService } from '../services/connecttobot.service';

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

export interface BotSuggestion {
  id: number;
  name: string;
  items?: []
}

@Component({
  selector: 'app-chat-modal',
  standalone: true,
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    WelcomeScreenComponent,
    ChatFooterComponent,
    HeaderComponent
  ]
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
  showButtons = false;

  typingMessage: ChatMessage = {
    id: 'typing',
    text: '',
    sender: 'bot',
    timestamp: new Date()
  };


  /* QUICK ACTIONS */
  quickActions: QuickAction[] = [
    { id: 'status', label: 'Application', icon: 'description', colorClass: 'blue' },
    { id: 'services', label: 'Services', icon: 'menu', colorClass: 'teal' },
    { id: 'faqs', label: 'FAQs', icon: 'help', colorClass: 'green' },
    { id: 'downloads', label: 'Downloads', icon: 'download', colorClass: 'orange' },
    { id: 'contact', label: 'Contact', icon: 'call', colorClass: 'purple' },
    { id: 'end', label: 'End Chat', icon: 'cancel', colorClass: 'red' }
  ];


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
  downloadModules: any[] = [];
  downloadSubmodules: any[] = [];
  botResponse: BotSuggestion[] = [];
  awaitingBotResponse: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private faqService: FaqsService,
    private statusService: StatusService,
    private downloadService: DownloadsService,
    private ConnectToBotservice: ConnecttobotService
  ) { }

  /* ───────── AUTO SCROLL ───────── */
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (!this.scrollContainer) return;
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch { }
  }

  private updateUI() {
    setTimeout(() => this.scrollToBottom(), 0);
    this.cdr.detectChanges();
  }

  private pushMessages(msgs: ChatMessage | ChatMessage[]) {
    this.messages = Array.isArray(msgs)
      ? [...this.messages, ...msgs]
      : [...this.messages, msgs];
    this.updateUI();
  }

  trackByMessageId(_: number, msg: ChatMessage) {
    return msg.id;
  }

  formatTimestamp(date: Date): string {
    const h = date.getHours(), m = date.getMinutes();
    return `${h % 12 || 12}:${m < 10 ? '0' + m : m} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  /* ───────── FOOTER SEND ───────── */
  sendMessage(senttype: string, text?: string, qshn?: string) {
    if (!text?.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    this.pushMessages(msg);

    if (this.awaitingApplicationNumber) {
      this.awaitingApplicationNumber = false;
      this.handleApplicationNumber(text.trim(), this.lastSelectedModule);
    } else if (senttype == 'usersent') {
      this.awaitingBotResponse = true
      this.ConnectToBotservice.connectToBot(text).subscribe({
        next: (res) => {
          this.botResponse = res.data
          if (this.botResponse) {
            qshn = 'Do you mean to say?'
          }
          this.hideTyping(this.createMessage('botConnection', qshn, 'bot', this.botResponse));
        },
        error: () => {
          this.hideTyping([]);
        }
      });

      // setTimeout(() => {
      //   this.hideTyping(this.createMessage('botConnection', 'Do you mean to say?', 'bot', this.botResponse));
      //   this.showmainmenu = false;
      // }, 600);
    }
  }

  /* ───────── TYPING ───────── */
  showTyping(sender: Sender) {
    this.typingMessage.sender = sender;
    if (!this.messages.some(m => m.id === 'typing')) {
      this.pushMessages(this.typingMessage);
    }
  }

  hideTyping(newMsgs: ChatMessage | ChatMessage[]) {
    this.messages = this.messages.filter(m => m.id !== 'typing');
    this.pushMessages(newMsgs);
  }

  /* ───────── QUICK ACTIONS ───────── */
  handleAction(action: QuickAction) {
    this.selectedAction = action.id;
    if (action.id === 'end') return this.closeChat();

    this.messages = [];
    this.sendMessage('userclick', action.label);
    this.showTyping('bot');

    if (action.id === 'status') return this.loadStatusModule();
    if (action.id === 'services') return this.loadServiceModule();
    if (action.id === 'faqs') return this.loadFaqModule();
    if (action.id === 'downloads') return this.loadDownloadsModule();
  }

  private loadStatusModule() {
    setTimeout(() => {
      this.hideTyping(this.createMessage('status', 'Please select a module:', 'bot', this.applicationModules));
      this.showmainmenu = false;
    }, 600);
  }

  private loadServiceModule() {
    setTimeout(() => {
      this.hideTyping([
        this.createMessage('services', 'Please pick a service:', 'bot', this.serviceModules),
        this.createMessage('services', 'Are you satisfied?', 'bot', undefined, [
          {
            label: 'Yes', class: 'primary_btn', action: () => this.onservicebuttonclick('services', 'yes')
          },
          { label: 'No', class: 'tersary_btn', action: () => this.onservicebuttonclick('services', 'no') }
        ])
      ]);
      this.showmainmenu = false;
    }, 600);
  }

  private loadDownloadsModule() {
    this.downloadModules = this.downloadService.getAlldownloads();
    setTimeout(() => {
      this.hideTyping(this.createMessage('downloads', 'Please select a category for your download:', 'bot', this.downloadModules));
      this.showmainmenu = false;
    }, 600);
  }

  private loadFaqModule() {
    this.faqModules = this.faqService.getAllFaqs();
    setTimeout(() => {
      this.hideTyping(this.createMessage('faqs', 'Please select a category for your question:', 'bot', this.faqModules));
      this.showmainmenu = false;
    }, 600);
  }

  /* ───────── MESSAGE CREATOR ───────── */
  createMessage(selectedModule, text: string, sender: Sender, modules?: any[], buttons?: any[]): ChatMessage {
    return {
      selectedModule,
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      modules,
      buttons
    };
  }

  /* ───────── STATUS HANDLING ───────── */
  selectStatusModule(moduleName: any) {
    setTimeout(() => {
      this.lastSelectedModule = moduleName.name || moduleName;
      this.sendMessage('userclick', this.lastSelectedModule);
      this.pushMessages(this.createMessage('status', 'Please enter your Application Number', 'bot'));
      this.awaitingApplicationNumber = true;
    }, 150);
  }

  showAnsforFaq(questions: any[], selectedQ: any) {
    console.log(questions)
    console.log('......')
    console.log(selectedQ)
    questions.forEach(q => {
      if (q === selectedQ) {
        q.showanswer = !q.showanswer;
      } else {
        q.showanswer = false;
      }
    });

    this.cdr.detectChanges();
  }

  handleApplicationNumber(appId: string, selectedmodule: any) {
    this.showTyping('bot');

    this.statusService.getTicketStatus(appId, selectedmodule).subscribe({
      next: (res) => {
        this.hideTyping([]);

        if (!res?.data?.length) {
          this.addBotMessage(selectedmodule, 'No records found for this Application Number.');
          return;
        }

        const latest = [...res.data].sort(
          (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
        )[0];

        const statusData = {
          title: this.lastSelectedModule,
          applicationNumber: appId,
          designation: latest.designation_en || '-',
          status: latest.status || '-',
          lastUpdated: latest.transaction_date,
          class: this.getStatusClass(latest.status),
          time: latest.transaction_date.split(' ')[1]
        };

        this.pushMessages({
          id: Date.now().toString(),
          sender: 'bot',
          text: `${statusData.title} for ${statusData.applicationNumber}:`,
          timestamp: new Date(),
          statusData
        });

        this.pushMessages(this.createMessage(
          'status',
          'Are you satisfied?',
          'bot',
          undefined,
          [
            { label: 'Yes', class: 'primary_btn', action: () => this.onservicebuttonclick('status', 'yes') },
            { label: 'No', class: 'tersary_btn', action: () => this.onservicebuttonclick('status', 'no') }
          ]
        ));
      },
      error: () => {
        this.hideTyping([]);
        this.addBotMessage(selectedmodule, '⚠️ Unable to fetch status. Please try again later.');
      }
    });
  }

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'closed': return 'status-closed';
      case 'open': return 'status-open';
      default: return 'status-live';
    }
  }

  addBotMessage(moduleAction, text: string) {
    this.pushMessages(this.createMessage(moduleAction, text, 'bot'));
  }

  /* ───────── FEEDBACK ───────── */
  onservicebuttonclick(moduleselected, ans: string) {
    this.pushMessages(this.createMessage(moduleselected, ans, 'user'));
    setTimeout(() => {
      this.messages = [];
      this.showmainmenu = true;
      this.cdr.detectChanges();
    }, 900);
  }

  /* ───────── HEADER ───────── */
  onTranslateClick() { }
  onSettingsClick() { }
  selectLanguage(lang: any) { }
  onHeaderSettingSelected(setting: any) {
    if (setting?.label === 'Clear History') {
      this.onClearHistory();
    }
  }
  
  onClearHistory() {
    this.messages = [];
    this.showmainmenu = true;
    this.awaitingApplicationNumber = false;
    this.subModules = [];
    this.cdr.detectChanges();
  }

  onMinimizeClick() { this.drawer?.close(); }
  closeChat() { this.onClearHistory(); this.drawer?.close(); }

  openGIS(path: string) {
    window.open(`https://webgis2.mpbhulekh.gov.in/#/${path}`, '_blank');
  }

  onMessageClick(msg: ChatMessage) {
    if (!msg.clickable) return;
    msg.clickable = false;
    this.sendMessage('userclick', 'Yes');
    this.messages = [];
    this.showmainmenu = true;
  }

  onEmojiClick() {
    console.log('Emoji clicked');
  }

  moduleAction(message, module: any) {
    // SERVICES MODULE
    if (module.action) {
      module.action();
      return;
    }
    console.log(module)
    // FAQ MODULE
    if (message.selectedModule === "faqs") {
      this.fqaQuestions = this.faqService.getfaqSubmodules(module);
      console.log(this.fqaQuestions)
      this.sendMessage('userclick', module.name);
      this.showTyping('bot');

      const faqMsgs: ChatMessage[] = [
        { ...this.createMessage(message.selectedModule, 'Here are common questions:', 'bot'), questions: this.fqaQuestions }
      ];

      setTimeout(() => this.hideTyping(faqMsgs), 600);
      return;
    }

    // DOWNLOAD MODULE
    if (message.selectedModule === 'downloads') {
      this.downloadSubmodules = this.downloadService.getdownloadsSubmodules(module);
      this.sendMessage('userclick', module.name);
      this.showTyping('bot');

      const downloadMsgs: ChatMessage[] = [
        { ...this.createMessage(message.selectedModule, 'Please proceed further:', 'bot'), questions: this.downloadSubmodules }
      ];

      setTimeout(() => this.hideTyping(downloadMsgs), 600);
    }

    if (message.selectedModule === 'botConnection') {
      console.log(message)
      console.log(module)

      this.awaitingBotResponse = true
      // this.ConnectToBotservice.connectToBot(text).subscribe({
      //   next: (res) => {
      //     this.botResponse = res.data ? res.data : res
      //     this.hideTyping(this.createMessage('botConnection', 'Do you mean to say?', 'bot', this.botResponse));
      //   },
      //   error: () => {
      //     this.hideTyping([]);
      //   }
      // });
      this.sendMessage('usersent', module.name, 'Do you mean to say?');

      this.showTyping('bot');


    }
  }

}
