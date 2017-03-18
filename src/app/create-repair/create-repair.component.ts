import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RepairService } from '../shared/repair.service';

/**
 * Class representing a dialog window
 * for creating Repairs on Car
 */
@Component({
    selector: 'create-repair',
    templateUrl: './create-repair.component.html',
    styleUrls: [],
})
export class CreateRepairComponent implements OnInit {

    public static CREATE_DONE_MSG = 'Oprava byla úspěšně vytvořena.';

    form: FormGroup;
    car: CarItem;

    /**
     * @constructor
     * @param dialogRef
     * @param repairService
     * @param formBuilder
     */
    constructor(private dialogRef: MdDialogRef<CreateRepairComponent>,
                private repairService: RepairService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            price: [],
            description: [],
            car: [this.car.id]
        });
    }

    submit(): void {
        let repair: Repair = this.form.value;
        
        this.repairService.createRepair(repair).subscribe(
            () => this.close(true),
            error => console.error('Error creating repair: ' + error)
        );
    }

    /**
     * Closes this dialog window
     * providing parameter whether was repair created or not.
     *
     * @param wasRepairCreated
     */
    close(wasRepairCreated: boolean = false): void {
        this.dialogRef.close(wasRepairCreated);
    }

}

















