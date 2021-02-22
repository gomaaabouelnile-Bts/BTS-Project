import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BusinessPartersPageComponent } from './business-parters-page/business-parters-page.component';
import { ActivityCodesComponent } from './Component/Codes/activity-codes/activity-codes.component';
import { CompanyComponent } from './Component/Codes/company/company.component';
import { CurrenciesComponent } from './Component/Codes/currencies/currencies.component';
import { CurrencyMappingComponent } from './Component/Codes/currency-mapping/currency-mapping.component';
import { CustomerComponent } from './Component/Codes/customer/customer.component';
import { GovernorateComponent } from './Component/Codes/governorate/governorate.component';
import { ItemMappingComponent } from './Component/Codes/item-mapping/item-mapping.component';

import { RegionComponent } from './Component/Codes/region/region.component';
import { TaxSubTypesComponent } from './Component/Codes/tax-sub-types/tax-sub-types.component';
import { TaxComponent } from './Component/Codes/tax/tax.component';
import { TransactionStatusComponent } from './Component/Codes/transaction-status/transaction-status.component';
import { UnitMappingComponent } from './Component/Codes/unit-mapping/unit-mapping.component';
import { UnitsComponent } from './Component/Codes/units/units.component';
import { GroupsComponent } from './Component/Security/groups/groups.component';
import { LoginComponent } from './Component/Security/Login/login/login.component';
import { LoginActivate } from './Component/Security/Login/LoginActivate';
import { UsersComponent } from './Component/Security/users/users.component';
import { TransactionsComponent } from './Component/Trans/transactions/transactions.component';
import { ConsultantPageComponent } from './consultant-page/consultant-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { HomeComponent } from './home/home.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VendorsPageComponent } from './vendors-page/vendors-page.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'aboutus', component: AboutComponent },
      { path: 'Contact', component: ContactUsComponent },
      {path: 'ActivityCodes', component: ActivityCodesComponent , canActivate: [LoginActivate]},
      {path: 'Company', component: CompanyComponent , canActivate: [LoginActivate] ,
       data: { title: '102010000' }},
       {path: 'Users', component: UsersComponent , canActivate: [LoginActivate]},
       {path: 'Groups', component: GroupsComponent , canActivate: [LoginActivate]},
       { path: 'Tax', component: TaxComponent, canActivate: [LoginActivate] },
       { path: 'TaxSubtypes', component: TaxSubTypesComponent, canActivate: [LoginActivate] },
       { path: 'TransactionStatus', component: TransactionStatusComponent, canActivate: [LoginActivate] },
       { path: 'Units', component: UnitsComponent, canActivate: [LoginActivate] },
       { path: 'CurrencyMapping', component: CurrencyMappingComponent, canActivate: [LoginActivate] },
       { path: 'Governorates', component: GovernorateComponent, canActivate: [LoginActivate] },
       { path: 'UnitMapping', component: UnitMappingComponent, canActivate: [LoginActivate] },
       { path: 'Region', component: RegionComponent, canActivate: [LoginActivate] },
      {path: 'Currencies', component: CurrenciesComponent , canActivate: [LoginActivate]},
      {path: 'Customer', component: CustomerComponent , canActivate: [LoginActivate]},
      {path: 'ItemMapping', component: ItemMappingComponent , canActivate: [LoginActivate]},
      {path: 'LogIn', component: LoginComponent},
      
      {path: 'Invoice', component: TransactionsComponent , canActivate: [LoginActivate]},
      {path: 'HowItWork', component: HowItWorkComponent  },
      {path: 'BusinessPartersPage', component: BusinessPartersPageComponent  },
      {path: 'ConsultantPage', component: ConsultantPageComponent  },
      {path: 'VendorsPage', component: VendorsPageComponent  },
      {path: 'CustomersPage', component: CustomersPageComponent  },
      {path: 'WhatWeDo', component: WhatWeDoComponent  },
      {path: '**', component: NotfoundComponent  }
    
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
