function User(name, surname, age, location) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.location = location;
}

User.prototype.getInfo = function () {
    return {
        name: this.name,
        surname: this.surname,
        age: this.age,
        location: this.location,
    };
};

const user = new User("Zvekič", "Adam", 21, "Slovenija");

console.log(user.getInfo());
