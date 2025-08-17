//Declare Component
interface Employee {
  getName(): string;
  getSalary(): number;
  getPosition(): string;
}

//Declare Leaf
class Developer implements Employee {
  constructor(
    protected name: string,
    protected salary: number,
    protected position: "SoftWare Engineer" | "Quality Assurance"
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getPosition(): string {
    return this.position;
  }
}

//Declare Leaf
class Designer implements Employee {
  constructor(
    protected name: string,
    protected salary: number,
    protected position: "UX" | "UX/UI"
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getPosition(): string {
    return this.position;
  }
}

//Declare Composite
interface CompositeEmployee extends Employee {
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
  getEmployees(): Employee[];
}

class Manager implements CompositeEmployee {
  protected employees: Employee[] = [];
  constructor(
    protected name: string,
    protected salary: number,
    protected position: "Development Manager" | "Quality Manager"
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getPosition(): string {
    return this.position;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(employee: Employee): void {
    this.employees.splice(this.employees.indexOf(employee), 1);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
}

const dev1 = new Developer("Housam Baydoun", 2500, "SoftWare Engineer");
const dev2 = new Developer("Omar Awawdeh", 1800, "SoftWare Engineer");
const desi = new Designer("Yasmeen Housam", 1500, "UX");

const manager = new Manager("Hasan Baydoun", 4500, "Development Manager");
const teamLeader = new Manager("Ahmad Waleed", 2500, "Development Manager");

manager.addEmployee(dev1);
manager.addEmployee(dev2);
manager.addEmployee(desi);
manager.addEmployee(teamLeader);

console.log(manager);

export {};
