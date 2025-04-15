import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
 destination:any={};

  constructor() { }

  getDestionation():any{
   return this.destination = {
      name: 'Rumtek Monastery',
      bgimage: 'assets/Images/rumtek-monastry/hero-img.jpg',
      description: `Rumtek Monastery, also called the Dharma Chakra Centre, is a gompa located in the Indian state of
      Sikkim near the capital Gangtok. It is the seat in exile of the Gyalwang Karmapa, inaugurated in 1966 by the 16th Karmapa.`,
      tags: [
        { icon: 'fas fa-landmark', label: 'Monastery' },
        { icon: 'fas fa-mountain', label: 'Sikkim' },
        { icon: 'fas fa-pray', label: 'Buddhist Temple' },
        { icon: 'fas fa-om', label: 'Religious Site' },
        { icon: 'fas fa-camera', label: 'Tourist Spot' }
      ],
    };
  }

}
