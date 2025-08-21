interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObserver(): void;
}

class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  registerObserver(o: Observer): void {
    //regardless implementation details

    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    //regardless implementation details

    const observerIndex = this.observers.indexOf(o);

    this.observers.splice(observerIndex, 1);
  }

  notifyObserver(): void {
    this.observers.forEach((o) =>
      o.update(this.temperature!, this.humidity!, this.pressure!)
    );
  }

  //we set the property here to notify the observer
  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.notifyObserver();
  }

  //additional weather data
}

//concrete observer
class CurrentConditionsDisplay implements Observer {
  //properties here are used for display()
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  //another way to attach observer
  constructor(weatherData: Subject, private id: number) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  // i don't want display to be used by itself
  private display() {
    console.log(
      `Observer with id: ${this.id} Temperature: ${this.temperature}, Humidity: ${this.humidity}, Pressure: ${this.pressure}`
    );
  }
}

const weatherData = new WeatherData();

const currentConditionWeather = new CurrentConditionsDisplay(weatherData, 123);
const currentConditionWeather2 = new CurrentConditionsDisplay(weatherData, 321);

weatherData.setMeasurements(12, 10, 223);
