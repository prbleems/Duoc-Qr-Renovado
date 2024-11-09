import { Component } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-scanqr',
  templateUrl: 'scanqr.page.html',
  styleUrls: ['scanqr.page.scss'],
})
export class ScanqrPage {

  result: string = ''

  constructor() {}
  
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
  }
}
