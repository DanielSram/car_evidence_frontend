import {Component, OnInit} from '@angular/core';
import {MdDialog, MdSnackBar} from '@angular/material';
import {ClientService} from '../shared/client.service';
import {CreateClientComponent} from './create-client.component';
import {ClientDetailComponent} from './client-detail.component';
import { Constants } from '../shared/Constants';

/**
 * Class wrapping all Client use cases
 * including Client creation, Client detail and Client list.
 */
@Component({
    selector: 'client-management',
    templateUrl: './client-management.component.html',
    styleUrls: [],
})
export class ClientManagementComponent implements OnInit {

    clients: Client[] = [];

    /**
     * @constructor
     * @param clientService
     * @param snackBar
     * @param dialog
     */
    constructor(private clientService: ClientService,
                private snackBar: MdSnackBar,
                public dialog: MdDialog) {
    }

    ngOnInit(): void {
        this.loadClients();
    }

    /**
     * Opens dialog window and reloads this.clients
     * if client was created
     */
    createClient(): void {
        let ref = this.dialog.open(CreateClientComponent);
        ref.afterClosed().subscribe(
            (clientCreated: boolean) => {
                if (clientCreated) this.handleClientCreation();
            }
        );
    }

    /**
     * Opens dialog window with client detail
     * @param client
     */
    showDetail(client: Client): void {
        this.dialog.open(ClientDetailComponent).componentInstance.client = client;
    }

    /**
     * Shows message, waits for client creation
     * and reloads client
     */
    private handleClientCreation():void {
        this.loadClients();
        this.showMessage(CreateClientComponent.CREATE_DONE_MSG);
    }

    /**
     * Opens snackbar and displays given message
     * @param message
     * @param duration
     */
    private showMessage(message: string, duration: number = Constants.MSG_DISPLAY_TIME): void {
        this.snackBar.open(message, null, {
            duration: duration,
        });
    }

    /**
     * Loads clients
     */
    private loadClients() {
        this.clientService.getAllClients().subscribe(
            res => this.clients = res,
            error => console.log('Error loading clients ', error)
        );
    }
}
