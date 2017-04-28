import { Employees } from '../models/Employees'
import { EmployeesService } from '../services/Employees.service'
import {Component, OnInit}      from 'angular2/core'

@Component({
    selector: 'app',
    templateUrl: BASE_URL + '/templates/app.template.html',
    providers: [EmployeesService]
})

export class AppComponent {

    public employee: Employees;
    public listEmployee: Employees[];
    public actionform: string;

    constructor(private _employeeService: EmployeesService) {
        this.employee = new Employees();
        this.listEmployee = [];
        this.actionform = "New";
    }

    public ngOnInit() {
        this.getEmployees();
    }

    // Get Employees
    public getEmployees() {
        this._employeeService.getData().subscribe(
            data => {
                this.listEmployee = Employees.fromJsonList(data.d.results);
            },
            err => { console.log("GET Employees Error: " + err._body); }
        );
    }

    // Guardar Employees
    public AddEmployees() {

        if (this.actionform == "New") {
            this._employeeService.addData(this.employee).subscribe(
                data => {
                    this.listEmployee.push(Employees.fromJson(data.d));
                    this.employee = new Employees();
                },
                err => { console.log("POST Add Error: " + err._body); }
            );
        }
        else if (this.actionform == "edit") {
            this._employeeService.putData(this.employee).subscribe(
                data => {
                    this.actionform = "New";
                    this.employee = new Employees();
                },
                err => { console.log("PUT employees Error: " + err._body); }
            );
        }

    }

    // Editar alumno
    public EditEmployees(employe: Employees) {
        this.employee = employe;
        this.actionform = "edit";
    }

    // Borrar alumno
    public DeleteEmployees(employe: Employees) {
        if (this.actionform == "edit" && this.employee.id == employe.id) {
            this.employee = new Employees();
            this.actionform = "New";
        }

        this._employeeService.deleteData(employe).subscribe(
            data => {
                var i = this.listEmployee.map(function (e) { return e.id; }).indexOf(employe.id);
                this.listEmployee.splice(i, 1);
            },
            err => { console.log("DELETE employee Error: " + err._body); }
        );
    }
}