import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTableModule,
} from '@angular/material'
import {MatExpansionModule} from '@angular/material/expansion'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ConfigPanelComponent} from './config-panel.component'
import {LoadingSpinnerComponent} from './loading-spinner.component'
import {ResultsPanelComponent} from './results-panel.component'
import {StatisticsPanelComponent} from './statistics-panel.component'

@NgModule({
  declarations: [
    AppComponent,
    ConfigPanelComponent,
    LoadingSpinnerComponent,
    ResultsPanelComponent,
    StatisticsPanelComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
