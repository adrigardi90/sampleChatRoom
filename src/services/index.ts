import { SocketConnectionService } from './socketConnection.service';
export * from './socketConnection.service'; 

import { HttpService } from './http.service';
export * from './http.service'; 

export const Services = [
	SocketConnectionService,
	HttpService
]