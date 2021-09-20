import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailformComponent } from '../emailform/emailform.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  entryComponents : [EmailformComponent],
})
export class InviteComponent implements OnInit {

  @ViewChild('block', {static : false, read : ViewContainerRef}) target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
  }
  
  result:boolean = false;
  addNewComponent() {
    this.result = true;
    let childComponent = this.resolver.resolveComponentFactory(EmailformComponent);
    this.componentRef = this.target.createComponent(childComponent);
  }
}