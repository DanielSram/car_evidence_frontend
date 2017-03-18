import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {TractorService} from '../shared/tractor.service';
import carTypes from '../shared/CarTypes';

/**
 * Component representing a dialog window for new car creation.
 */
@Component({
    selector: 'create-tractor',
    templateUrl: './create-tractor.component.html',
    styleUrls: [],
})
export class CreateTractorComponent implements OnInit {

    public static CREATE_DONE_MSG = 'Vozidlo bylo úspěšně vytvořeno';

    form: FormGroup;
    carTypes: Object[] = [];

    /**
     * @constructor
     * @param formBuilder
     * @param dialogRef
     * @param tractorService
     */
    constructor(private formBuilder: FormBuilder,
                private dialogRef: MdDialogRef<CreateTractorComponent>,
                private tractorService: TractorService,) {
        this.carTypes = carTypes;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            type: [],
            vin: [],
            dateOfAcquisition: [],
            price: [],
            nickname: [],
        });
    }

    /**
     * Creates a new cars and closes this dialog window
     */
    public createNewCar() {
        let selectedType: any = this.carTypes
            .find((type: any) => type.viewValue === this.form.value.type);

        let newCar = this.form.value;
        newCar.type = selectedType.value;

        this.tractorService.addCar(newCar).subscribe(
            () => this.dialogRef.close(true),
            error => console.error('Error creating car: ' + error)
        );
    }

    /**
     * Closes this dialog window
     */
    cancelCreating(): void {
        this.dialogRef.close(false);
    }

}
