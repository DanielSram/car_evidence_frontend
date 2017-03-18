import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {ClientService} from '../shared/client.service';

/**
 * Class representing a dialog window for Client creation.
 */
@Component({
    selector: 'create-client',
    templateUrl: './create-client.component.html',
    styleUrls: [],
})
export class CreateClientComponent implements OnInit {

    public static CREATE_DONE_MSG = 'Klient byl úspěšně vytvořen.';

    createCompany = true;
    submitDisabled = true;
    newClientForm: FormGroup;

    /**
     * @constructor
     * @param formBuilder
     * @param dialogRef
     * @param clientService
     */
    constructor(private formBuilder: FormBuilder,
                private dialogRef: MdDialogRef<CreateClientComponent>,
                private clientService: ClientService) {
    }

    ngOnInit(): void {
        this.newClientForm = this.formBuilder.group({
            name: [],
            phone: [],
            email: [],
            address: [],
            crn: [],
            surname: []
        });
    }

    /**
     * Changes between Person and Company creation
     */
    toggleCreationType(): void {
        this.createCompany = !this.createCompany;
        this.checkForm();
    }

    /**
     * Checks whether form is valid
     */
    checkForm(): void {
        this.submitDisabled = !(
            this.newClientForm.value.name &&
            this.newClientForm.value.phone &&
            (this.createCompany ? this.newClientForm.value.crn : this.newClientForm.value.surname)
        )
    }

    /**
     * Creates a new client
     */
    createClient(): void {
        this.clientService.createClient(this.newClientForm.value).subscribe(
            () => this.close(true),
            error => console.error('Error creating client: ' + error)
        );
    }

    /**
     * Closes this dialog window returning indicator if client was created
     * @param wasClientCreated
     */
    close(wasClientCreated: boolean = false): void {
        this.dialogRef.close(wasClientCreated);
    }

}
