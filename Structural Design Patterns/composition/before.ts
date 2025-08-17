class Employee {
  constructor(
    protected name: string,
    protected salary: number,
    protected position: string
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

class Developer extends Employee {
  constructor(
    name: string,
    salary: number,
    position: "SoftWare Engineer" | "Quality Assurance"
  ) {
    super(name, salary, position);
  }

  writeCode(): string {
    return `${this.name} is writing code...`;
  }
}

class Designer extends Employee {
  constructor(name: string, salary: number, position: "UX" | "UX/UI") {
    super(name, salary, position);
  }

  createDesign(): string {
    return `${this.name} is creating designs...`;
  }
}

// This is the real "before" - Manager can only manage individual employees
// NOT other managers (no composition/hierarchy)
class Manager extends Employee {
  private developers: Developer[] = [];
  private designers: Designer[] = [];

  constructor(
    name: string,
    salary: number,
    position: "Development Manager" | "Quality Manager"
  ) {
    super(name, salary, position);
  }

  // Separate methods for different employee types - not flexible
  addDeveloper(developer: Developer): void {
    this.developers.push(developer);
  }

  addDesigner(designer: Designer): void {
    this.designers.push(designer);
  }

  // Can't add other managers - no composition!
  // This would be impossible: addManager(manager: Manager)

  calculateTeamSalary(): number {
    const devSalaries = this.developers.reduce(
      (total, dev) => total + dev.getSalary(),
      0
    );
    const designSalaries = this.designers.reduce(
      (total, des) => total + des.getSalary(),
      0
    );
    return this.salary + devSalaries + designSalaries;
  }

  getDevelopers(): Developer[] {
    return this.developers;
  }

  getDesigners(): Designer[] {
    return this.designers;
  }
}

// Usage - flat structure only, no hierarchy
const dev1 = new Developer("Housam Baydoun", 2500, "SoftWare Engineer");
const dev2 = new Developer("Omar Awawdeh", 1800, "SoftWare Engineer");

const manager = new Manager("Hasan Baydoun", 4500, "Development Manager");

manager.addDeveloper(dev1);
manager.addDeveloper(dev2);

// This is impossible - manager can't manage another manager:
// const teamLead = new Manager("Omar Crack", 5000, "Development Manager");
// manager.addManager(teamLead); // This method doesn't exist!

console.log(manager);
console.log("Team salary:", manager.calculateTeamSalary());

export {};
