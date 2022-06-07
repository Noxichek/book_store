import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  books = [
    {
      title: 'Lightlark (Book 1)',
      author: 'by Alex Aster',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781419766671_p0_v1%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: 'This collectible "romance edition" includes an exclusive bonus chapter told from the POV of the protagonist\'s love interest and a deluxe case featuring a full-color, alternate cover design. #BookTok phenomenon and award-winning author Alex Aster delivers readers a masterfully written, utterly gripping YA fantasy novel',
      price: '16.99$'
    },
    {
      title: 'Sparring Partners',
      author: 'by John Grisham',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780385549325_p0_v3%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: '#1 New York Times bestselling author John Grisham is the acknowledged master of the legal thriller. In his first collection of novellas, law is a common thread, but America’s favorite storyteller has several surprises in store.',
      price: '9.99$'
    },
    {
      title: 'Happy Dreamer',
      author: 'by Peter H. Reynolds',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781338844139_p0_v1%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: 'The beloved, worldwide bestselling creator of The Dot and I Am Human inspires readers of every age to find their own unique path to happy, and to always follow their dreams.\n' +
        'From the beloved, bestselling creator of The Dot, The Word Collector, and I Am Human.',
      price: '10.79$'
    },
    {
      title: 'Jujutsu Kaisen, Vol. 16',
      author: 'by Gege Akutami',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B600%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781974728985_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: 'To gain the power he needs to save his friend from a cursed spirit, Yuji Itadori swallows a piece of a demon, only to find himself caught in the midst of a horrific war of the supernatural!',
      price: '8.99$'
    },
    {
      title: 'It Ends with Us',
      author: 'by Colleen Hoover',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781501161933_p0_v9%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: 'To gain the power he needs to save his friend from a cursed spirit, Yuji Itadori swallows a piece of a demon, only to find himself caught in the midst of a horrific war of the supernatural!',
      price: '8.99$'
    },
    {
      title: 'It Ends with Us',
      author: 'by Gege Akutami',
      imageUrl: 'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9781501110368_p0_v8%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
      description: 'In this “brave and heartbreaking novel that digs its claws into you and doesn’t let go, long after you’ve finished it” (Anna Todd, New York Times bestselling author) from the #1 New York Times bestselling author of All Your Perfects, a workaholic with a too-good-to-be-true romance can’t stop thinking about her first love.',
      price: '12.99$'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
