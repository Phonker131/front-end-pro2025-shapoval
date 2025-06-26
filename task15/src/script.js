function Student(name, surname, birthDate, assessments = []) {
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
    this.assessments = assessments;
    this.attendance = new Array(25).fill(null);
    this.attendanceIndex = 0;
}

Student.prototype.getAge = function () {
    return new Date().getFullYear() - this.birthDate;
};

Student.prototype.getAverage = function () {
    if (!this.assessments.length) return 0;
    const total = this.assessments.reduce((sum, mark) => sum + mark, 0);
    return total / this.assessments.length;
};

Student.prototype.present = function () {
    if (this.attendanceIndex < 25) {
        this.attendance[this.attendanceIndex++] = true;
    } else {
        console.log("Відвідуваність заповнена повністю!");
    }
    return this;
};

Student.prototype.absent = function () {
    if (this.attendanceIndex < 25) {
        this.attendance[this.attendanceIndex++] = false;
    } else {
        console.log("Відвідуваність заповнена повністю!");
    }
    return this;
};

Student.prototype.summary = function () {
    const avgMark = this.getAverage();
    const totalLessons = this.attendance.filter((v) => v !== null).length;
    const presents = this.attendance.filter((v) => v === true).length;
    const attendanceRate = totalLessons ? presents / totalLessons : 0;

    if (avgMark > 90 && attendanceRate > 0.9) {
        return "Молодець!";
    } else if (avgMark > 90 || attendanceRate > 0.9) {
        return "Добре, але можна краще";
    } else {
        return "Редиска!";
    }
};

const student1 = new Student("exampleName1", "exampleSurname1", 1999, [100, 99, 80, 1]);
const student2 = new Student("exampleName2", "exampleSurname2", 1998, [0, 2]);

student1.present().absent().present();
console.log(student1.summary());

const student3 = new Student("Іван", "Іваненко", 2000, [100, 95, 91]);
const student4 = new Student("Марія", "Петренко", 1999, [60, 70, 80]);

student3.present().present().present();
student4.present().absent().present().present();

console.log(student3.name + " – " + student3.summary());
console.log(student4.name + " – " + student4.summary());
