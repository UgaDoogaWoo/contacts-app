import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import './style-profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBriefcase, faCircleLeft, faMobileScreen, faAt, faUser } from '@fortawesome/free-solid-svg-icons';

function formatPhoneNumber(phoneNumber) {
    var formattedNumber='';
    var rest = phoneNumber.replace(/[-.]/g, '');

    if (phoneNumber.includes('(') && phoneNumber.includes(')')) {
        // Number has parentheses
        const areaCode = phoneNumber.substring(phoneNumber.indexOf('(') + 1, phoneNumber.indexOf(')'));
        formattedNumber = `A/C:${areaCode} `;
        rest = rest.substring(rest.indexOf(')') + 1);
    } if (phoneNumber.includes('x')) {
        // Number has extension
        const numberParts = rest.split('x');
        const number = numberParts[0];
        const extension = numberParts[1];
        formattedNumber = formattedNumber + `No.:${number} Ext.:${extension}`;
    } else {
        formattedNumber = formattedNumber +'No.:'+ rest;
    }

    return formattedNumber;
}

const ContactProfile = ({ contact, onContactClick }) => {
    const formattedPhone = formatPhoneNumber(contact.phone);
    return (
        <div className="profile-container">
            <header className="profile">
                <button className="back-button" onClick={onContactClick}>
                    <FontAwesomeIcon icon={faCircleLeft} />
                </button>
                <div className="profile-info">
                    <h1 className="profile-name">{contact.name}</h1>
                </div>
            </header>

            <section className="profile-contact-info">
                <div className="profile-info-line">
                    <FontAwesomeIcon icon={faUser} className="icon-gradient" />
                    <p className="profile-user">{contact.username}</p>
                </div>
                <div className="profile-info-line">
                    <FontAwesomeIcon icon={faMobileScreen} className="icon-gradient" />
                    <p className="profile-phone-number">{formattedPhone}</p>
                </div>
                <div className="profile-info-line">
                    <FontAwesomeIcon icon={faAt} className="icon-gradient" />
                    <p className="profile-email">{contact.email}</p>
                </div>
                <div className="profile-info-line">
                    <FontAwesomeIcon icon={faBriefcase} className="icon-gradient" />
                    <p className="profile-company">{contact.company.name}</p>
                </div>
            </section>
        </div>
    );
};

const ContactList = ({ contacts, onContactClick }) => {
    return (
        <div className="list-container">
            <header className="list-header">
                <h1 className="contacts-title">Contacts</h1>
            </header>

            <section className="list-contacts-library">
                <ul className="contacts-list">
                    {contacts.map(contact => (
                        <button className="list-button" onClick={() => onContactClick(contact)}>
                                <li className="list-item">
                                    <p className="list-contact-name">{contact.name}</p>
                                    <p className="list-user">{contact.username}</p>
                                </li>
                            <hr />
                        </button>
                    ))}
                </ul>
            </section>
        </div>
    );
};

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }, []);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleBackClick = () => {
        setSelectedContact(null);
    };


    return (
        <div>
            {selectedContact ? (
                <ContactProfile contact={selectedContact} onContactClick={handleBackClick} />
            ) : (
                <ContactList contacts={contacts} onContactClick={handleContactClick} />
            )}
        </div>
    );
};

export default App;
