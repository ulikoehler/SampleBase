import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import QrScanner from 'qr-scanner';
import { DOCUMENT } from '@angular/common'; 
import {MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.sass']
})

export class QrCodeScannerComponent implements AfterViewInit {
  @ViewChild('video') video:ElementRef;
  videoElem: any;
  result = '';
  
  constructor(public dialogRef: MatDialogRef<QrCodeScannerComponent>, @Inject(DOCUMENT) document) {

 }
  ngAfterViewInit() {
    QrScanner.WORKER_PATH = 'assets/qr-scanner-worker.min.js';
    QrScanner.hasCamera().then(result => console.log('Camera detected: ', result), error => console.log(error))
    const qrScanner = new QrScanner(this.video.nativeElement, result => {
      this.dialogRef.close(result);
    }, error => {
      if (error !== 'No QR code found') {
        console.error(error)
      }
      });
    qrScanner.start();
}
}