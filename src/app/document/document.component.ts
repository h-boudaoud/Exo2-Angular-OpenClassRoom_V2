import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ElementRef} from '@angular/core';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  private url: string;
  // @ts-ignore
  @ViewChild('myObject') myObject: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.url = 'assets';
    this.routeEvent(this.route);
  }

  ngOnInit() {
  }

  routeEvent = (route: ActivatedRoute) => {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log('DocumentComponent this.route NavigationEnd e: ', e.url);
        this.url += e.url;
        this.myObject.nativeElement.data = this.url;
        console.log('DocumentComponent this.route NavigationEnd url: ', this.url);
        console.log('DocumentComponent this.router.events', this.router.events);
        console.log('DocumentComponent myObject', this.myObject.nativeElement.data);
      }
    });
  }



  // Aller(repertoire: string) {
  //   const fso = new ActiveXObject('Scripting.FileSystemObject')
  //   const f = fso.GetFolder(repertoire);
  //   const f1 = new Enumerator(f.files);      // les fichiers
  //   for (; !f1.atEnd(); f1.moveNext()) {
  //     // @ts-ignore
  //     console.log('DocumentComponent ', f1.item());
  //   }
  // }


}
