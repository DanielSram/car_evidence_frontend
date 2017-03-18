import {Component, OnInit} from '@angular/core';
import {TractorService} from '../shared/tractor.service';
import {Params, ActivatedRoute} from '@angular/router';
import {MdSnackBar, MdDialog} from '@angular/material';
// import {EditTractorComponent} from '../edit-tractor/edit-tractor.component';
import {SetTechnicalRevisionComponent} from '../set-technical-revision/set-technical-revision-component';
import {Constants} from '../shared/Constants';
import carStates from '../shared/CarStates';
import {CreateRepairComponent} from "../create-repair/create-repair.component";

/**
 * Class representing a dialog window for Car detail
 */
@Component({
    selector: 'car-detail',
    templateUrl: './tractor-detail.component.html',
    styleUrls: [],
})
export class CarDetailComponent implements OnInit {

    private static EDIT_DONE_MSG = 'Vozidlo bylo úspěšně upraveno.';

    car: CarItem;
    broken = false;
    editState = false;
    states: Object[];
    carId: number;
    revisionReloader = 0;
    repairReloader = 0;

    /**
     * @constructor
     * @param tractorService
     * @param route
     * @param dialog
     * @param snackBar
     */
    constructor(private tractorService: TractorService,
                private route: ActivatedRoute,
                private dialog: MdDialog,
                private snackBar: MdSnackBar) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.loadCar(params['id']);
        });
    }

    /**
     * Shortcut for setting state on vehicle
     * @param state
     */
    changeState(state: string): void {
        this.car.carState = state;
        this.editState = false;
        this.checkIfBroken();
        this.tractorService.editCar(this.car).subscribe(
            () => this.handleCarChange(),
        );
    }

    editCar(): void {

    }

    /**
     * Opens dialog window with new Repair creation form
     */
    repairCar(): void {
        let ref = this.dialog.open(CreateRepairComponent);
        ref.componentInstance.car = this.car;
        ref.afterClosed().subscribe(
            (wasRepairCreated: boolean) => {
                if (wasRepairCreated) this.handleNewRepair()
            });
    }

    setTechnicalRevision(): void {
        let ref = this.dialog.open(SetTechnicalRevisionComponent);
        ref.componentInstance.car = this.car;
        ref.afterClosed().subscribe(
            (wasRevisionCreated: boolean) => {
                if (wasRevisionCreated) this.handleNewRevision()
            });
    }

    private handleNewRevision(): void {
        this.showMessage(SetTechnicalRevisionComponent.CREATE_DONE_MSG);
        this.reloadRevisionList();
    }

    private handleNewRepair(): void {
        this.showMessage(CreateRepairComponent.CREATE_DONE_MSG);
        this.reloadRepairList();
    }

    /**
     * Reloads child component - revision list
     */
    private reloadRevisionList(): void {
        this.revisionReloader += 1;
    }

    /**
     * Reloads child component - repair list
     */
    private reloadRepairList(): void {
        this.repairReloader += 1;
    }

    /**
     * Reloads this.car and displays message
     */
    private handleCarChange(): void {
        this.loadCar(this.car.id);
        this.showMessage(CarDetailComponent.EDIT_DONE_MSG);
    }

    /**
     * Loads this.car
     * @param id
     */
    private loadCar(id: number): void {
        this.tractorService.getCarById(id).subscribe(
            res => this.setCar(res),
            error => console.log('Error loading car with id ' + id, error)
        );
    }

    private setCar(car: CarItem): void {
        this.car = car;
        this.carId = car.id;
        this.checkIfBroken();
        this.loadCarStates();
    }

    /**
     * Checks whether car is broken
     */
    private checkIfBroken(): void {
        this.broken = this.car.carState === Constants.BROKEN;
    }

    /**
     * Loads car states excluding lended states
     * also excluding in_garage state if this.car is in lended state
     */
    private loadCarStates(): void {
        let states = carStates;
        this.states = states.filter(el => {
            return el.value !== Constants.LENDED &&
                (this.car ?
                    (this.car.carState === Constants.LENDED ? el.value !== Constants.IN_GARAGE : true)
                    : true);
        });
    }

    /**
     * Opens popup and displays given message
     * @param message
     * @param duration
     */
    private showMessage(message: string, duration: number = Constants.MSG_DISPLAY_TIME): void {
        this.snackBar.open(message, null, {
            duration: duration,
        });
    }
}
