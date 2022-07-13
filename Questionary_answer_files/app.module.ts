import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserregistrationComponent } from
'./userregistration/userregistration.component';

@NgModule({
 declarations: [
    AppComponent,
    UserregistrationComponent,
    ReactiveFormsModule
 ],
 imports: [
    BrowserModule,
    AppRoutingModule,
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
