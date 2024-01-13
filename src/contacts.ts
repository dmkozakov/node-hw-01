const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

async function getContactById(contactId: string) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const oneContact = contacts.find((contact: Contact) => contact.id === contactId);
  return oneContact || null;
}

async function removeContact(contactId: string) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact: Contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name: string, email: string, phone: string) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
