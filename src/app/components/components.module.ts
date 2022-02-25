import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
@NgModule({
  declarations: [SidebarComponent, ChatComponent, HomeComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    PickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FontAwesomeModule,
    IntersectionObserverModule,
  ]
})
export class ComponentsModule { }
