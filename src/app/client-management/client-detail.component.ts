import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

/**
 * Class representing a dialog window for Client detail
 */
@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: [],
})
export class ClientDetailComponent {

    client: Client;

    /**
     * @constructor
     * @param dialogRef
     */
    constructor(private dialogRef: MdDialogRef<ClientDetailComponent>) {
    }

    /**
     * Closes client detail window
     */
    onClose(): void {
        this.dialogRef.close(false);
    }

}
