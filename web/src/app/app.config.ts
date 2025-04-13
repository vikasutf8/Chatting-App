import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SocketIoModule, SocketIoConfig, provideSocketIo } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost3000:', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideSocketIo(config),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ],
};
