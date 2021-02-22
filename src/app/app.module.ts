import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './home/home.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UploadfileComponent } from './shard/uploadfile/uploadfile.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OurAudiencesComponent } from './our-audiences/our-audiences.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';

import { BannerComponent } from './banner/banner.component';
import { ServicesdComponent } from './services/services.component';
import { BusinessPartersPageComponent } from './business-parters-page/business-parters-page.component';
import { ConsultantPageComponent } from './consultant-page/consultant-page.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { VendorsPageComponent } from './vendors-page/vendors-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { ActivityCodesComponent } from './Component/Codes/activity-codes/activity-codes.component';
import { LoginComponent } from './Component/Security/Login/login/login.component';
import { UsersComponent } from './Component/Security/users/users.component';
import { GroupsComponent } from './Component/Security/groups/groups.component';
import { CompanyComponent } from './Component/Codes/company/company.component';
import { CurrenciesComponent } from './Component/Codes/currencies/currencies.component';
import { CustomerComponent } from './Component/Codes/customer/customer.component';
import { LoginActivate } from './Component/Security/Login/LoginActivate';
import { TestComponent } from './test/test.component';
import { TransactionsComponent } from './Component/Trans/transactions/transactions.component';
import { AgGridCheckboxComponent } from './ag-grid-checkbox/ag-grid-checkbox.component';
import { CountryComponent } from './Component/Codes/country/country.component';
import { GovernorateComponent } from './Component/Codes/governorate/governorate.component';
import { RegionComponent } from './Component/Codes/region/region.component';
import { TaxSubTypesComponent } from './Component/Codes/tax-sub-types/tax-sub-types.component';
import { TaxComponent } from './Component/Codes/tax/tax.component';
import { TransactionStatusComponent } from './Component/Codes/transaction-status/transaction-status.component';
import { UnitsComponent } from './Component/Codes/units/units.component';
import { CurrencyMappingComponent } from './Component/Codes/currency-mapping/currency-mapping.component';
import { UnitMappingComponent } from './Component/Codes/unit-mapping/unit-mapping.component';
import { ItemMappingComponent } from './Component/Codes/item-mapping/item-mapping.component';
import { TransreportComponent } from './Component/report/transreport/transreport.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesdComponent,
    OurAudiencesComponent,
    WhatWeDoComponent,
    BannerComponent,
    HomeComponent,
    HowItWorkComponent,
    NotfoundComponent,
    BusinessPartersPageComponent, ConsultantPageComponent, VendorsPageComponent,
    CustomersPageComponent,
  NavbarComponent, FooterComponent, AboutComponent,
ContactUsComponent, BreadcrumbComponent,
 UploadfileComponent,
 ActivityCodesComponent, LoginComponent,
 UsersComponent, GroupsComponent, CompanyComponent, CurrenciesComponent,
  CustomerComponent, TestComponent, TransactionsComponent,AgGridCheckboxComponent, CountryComponent,
 TaxComponent, TaxSubTypesComponent,TransactionStatusComponent
  ,GovernorateComponent,RegionComponent,UnitsComponent, CurrencyMappingComponent, UnitMappingComponent,
   ItemMappingComponent,
   TransreportComponent
  ],
  entryComponents: [
    AgGridCheckboxComponent
  ],
  imports: [

    BrowserModule, NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule, CommonModule
   , HttpClientModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
    , AgGridModule.withComponents([]), NoopAnimationsModule, ModalModule.forRoot(),
   FormsModule, ReactiveFormsModule, NgxSpinnerModule, BrowserAnimationsModule
  


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [LoginActivate, LoginComponent,  DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);
}

