import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  Employee,
  EmployeeCollection,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import {
  SupervisionGroup,
  SupervisionGroupCollection,
  SupervisionGroupSupervisor,
  SupervisionGroupSupervisorCollection,
} from 'src/app/shared/models/organization.model';

import * as organizationActions from '../../actions';
import * as employeesActions from '../../../employee/actions';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Component({
  selector: 'app-supervisiongroupsupervisor-list',
  templateUrl: './supervisiongroupsupervisor-list.component.html',
  styleUrls: ['./supervisiongroupsupervisor-list.component.css'],
})
export class SupervisiongroupsupervisorListComponent implements OnInit {
  supervisiongroupsupervisorForm!: FormGroup;

  supervisiongroupsupervisors!: SupervisionGroupSupervisorCollection;
  pending: boolean = false;
  submiterror: any;

  employees!: EmployeeCollection;
  pending_employees: boolean = false;
  availableemployees!: Employee[];
  filteredemployees: Employee[] = [];
  supervisiongroup_id!: number;

  supervisors!: { employee: Employee; id: number }[];

  supervisiongroups!: SupervisionGroupCollection;
  pending_supervisiongroups: boolean = false;
  supervisiongroup: SupervisionGroup = {} as SupervisionGroup;

  selectedEmployeeId: number = -1;
  submitted: boolean = false;

  display!: DisplayResourceCollection;
  search!: EmployeeSearch;
  searchvalue!: string;
  is_hidden: boolean = true;
  direction: string = 'down';

  private searchSubject: Subject<string> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('supervisiongroupsupervisors')
      .subscribe((supervisiongroupsupervisors) => {
        this.supervisiongroupsupervisors =
          supervisiongroupsupervisors.supervisiongroupsupervisors;
        this.pending = supervisiongroupsupervisors.pending;
        this.availableemployees = this.getAvailableEmployees();

        this.selectedEmployeeId = -1;

        //this.getSupervisors();
      });

    this.display = {
      page: '1',
      per_page: '10000',
      sort_field: 'last_name',
      sort_direction: 'asc',
    };
    this.search = {} as EmployeeSearch;
    //if (this.employees.meta === null)
    this.dispatchLoadEmployee();

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending_employees = employees.pending;
      //this.availableemployees = this.getAvailableEmployees();
    });

    this.store.select('supervisiongroups').subscribe((supervisiongroups) => {
      this.supervisiongroups = supervisiongroups.supervisiongroups;
      this.pending_supervisiongroups = supervisiongroups.pending;
    });

    this.route.params.subscribe((params) => {
      this.supervisiongroup_id = +params.supervisiongroup_id;
      const the_supervisiongroup: any = (this.supervisiongroups?.data.find(
        (supervisiongroup: any) =>
          supervisiongroup.id === this.supervisiongroup_id
      ) || {}) as SupervisionGroup;
      if (the_supervisiongroup !== {}) {
        this.supervisiongroup = the_supervisiongroup;
      }

      this.store.dispatch(
        organizationActions.loadSupervisionGroupSupervisors({
          supervisiongroup_id: this.supervisiongroup_id,
          page: '1',
        })
      );
    });

    this.submitted = false;

    this.supervisiongroupsupervisorForm = this.formBuilder.group({
      employee_id: [],
    });
  }

  getTextColourFromName = getTextColourFromName;

  ispending(): boolean {
    return (
      this.pending || this.pending_employees || this.pending_supervisiongroups
    );
  }

  getSupervisors(): void {
    this.supervisors = [];
    for (let supervisiongroupsupervisor of this.supervisiongroupsupervisors
      ?.data) {
      let supervisor = this.employees?.data.find(
        (employee) => employee.id === supervisiongroupsupervisor.employee_id
      );
      if (supervisor) {
        this.supervisors.push({
          employee: supervisor,
          id: supervisiongroupsupervisor.id,
        });
      }
    }
  }

  removeSupervisor(supervisiongroupsupervisor_id: number) {
    this.store.dispatch(
      organizationActions.deleteSupervisionGroupSupervisor({
        supervisiongroup_id: this.supervisiongroup_id,
        supervisiongroupsupervisor_id,
      })
    );
  }

  getEmployee(employee_id: number): Employee {
    return (
      this.employees.data.find((employee) => employee.id === employee_id) ||
      ({} as Employee)
    );
  }

  getAvailableEmployees(): Employee[] {
    return this.employees?.data.filter((employee) => {
      return (
        this.supervisiongroupsupervisors?.data.find(
          (supervisiongroupsupervisor) =>
            supervisiongroupsupervisor.employee_id === employee.id
        ) === undefined
      );
    });
  }

  addEmployee() {
    if (this.selectedEmployeeId === -1) return;

    this.submitted = true;

    let supervisiongroupsupervisor = {
      employee_id: this.selectedEmployeeId,
    } as SupervisionGroupSupervisor;

    this.store.dispatch(
      organizationActions.addSupervisionGroupSupervisor({
        supervisiongroup_id: this.supervisiongroup_id,
        supervisiongroupsupervisor,
      })
    );

    this.selectedEmployeeId = -1;
  }

  removeEmployee(supervisiongroupsupervisor_id: number) {
    this.store.dispatch(
      organizationActions.deleteSupervisionGroupSupervisor({
        supervisiongroup_id: this.supervisiongroup_id,
        supervisiongroupsupervisor_id,
      })
    );
  }
  getSubmitErrorDescription(): string {
    let error: string = '';
    if (this.submitted && this.submiterror?.error) {
      Object.entries(this.submiterror.error.errors).forEach((item: any) => {
        item[1].forEach((err: string) => (error += err + ' '));
      });
    }
    return error;
  }

  acceptError() {
    this.submitted = false;
  }

  loadpage(page: string) {
    this.store.dispatch(
      organizationActions.loadSupervisionGroupSupervisors({
        supervisiongroup_id: this.supervisiongroup_id,
        page,
      })
    );
  }

  dispatchLoadEmployee(): void {
    this.store.dispatch(
      employeesActions.loadEmployees({
        display: this.display,
        search: this.search,
      })
    );
  }

  normalized(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterEmployees(filter: string) {
    this.is_hidden = true;
    if (filter === '') {
      this.filteredemployees = [];
    } else {
      this.filteredemployees = this.availableemployees.filter((employee) => {
        return (
          this.normalized(employee.last_name)
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          this.normalized(employee.first_name)
            .toLowerCase()
            .includes(filter.toLowerCase())
        );
      });
    }

    if (this.filteredemployees != []) this.is_hidden = false;
  }

  initSearch() {
    if (this.searchSubject.observers.length === 0) {
      this.searchSubject
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((filter) => {
          this.filterEmployees(filter);
        });
    }
  }

  doSearch(event: any) {
    this.initSearch();
    this.searchvalue = event.target.value;
    this.searchSubject.next(this.searchvalue);
  }

  closelist() {
    this.is_hidden = true;
  }

  togglelist() {
    this.is_hidden = !this.is_hidden;
  }

  isSelected(employee: Employee): boolean {
    return this.selectedEmployeeId === employee.id;
  }

  selectItem(employee: Employee) {
    this.selectedEmployeeId = employee.id;
    //this.selectedEmployeeIdChange.emit(this.selectedEmployeeId);
    this.togglelist();
  }

  selected(): Employee {
    return (
      this.filteredemployees?.find(
        (employee) => employee.id === this.selectedEmployeeId
      ) || ({} as Employee)
    );
  }

  displayname(employee: Employee): string {
    return employee.last_name
      ? `${employee.last_name}, ${employee.first_name}`
      : '';
  }
}
