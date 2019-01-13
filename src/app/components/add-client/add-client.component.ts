import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {


  client: Client = {
      firstName: "",
      lastName: "",
      email: "",
      phone: null,
      balance: 0,
      user: ''
  }


  constructor(
    private clientService: ClientService, 
    private authClientService: AuthClientService,
    private route: Router, 
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {

      this.authClientService.getAuth().subscribe(auth => {
        this.client.user = auth.uid
      })


  }


  onSubmit(){
      this.clientService.newClient(this.client);

      this.flashMessages.show('Client Added Successfully :) ', {cssClass: 'alert-primary', timeout:5000 })

      return this.route.navigate(['/']);
  }

}
