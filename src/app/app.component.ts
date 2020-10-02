import { Component } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://XXXXXXXXX.sentry.io/123",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "https://yourserver.io/api"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  tracesSampleRate: 1.0,
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  createError() {
    try {
      aFunctionThatMightFail();
    } 
    catch (err) {
      Sentry.captureException(err);
    }
  }
}
