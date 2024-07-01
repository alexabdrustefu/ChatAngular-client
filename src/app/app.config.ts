import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {SignalrService} from "./service/signalr.service";

export const appConfig: ApplicationConfig = {
  providers: [
    SignalrService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)],
};
