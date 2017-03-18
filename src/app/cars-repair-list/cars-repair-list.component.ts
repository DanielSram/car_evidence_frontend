import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {RepairService} from "../shared/repair.service";

/**
 * Repair table for given car
 */
@Component({
    selector: 'cars-repairs-list',
    templateUrl: './cars-repair-list.component.html',
    styleUrls: [],
})
export class CarsRepairsListComponent implements OnInit, OnChanges {

    @Input()
    carId: number;

    @Input()
    reloader: number;

    repairs: Repair[];

    constructor(private repairService: RepairService) {
    }

    ngOnInit(): void {
        if (this.carId) {
            this.loadRepairs();
        }
    }

    ngOnChanges(): void {
        this.loadRepairs();
    }

    private loadRepairs(): void {
        this.repairService.getRepairsForCar(this.carId).subscribe(
            repairs => this.repairs = repairs,
            error => console.log('Error loading repairs ', error)
        );
    }

}
