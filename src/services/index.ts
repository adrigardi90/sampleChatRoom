import { SocketConnectionService } from './socketConnection.service';
export * from './socketConnection.service'; 

import { HttpService } from './http.service';
export * from './http.service'; 


import { ImageService } from './image.service';
export * from './image.service'; 

export const Services = [
	SocketConnectionService,
	HttpService,
	ImageService
]