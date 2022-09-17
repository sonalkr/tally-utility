import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { AppTrayComponent } from './app-tray/app-tray.component';
import { AppCardComponent } from './app-card/app-card.component';
import { ConvertorFormComponent } from './convertor-form/convertor-form.component';
import { RoutingModule } from './routing/routing.module';
import { CreateJournalComponent } from './pages/create-journal/create-journal.component';
import { CreateSaleComponent } from './pages/create-sale/create-sale.component';
import { CreatePurchaseComponent } from './pages/create-purchase/create-purchase.component';
import { CreateReceiptComponent } from './pages/create-receipt/create-receipt.component';
import { CreatePaymentComponent } from './pages/create-payment/create-payment.component';
import { CreateStockSaleComponent } from './pages/create-stock-sale/create-stock-sale.component';
import { CreateStockPurchaseComponent } from './pages/create-stock-purchase/create-stock-purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AppCardComponent,
    AppTrayComponent,
    ConvertorFormComponent,
    CreateJournalComponent,
    CreateSaleComponent,
    CreatePurchaseComponent,
    CreateReceiptComponent,
    CreatePaymentComponent,
    CreateStockSaleComponent,
    CreateStockPurchaseComponent,
  ],
  imports: [BrowserModule, RoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
