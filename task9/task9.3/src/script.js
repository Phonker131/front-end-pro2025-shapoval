const contacts = [
    {
        name: "Akim",
        phone: "+380999999999",
        email: "akim@email.com",
    },
    {
        name: "Olena",
        phone: "+380501234567",
        email: "olena@example.com",
    },
];

function Contact({ id, name, phone, email }) {
    this.id = id || Math.floor(Math.random() * 1000);
    this.name = name;
    this.phone = phone;
    this.email = email;
}

function Book(contacts) {
    this.contacts = contacts;
}

Book.prototype.find = function (id) {
    return this.contacts.find((c) => c.id === id) || null;
};

Book.prototype.add = function (contact) {
    let toAdd;
    if (contact instanceof Contact) {
        toAdd = contact;
    } else {
        toAdd = new Contact(contact);
    }
    this.contacts.push(toAdd);
    return toAdd;
};

Book.prototype.remove = function (id) {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) {
        return false;
    }
    this.contacts.splice(index, 1);
    return true;
};

Book.prototype.update = function (id, newData) {
    const contact = this.find(id);
    if (!contact) {
        return null;
    }
    if (newData.name !== undefined) contact.name = newData.name;
    if (newData.phone !== undefined) contact.phone = newData.phone;
    if (newData.email !== undefined) contact.email = newData.email;
    return contact;
};

const mappedContacts = contacts.map((el) => new Contact(el));

const book = new Book(mappedContacts);

console.log("All Contacts:", book.contacts);

const akim = book.find(mappedContacts[0].id);
console.log("Find Akim:", akim);

const newContact = book.add({
    name: "Ivan",
    phone: "+380671234567",
    email: "ivan@example.com",
});
console.log("Adding Ivan:", newContact);

const removed = book.remove(mappedContacts[1].id);
console.log("Removing Olga:", removed);

const updated = book.update(newContact.id, {
    phone: "+380631112233",
    email: "ivan.new@example.com",
});
console.log("Updated Ivan:", updated);

console.log("Final list:", book.contacts);
