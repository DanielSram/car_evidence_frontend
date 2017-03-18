import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TractorService} from '../shared/tractor.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MdSnackBar, MdDialog} from '@angular/material';
import {CreateTractorComponent} from './create-tractor.component';
import {Constants} from '../shared/Constants';
import {DateUtils} from '../shared/date-utils.service';

@Component({
    selector: 'my-tractor-list',
    templateUrl: './tractor-list.component.html',
    styleUrls: ['./tractor-list.component.scss'],
    providers: [TractorService]
})
export class TractorListComponent implements OnInit, AfterViewInit {

    public tractorList: any;
    public filterForm: FormGroup;
    public filtred: boolean;

    /**
     * @constructor
     * @param tractorService
     * @param fb - FormBuilder
     * @param router
     * @param route
     * @param snackBar
     * @param dialog
     */
    constructor(private tractorService: TractorService,
                private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private snackBar: MdSnackBar,
                private dialog: MdDialog) {
        this.getCars();
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            acquiredFrom: ['2007-08-21'],
            acquiredTo: ['2007-08-23']
        });
    }

    /**
     * Show messages after view is fully loaded
     */
    ngAfterViewInit(): void {
        this.checkForRouteMessage();
    }

    /**
     * Navigates to create lending form
     */
    public createLending(): void {
        this.router.navigate(['/createLending']);
    }

    /**
     * Loads cars
     */
    public getCars() {
        this.filtred = false;
        this.tractorList = this.tractorService.getCars()
            .subscribe(
                tractors => this.tractorList = tractors,
                error => console.error('Error: loading cars: ' + error)
            );
    }

    // TODO filter by type
    public filterTractor() {
        let filter: SearchParams = {
            acquiredFrom: this.filterForm.value.acquiredFrom,
            acquiredTo: this.filterForm.value.acquiredTo
        };
        this.filtred = true;
        this.tractorService.findCars(filter).subscribe(
            tractors => this.tractorList = tractors,
            error => console.error('Error: ' + error)
        );
    }

    /**
     * Opens modal window with new car form
     */
    public createCar(): void {
        this.dialog.open(CreateTractorComponent).afterClosed().subscribe(
            (carCreated: boolean) => {
                if (carCreated) this.handleNewCarCreation();
            }
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
     * Calculates date difference from today
     * @param dateOfAcquisition
     * @returns {string}
     */
    public calculateAge(dateOfAcquisition: any): string {
        if (!dateOfAcquisition) return null;
        return DateUtils.calculateAge(dateOfAcquisition);
    }

    /**
     * Reloads this.tractorList and displays message
     */
    private handleNewCarCreation(): void {
        this.getCars();
        this.showMessage(CreateTractorComponent.CREATE_DONE_MSG);
    }

    /**
     * Checks whether there is a message in route parameters
     * and displays it in snackbar
     */
    private checkForRouteMessage(): void {
        this.route.params.subscribe((params: Params) => {
            let msg: string = params['message'];
            if (msg) {
                setTimeout(this.showMessage(msg), 20000);
            }
        });
    }

    /**
     * Opens snackbar and displays given message
     * @param message
     * @param duration
     */
    private showMessage(message: string, duration: number = Constants.MSG_DISPLAY_TIME): void {
        this.snackBar.open(message, null, {
            duration: duration,
        });
    }

}
