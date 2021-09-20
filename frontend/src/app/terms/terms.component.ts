import { Component, OnInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],

})



export class TermsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  result:boolean = true;
  resultB:boolean = true;
  
  onScroll(): void {

    const scrollPos = document.getElementById('1')?.scrollTop;
    const scrollSize = document.getElementById('1')?.scrollHeight;
    var scrollDif1 =  306.5714111328125;
    var scrollDif2 =  306;
    

    if(scrollPos == null){
      scrollPos == 0;

    }else{

      scrollDif1 = scrollPos + 306.5714111328125;
      scrollDif2 = scrollPos + 306;

      if(scrollDif1 == scrollSize || scrollDif2 == scrollSize ){
        this.result = false;
        this.resultB = false;
        console.log(scrollSize,scrollDif1);
      }
      else{
        this.result = true;
        console.log(scrollSize,scrollDif1);
      }
    }


}

}
