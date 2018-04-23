import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { HomeComponent }  from './layout/home.component';
import { LoginComponent } from './common/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent, MainContentComponent, LeftSideComponent, FooterComponent, MenuTreeComponent }  from './layout/layout.index';

import { routing }        from './app.routing';
import { PageNotFoundComponent }        from './common/pageNotFound.component';

import { AuthGuard } from './guards/index';
import {AuthService} from './services/auth.service';

import { NetService } from './services/net.service';
import { CommonService }       from './services/common.service';

import { ModalModule} from 'ngx-bootstrap';
import { AlertModalComponent } from './common/alert-modal.component';

import {CommonCodeResolver} from './services/common-resolver.service'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    MainContentComponent,
    HeaderComponent,
    LeftSideComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuTreeComponent,
    AlertModalComponent,
  ],
  providers: [
      AuthGuard,
      NetService,
      CommonService,
      AuthService,
      CommonCodeResolver
  ],
  
  bootstrap: [ AppComponent ]
})

export class AppModule { }