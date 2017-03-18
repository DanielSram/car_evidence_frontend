import {Component, OnInit} from '@angular/core';
import {TractorService} from '../shared/tractor.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {LendingDetailComponent} from '../lending-detail/lending-detail.component';

/**
 * List of cars needing technical revision
 */
@Component({
    selector: 'cars-needing-revision',
    templateUrl: './cars-needing-revision.component.html',
    styleUrls: [],
})
export class CarsNeedingRevisionComponent implements OnInit {

    cars: CarNeedingRevision[];

    /**
     * @constructor
     * @param tractorService
     * @param dialog
     * @param router
     */
    constructor(private tractorService: TractorService,
                private dialog: MdDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.tractorService.getCarsWithForthcomingRevision().subscribe(
            res => this.cars = res,
            error => console.log('Error loading clients ', error)
        );
    }

    /**
     * Navigates user to CarDetailComponent
     * @param id
     */
    public navigateToCarDetail(id: number): void {
        this.router.navigate(['/detail', id]);
    }

    /**
     * Opens dialog window with lending detail
     * @param car
     */
    public showLendingDetail(car: CarNeedingRevision): void {
        let ref = this.dialog.open(LendingDetailComponent);
        ref.componentInstance.lendingID = car.lendingId;
        ref.componentInstance.clientName = car.clientName;
        ref.componentInstance.carType = car.type;
        ref.componentInstance.carVin = car.vin;
    }

}
