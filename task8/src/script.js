let company = {
    sales: [
        { name: "John", salary: 1000 },
        { name: "Alice", salary: 600 },
    ],
    development: {
        sites: [
            { name: "Peter", salary: 2000 },
            { name: "Alex", salary: 1800 },
        ],
        internals: [{ name: "Jack", salary: 1300 }],
    },
};

function totalSales(company) {
    if (typeof company.salary === "number") {
        return company.salary;
    }
    let sum = 0;
    for (let key in company) {
        sum += totalSales(company[key]);
    }
    return sum;
}

const total = totalSales(company);
console.log(total);
