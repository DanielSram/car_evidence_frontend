import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {TechnicalRevisionService} from '../shared/technical-revision.service';

/**
 * Revision table for given car
 */
@Component({
    selector: 'cars-revisions-list',
    templateUrl: './cars-revisions-list.component.html',
    styleUrls: [],
})
export class CarsRevisionsListComponent implements OnInit, OnChanges {

    @Input()
    carId: number;

    @Input()
    reloader: number;

    revisions: TechnicalRevision[];

    constructor(private revisionService: TechnicalRevisionService) {
    }

    ngOnInit(): void {
        if (this.carId) {
            this.loadRevisions();
        }
    }

    ngOnChanges(): void {
        this.loadRevisions();
    }

    private loadRevisions(): void {
        this.revisionService.getRevisionsForCar(this.carId).subscribe(
            revisions => this.revisions = revisions,
            error => console.log('Error loading revisions ', error)
        );
    }

}
