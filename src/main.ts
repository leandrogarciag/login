/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent,
//     {providers: [provideProtractorTestingSupport()]})
//   .catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch(err => console.error(err));