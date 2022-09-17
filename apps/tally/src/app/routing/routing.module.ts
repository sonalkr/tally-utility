import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreateJournalComponent } from '../pages/create-journal/create-journal.component';
import { CreatePaymentComponent } from '../pages/create-payment/create-payment.component';
import { CreatePurchaseComponent } from '../pages/create-purchase/create-purchase.component';
import { CreateReceiptComponent } from '../pages/create-receipt/create-receipt.component';
import { CreateSaleComponent } from '../pages/create-sale/create-sale.component';
// import { CreateStockPurchaseComponent } from '../pages/create-stock-purchase/create-stock-purchase.component';
// import { CreateStockSaleComponent } from '../pages/create-stock-sale/create-stock-sale.component';

const routes: Routes = [
  { path: 'create_journal', component: CreateJournalComponent },
  { path: 'create_payment', component: CreatePaymentComponent },
  { path: 'create_receipt', component: CreateReceiptComponent },
  { path: 'create_purchase', component: CreatePurchaseComponent },
  { path: 'create_sale', component: CreateSaleComponent },
  // { path: 'create_stock_purchase', component: CreateStockPurchaseComponent },
  // { path: 'create_stock_sale', component: CreateStockSaleComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
