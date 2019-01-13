import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  total: number = 0;
  searchClients: Client[];

  constructor(private clientService: ClientService, private authClientService: AuthClientService , private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {

      this.authClientService.getAuth().subscribe(auth => {
        this.clientService.getClients(auth.uid).subscribe(clients => {
          this.searchClients = this.clients = clients;
          this.total   = this.getTotal();
        })
      })

      

  }


  getTotal() {
    return this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0 )
  }


  deleteClient(id: string) {

      // swal('Delete this Client ?', 'Are You Sure to delete this Client', 'success');
      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

          this.clientService.deleteClient(id);
          this.flashMessage.show('Balance Deleted',{cssClass: 'alert-danger', timeout: 4000});
          this.router.navigate(['/']);

          swal({
              title: 'Deleted!',
              text: 'Your imaginary file has been deleted.',
              type: 'success',
              timer: 3000
          })
        } 
      })
  }

  search(query: string){
      this.searchClients = (query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(query.toLowerCase()) || client.lastName.toLowerCase().includes(query.toLowerCase())) : this.clients;
  }

}
