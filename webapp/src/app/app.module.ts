import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material.module';
import { SampleSetComponent } from './sample-set/sample-set.component'
import { SampleSetService } from './services/sample-set.service'
import { IdGeneratorService } from './services/id-generator.service'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SampleSetOverviewComponent} from './sample-set-overview/sample-set-overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SampleComponent } from './sample/sample.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { DeleteDialog, SampleOverviewComponent } from './sample-overview/sample-overview.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SampleSetComponent,
    SampleSetOverviewComponent,
    DeleteDialog,
    PageNotFoundComponent,
    SampleComponent,
    QrCodeScannerComponent,
    SampleOverviewComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BarcodeScannerLivestreamModule,
    AngularFileUploaderModule  ],
  providers: [ IdGeneratorService, SampleSetService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
