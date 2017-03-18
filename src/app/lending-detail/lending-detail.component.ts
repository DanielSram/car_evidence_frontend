import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {LendingService} from '../shared/lending.service';

/**
 * Class representing a dialog window for Lending detail
 */
@Component({
    selector: 'lending-detail',
    templateUrl: './lending-detail.component.html',
    styleUrls: [],
})
export class LendingDetailComponent implements OnInit {

    lending: Object;
    clientName: string;
    lendingID: number;
    carType: string;
    carVin: string;

    /**
     * @constructor
     * @param dialogRef
     * @param lendingService
     */
    constructor(private dialogRef: MdDialogRef<LendingDetailComponent>,
                private lendingService: LendingService) {
    }

    ngOnInit(): void {
        if (this.lendingID) {
            this.lendingService.getLendingById(this.lendingID).subscribe(
                lending => this.lending = lending,
                error => console.error('Error loading lending: ' + error)
            );
        }
    }

    /**
     * Closes modal window
     */
    onClose(): void {
        this.dialogRef.close(false);
    }

}