import { Injectable } from '@angular/core';
interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  pdfUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class EventService {
  


  private pdfUrl: string = '';
  private pdfName: string = '';

  constructor() { }

  setPdfUrl(pdfUrl: string) {
    this.pdfUrl = pdfUrl;
  }

  getPdfUrl() {
    return this.pdfUrl;
  }

  getEvents(): any[] {
    return [
      {
        id:1,
        name:'Permaculture Session',
        date:new Date('2025-05-01'),
        location:'Rangpo, Pakyong',
        pdfUrl:''
      },
      {
        id:2,
        name:'Permaculture Session',
        date:new Date('2025-05-02'),
        location:'Reshi, Pakyong',
        pdfUrl:''
      },
      {
        id:3,
        name:'Permaculture Session',
        date:new Date('2025-05-03'),
        location:'Reshi, Pakyong',
        pdfUrl:''
      },
      {
        id:4,
        name:'Permaculture Session',
        date:new Date('2025-05-04'),
        location:'Reshi, Pakyong',
        pdfUrl:''
      },
      {
        id:5,
        name:'Permaculture Session',
        date:new Date('2025-05-05'),
        location:'Pakyong',
        pdfUrl:''
      },
      {
        id:6,
        name:'Cultural Event in collaboration with Bardang, Army Camp',
        date:new Date('2025-05-05'),
        location:'Pakyong',
        pdfUrl:''
      },
      {
        id:7,
        name:'Traditional food fest',
        date:new Date('2025-05-05'),
        location:'Yuksom/Pelling, Gyalshing',
        pdfUrl:''
      },
      {
        id: 8,
        name: 'Permaculture Workshop at Laam Phokari',
        date: new Date('2025-05-06'),
        location: 'Aritar, Pakyong District',
        pdfUrl: ''
      },
      {
        id: 9,
        name: 'Display of Organic Food Stall',
        date: new Date('2025-05-06'),
        location: 'Rongli/Zuluk, Pakyong District',
        pdfUrl: ''
      },
      {
        id: 10,
        name: 'Exhibition cum Sale of Local Art and Handicraft',
        date: new Date('2025-05-06'),
        location: 'Rongli/Zuluk, Pakyong District',
        pdfUrl: ''
      },
      {
        id: 11,
        name: 'Traditional Archery Match',
        date: new Date('2025-05-06'),
        location: 'Archery Range, Pheythang, Gyalshing District',
        pdfUrl: ''
      },
      {
        id: 12,
        name: 'Traditional Food Fest',
        date: new Date('2025-05-06'),
        location: 'Pelling/Yuksom, Gyalshing District',
        pdfUrl: ''
      },
       // Gangtok District
  {
    id: 13,
    name: 'Heritage Walks (Flag Off): Tsuklakhang Monastery to Raj Bhawan',
    date: new Date('2025-05-07'),
    location: 'Gangtok',
    pdfUrl: 'assets/PDF/Gangtokheritagewalk.pdf'
  },
  {
    id: 14,
    name: 'Bike Rally: Gangtok to Dokala',
    date: new Date('2025-05-07'),
    location: 'Gangtok ',
    pdfUrl: 'assets/PDF/BikeRide_Dokala.pdf'
  },

  // Pakyong District
  {
    id: 15,
    name: 'Permaculture Session',
    date: new Date('2025-05-07'),
    location: 'Yakten, Pakyong ',
    pdfUrl: ''
  },

  // Gyalshing District
  {
    id: 16,
    name: 'Cultural Show',
    date: new Date('2025-05-07'),
    location: 'Pelling/Yuksom, Gyalshing ',
    pdfUrl: ''
  },
  {
    id: 17,
    name: 'Traditional Food Fest',
    date: new Date('2025-05-07'),
    location: 'Pelling/Yuksom, Gyalshing ',
    pdfUrl: ''
  },
  // Namchi District
{
  id: 18,
  name: 'Heritage Walk, Perbing Taar to Perbing Monastery',
  date: new Date('2025-05-08'),
  location: 'Namchi',
  pdfUrl: ''
},

// Pakyong District
{
  id: 19,
  name: 'Permaculture Session',
  date: new Date('2025-05-08'),
  location: 'Pakyong, Reshi',
  pdfUrl: ''
},

// Gyalshing District
{
  id: 20,
  name: 'Food Fest',
  date: new Date('2025-05-08'),
  location: 'Gyalshing, Pelling/Yuksom',
  pdfUrl: ''
},
{
  id: 21,
  name: 'Cleanliness Drive',
  date: new Date('2025-05-08'),
  location: 'Gyalshing, Pelling/Yuksom',
  pdfUrl: ''
},
// Namchi District
{
  id: 22,
  name: 'Cycling Tournament',
  date: new Date('2025-05-09'),
  location: 'Tareybhir, Namchi',
  pdfUrl: ''
},
{
  id: 23,
  name: 'Cultural Show',
  date: new Date('2025-05-09'),
  location: 'Bhanu Park, Namchi',
  pdfUrl: ''
},

// Pakyong District
{
  id: 24,
  name: 'Camping',
  date: new Date('2025-05-09'),
  location: 'Reshi River, Pakyong',
  pdfUrl: ''
},
{
  id: 25,
  name: 'Rural Run Competition among Tourism Stakeholders',
  date: new Date('2025-05-09'),
  location: 'Rorathang to Indreni Falls, Pakyong',
  pdfUrl: ''
},
{
  id: 26,
  name: 'Cultural Show',
  date: new Date('2025-05-09'),
  location: 'Reshi, Pakyong',
  pdfUrl: ''
},

// Gyalshing District
{
  id: 27,
  name: 'Traditional Food Fest',
  date: new Date('2025-05-09'),
  location: 'Yuksom/Pelling, Gyalshing',
  pdfUrl: ''
},
// Namchi District
{
  id: 28,
  name: 'Walkathon, Namchi to Maniram Village (8 kms)',
  date: new Date('2025-05-10'),
  location: 'Namchi',
  pdfUrl: ''
},
{
  id: 29,
  name: 'Cultural Show',
  date: new Date('2025-05-10'),
  location: 'Bhanu Park, Namchi',
  pdfUrl: ''
},
// Mangan District
{
  id: 30,
  name: 'Zo Maal, Primitive Rice Sowing Festival',
  date: new Date('2025-05-11'),
  location: 'Pentong, Dzongu, Mangan',
  pdfUrl: 'assets/PDF/Dzo_Maal.pdf'
},
{
  id: 31,
  name: 'Zo Maal, Primitive Rice Sowing Festival',
  date: new Date('2025-05-12'),
  location: 'Pentong, Dzongu, Mangan',
  pdfUrl: 'assets/PDF/Dzo_Maal.pdf'
},
// Gyalshing District
{
  id: 32,
  name: 'Heritage Walks, Rabdentse Ruins to Pemayangtse Monastery',
  date: new Date('2025-05-14'),
  location: 'Gyalshing',
  pdfUrl: ''
},

// Soreng District
{
  id: 33,
  name: 'Exhibition cum Sale of Local Art and Handicraft',
  date: new Date('2025-05-14'),
  location: 'Soreng School Ground, Soreng',
  pdfUrl: ''
},
{
  id: 34,
  name: 'Showcasing of Antiques of Different Ethnic Communities',
  date: new Date('2025-05-14'),
  location: 'Soreng School Ground, Soreng',
  pdfUrl: ''
},
// Gyalshing District
{
  id: 35,
  name: 'Bike Rally',
  date: new Date('2025-05-15'),
  location: 'Pelling - Saramsa Garden, Gyalshing',
  pdfUrl: ''
},
// Pakyong District
{
  id: 36,
  name: 'Pollination Workshop',
  date: new Date('2025-05-16'),
  location: 'Pakyong',
  pdfUrl: ''
},
// East Sikkim (Gangtok)
{
  id: 37,
  name: 'Street Food Festival',
  date: new Date('2025-05-29'),
  location: 'Ridge Park, Gangtok',
  pdfUrl: ''
},
{
  id: 38,
  name: 'Street Food Festival',
  date: new Date('2025-05-30'),
  location: 'Ridge Park, Gangtok',
  pdfUrl: ''
},
{
  id: 39,
  name: 'Street Food Festival',
  date: new Date('2025-05-31'),
  location: 'Ridge Park, Gangtok',
  pdfUrl: ''
},{
  id: 40,
  name: 'Rock Climbing',
  date: new Date('2025-23-04'),
  location: 'Ridge Park, Gangtok',
  pdfUrl: 'assets/PDF/Rock_climbing.pdf'
}
    ]
  }
  
  
}
