// Question 1
/* Write a function that given two positive integer value parameters will print
which is evenly divisible by the lowest parameter value. 
which is evenly divisible by the lowest parameter value.
Examples
Given 17 and 4, the output will be 4, 8, 12, 16
Given 21 and 7, the output will be 14
Given 5 and 20, the output will be 10, 20
Given 3 and 10, the output will be 6
Given 2 and 2, the output will be 2 */

function printEvenMultiples(first, second) {
  const lowest = Math.min(first, second);
  const highest = Math.max(first, second);

  for (let number = 2; number <= highest; number += 2) {
    if (number % lowest === 0) {
      console.log(number);
    }
  }
}

// Question 2
/* Write an object oriented class system to accommodate the following
requirements. You can supplement some logic with comments in order to
complete this question within the time constraints (as needed).
Suppose there are 3 types of vehicles: cars, motorcycles, and buses. Each
type of vehicle has the following public properties:
Make and model
Number of wheels
Length
Weight
Max number of passengers
Additionally, there are 2 places a vehicle can park: parking lot and a parking
garage. Both lots and garages have a set number of spaces for each
location, but each type differs in the following ways:
Lots can accommodate any type of vehicle; however, garages can only
accommodate cars and motorcycles.
Garages (only) have "compact only" spaces in addition to normal
spaces where only vehicles weighing less than 1,500 can park. When
possible, compact spaces should be utilized before a normal space */

class Vehicle {
  constructor(make, model, numberOfWheels, length, weight, maxPassengers) {
    this.make = make;
    this.model = model;
    this.numberOfWheels = numberOfWheels;
    this.length = length;
    this.weight = weight;
    this.maxPassengers = maxPassengers;
  }
}

class Car extends Vehicle {}
class Motorcycle extends Vehicle {}
class Bus extends Vehicle {}

class ParkingLocation {
  //private fields
  #normalOccupants = new Set();
  #compactOccupants = new Set();
  #normalCapacity;
  #compactCapacity;

  constructor(normalSpaces, compactSpaces = 0) {
    if (
      !Number.isInteger(normalSpaces) || normalSpaces < 0 ||
      !Number.isInteger(compactSpaces) || compactSpaces < 0
    ) {
      throw new RangeError('Space counts must be nonnegative integers.');
    }

    this.#normalCapacity = normalSpaces;
    this.#compactCapacity = compactSpaces;
  }

  get availableNormalSpaces() {
    return this.#normalCapacity - this.#normalOccupants.size;
  }

  get availableCompactSpaces() {
    return this.#compactCapacity - this.#compactOccupants.size;
  }

  accepts() {
    throw new Error('Subclasses must define which vehicles they accept.');
  }

  tryPark(vehicle) {
    if (!(vehicle instanceof Vehicle) || !this.accepts(vehicle)) {
      return false;
    }

    if (this.#normalOccupants.has(vehicle) || this.#compactOccupants.has(vehicle)) {
      return false;
    }

    if (vehicle.weight < 1500 && this.availableCompactSpaces > 0) {
      this.#compactOccupants.add(vehicle);
      return true;
    }

    if (this.availableNormalSpaces > 0) {
      this.#normalOccupants.add(vehicle);
      return true;
    }

    return false;
  }

  tryLeave(vehicle) {
   return this.#compactOccupants.delete(vehicle) || this.#normalOccupants.delete(vehicle);
  }
}

class ParkingLot extends ParkingLocation {
  constructor(spaces) {
    super(spaces);
  }

  accepts(vehicle) {
    return vehicle instanceof Vehicle;
  }
}

class ParkingGarage extends ParkingLocation {
  constructor(normalSpaces, compactSpaces) {
    super(normalSpaces, compactSpaces);
  }

  accepts(vehicle) {
    return vehicle instanceof Car || vehicle instanceof Motorcycle;
  }
}
