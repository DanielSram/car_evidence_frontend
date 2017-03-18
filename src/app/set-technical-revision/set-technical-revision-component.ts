import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateUtils } from '../shared/date-utils.service';
import { TechnicalRevisionService } from '../shared/technical-revision.service';
import { Constants } from '../shared/Constants';

/**
 * Class representing a dialog window
 * for setting technical revision on Car detail.
 */
@Component({
    selector: 'set-technical-revision',
    templateUrl: './set-technical-revision-component.html',
    styleUrls: [],
})
export class SetTechnicalRevisionComponent implements OnInit {

    public static CREATE_DONE_MSG = 'STK byla úspěšně vytvořena.';

    form: FormGroup;
    car: CarItem;

    /**
     * @constructor
     * @param dialogRef
     * @param technicalRevisionService
     * @param formBuilder
     */
    constructor(private dialogRef: MdDialogRef<SetTechnicalRevisionComponent>,
                private technicalRevisionService: TechnicalRevisionService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            checkDate: [],
            isPass: [],
            description: [],
            car: [this.car.id]
        });
    }

    submit(): void {
        let tr: TechnicalRevision = this.form.value;
        tr.checkDate = DateUtils.anyToMilliseconds(tr.checkDate);
        tr.isPass = tr.isPass ? Constants.YES : Constants.NO;

        this.technicalRevisionService.createTechnicalRevision(tr).subscribe(
            () => this.close(true),
            error => console.error('Error creating revision: ' + error)
        );
    }

    /**
     * Closes this dialog window
     * providing parameter whether was revision created or not.
     *
     * @param wasRevisionCreated
     */
    close(wasRevisionCreated: boolean = false): void {
        this.dialogRef.close(wasRevisionCreated);
    }

}

















