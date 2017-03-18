import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import carStates from '../shared/CarStates';

/**
 * Class representing a dialog window for Car editaion.
 */
@Component({
    selector: 'edit-tractor',
    templateUrl: './edit-tractor.component.html',
    styleUrls: [],
})
export class EditTractorComponent {

    car: CarItem;
    states: Object[];

    /**
     * @constructor
     * @param dialogRef
     */
    constructor(private dialogRef: MdDialogRef<EditTractorComponent>) {
        this.states = carStates;
    }

    editDone(): void {
        this.dialogRef.close();
    }
}
