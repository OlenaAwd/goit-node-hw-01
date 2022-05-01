const argv = require('yargs').argv;
const contactsOperations = require('./contacts');


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contact = await contactsOperations.getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found!`)
            }
            console.table(contact);
            break;

        case 'add':
            const addContact = await contactsOperations.addContact(name, email, phone);
            if (addContact === null) {
                console.log(`Contact not added. All fields are not filled.`);
            } else {
                console.log(`Contact added`);
            }
            console.table(addContact);
            break;

        case 'remove':
            const removeContact = await contactsOperations.removeContact(id);
            console.table(removeContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}


invokeAction(argv);

// node index.js --action list
// node index.js --action get --id 5
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// node index.js --action remove --id=3

