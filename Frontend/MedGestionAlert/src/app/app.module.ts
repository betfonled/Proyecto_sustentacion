import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field'
import { LoginModule } from './components/logic/authentication/login/login.module';
import { NavigationComponent } from './navigation/navigation.component';
import {MatTableModule} from '@angular/material/table';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthorizeInterceptor } from '../app/cors/AuthorizeInterceptor'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS,  } from '@angular/material/form-field';

const myTheme: any = {
  color: 'white',
};

@NgModule({ declarations: [
        AppComponent,
        NavigationComponent,
    ],
    exports: [
        MatToolbarModule,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        LoginModule,
        MatTableModule,
        JwtModule,
        FormsModule,
        MatMomentDateModule,
        CommonModule,
        MatDividerModule], providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: myTheme },
        [{
                provide: HTTP_INTERCEPTORS,
                useClass: AuthorizeInterceptor,
                multi: true
            }],
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
