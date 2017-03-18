import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {ClientService} from '../shared/client.service';
import {TractorService} from '../shared/tractor.service';
import {LendingService} from '../shared/lending.service';
import {DateUtils} from '../shared/date-utils.service';
import carTypes from '../shared/CarTypes';

/**
 * Class representing two-step form for creating a Lending.
 */
@Component({
    selector: 'create-lending',
    templateUrl: './create-lending.component.html',
    styleUrls: [],
})
export class CreateLendingComponent implements OnInit {

    private static CREATE_DONE_MSG = 'Zápůjčka byla úspěšně vytvořena.';

    formGroup: FormGroup;
    formGroup2: FormGroup;
    clients: Client[] = [];
    cars: CarItem[];
    selectedCarType: any;
    selectedClient: Client;
    selectedCar: CarItem;
    carTypes: Object[];

    datesInvalid = false;
    showStepTwo = false;
    carsLoading = true;

    /**
     * 100 / number of inputs
     * @type {number}
     */
    progressUnit = 12.5;
    progress = 0;

    /**
     * @constructor
     * @param clientService
     * @param lendingService
     * @param tractorService
     * @param formBuilder
     * @param router
     */
    constructor(private clientService: ClientService,
                private lendingService: LendingService,
                private tractorService: TractorService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.carTypes = carTypes;
    }

    ngOnInit(): void {
        this.initFormBuilder();
        this.clientService.getAllClients().subscribe(
            response => this.clients = this.clients.concat(response),
            error => console.log('Error loading clients ', error)
        );
    }

    /**
     * Loads available cars and shows car selection
     */
    continueToStepTwo(): void {
        if (this.datesInvalid) return;
        this.toggleStepTwo();
        this.carsLoading = true;

        let searchParams: SearchParams = {
            type: this.selectedCarType.value,
            availableFrom: this.formGroup.value.dateFrom,
            availableTo: this.formGroup.value.dateTo,
        };

        this.tractorService.findAvailableCars(searchParams).subscribe(
            response => this.setCars(response),
            error => console.log('Error loading cars ', error)
        );
    }

    /**
     * Checks whether dateTo ain't before dateFrom
     */
    checkDateValidity(): void {
        this.datesInvalid = false;
        let dateFrom = this.formGroup.value.dateFrom;
        let dateTo = this.formGroup.value.dateTo;

        if (dateFrom && dateTo) {
            dateFrom = new Date(dateFrom).getTime();
            dateTo = new Date(dateTo).getTime();

            if (dateFrom > dateTo) {
                this.datesInvalid = true;
                return;
            }
        }
        this.calculateProgress();
    }

    /**
     * Creates a new lending and redirects user back
     */
    createLending(): void {
        let lending: Lending = this.formGroup.value;
        lending.car = this.selectedCar.id;
        lending.client = this.selectedClient.id;
        lending.dateFrom = DateUtils.stringToMilliseconds(this.formGroup.value.dateFrom);
        lending.dateTo = DateUtils.stringToMilliseconds(this.formGroup.value.dateTo);
        this.lendingService.createLending(lending).subscribe(
            () => this.router.navigate(['/homeWithMessage', CreateLendingComponent.CREATE_DONE_MSG]),
            error => console.error('Error creating client: ' + error)
        );
    }

    /**
     * Updates progress bar
     */
    calculateProgress(): void {
        this.progress = 0;
        for (let property in this.formGroup.value) {
            if (this.formGroup.value.hasOwnProperty(property)
                && this.formGroup.value[property]) {
                this.progress += this.progressUnit;
            }
        }
        if (this.formGroup2.value.car) this.progress = 100;
    }

    /**
     * Redirects user back home
     */
    redirectBack(): void {
        this.router.navigate(['/']);
    }

    /**
     * Shows step two - car selection
     */
    toggleStepTwo(): void {
        this.showStepTwo = !this.showStepTwo;
    }

    /**
     * Finds selected car
     */
    findSelectedCar(): void {
        let selected = this.formGroup2.value.car;
        this.calculateProgress();
        this.selectedCar = this.cars.find(
            car => CreateLendingComponent.isCarSelected(car, selected)
        );
    }

    /**
     * Finds selected car type
     */
    findSelectedCarType(): void {
        let selected = this.formGroup.value.carType;
        this.calculateProgress();
        this.selectedCarType = this.carTypes.find(
            (type: any) => type.viewValue === selected
        );
    }

    /**
     * Finds selected client
     */
    findSelectedClient(): void {
        let selected = this.formGroup.value.client;
        this.calculateProgress();
        this.selectedClient = this.clients.find(
            client => CreateLendingComponent.isClientSelected(client, selected)
        );
    }

    /**
     * Returns true unless all fields are filled in
     * @returns {boolean}
     */
    isSubmitDisabled(): boolean {
        return !(this.progress === 100);
    }

    private setCars(list): void {
        this.cars = list;
        this.carsLoading = false;
    }

    /**
     * Returns true if given car is selected
     * @param car
     * @param selected
     * @returns {boolean}
     */
    private static isCarSelected(car: CarItem, selected: string): boolean {
        if (!selected) return false;
        let selectedVIN = selected.split(' - ')[1];
        return (car.vin === selectedVIN);
    }

    /**
     * Returns true if given client is selected
     * @param client
     * @param selected
     * @returns {boolean}
     */
    private static isClientSelected(client: Client, selected: string): boolean {
        return (
            ((client.name + ' ' + client.surname) === selected) ||
            (client.name === selected)
        );
    }

    private initFormBuilder(): void {
        this.formGroup = this.formBuilder.group({
            dateFrom: [],
            dateTo: [],
            price: [],
            client: [],
            latitude: [],
            longitude: [],
            carType: []
        });
        this.formGroup2 = this.formBuilder.group({car: []});
    }
}
