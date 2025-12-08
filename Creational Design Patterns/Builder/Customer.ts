interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

//product

class Customer implements ICustomer {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public phoneNumber: string = ""
  ) {}
}

//builder

interface ICustomerBuilder {
  setFirstName(name: string): ICustomerBuilder;
  setLastName(name: string): ICustomerBuilder;
  setEmail(email: string): ICustomerBuilder;
  setPhoneNumber(number: string): ICustomerBuilder;
  build(): ICustomer;
}

class CustomerBuilder implements ICustomerBuilder {
  private firstName!: string;
  private lastName!: string;
  private email!: string;
  private phoneNumber!: string;

  setFirstName(name: string): ICustomerBuilder {
    this.firstName = name;
    return this;
  }

  setLastName(name: string): ICustomerBuilder {
    this.lastName = name;
    return this;
  }

  setEmail(email: string): ICustomerBuilder {
    this.email = email;
    return this;
  }

  setPhoneNumber(number: string): ICustomerBuilder {
    this.phoneNumber = number;
    return this;
  }

  build(): ICustomer {
    return new Customer(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber
    );
  }
}

//Director

class CustomerDirector {
  constructor(private builder: ICustomerBuilder) {}

  buildMinimal(firstName: string, lastName: string, email: string): ICustomer {
    this.builder.setFirstName(firstName);
    this.builder.setLastName(lastName);
    this.builder.setEmail(email);
    return this.builder.build();
  }
}

//client code
const customer = new CustomerDirector(new CustomerBuilder());
console.log(customer.buildMinimal("ola", "baidoun", "ola@gmail.com"));
