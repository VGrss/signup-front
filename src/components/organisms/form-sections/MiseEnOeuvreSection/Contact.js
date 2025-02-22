import React from 'react';
import PropTypes from 'prop-types';

import './Contact.css';
import TextInput from '../../../atoms/inputs/TextInput';
import Quote from '../../../atoms/inputs/Quote';
import EmailInput from '../../../atoms/inputs/EmailInput';
import TelInput from '../../../atoms/inputs/TelInput';

export const Contact = ({
  id,
  heading,
  description,
  given_name,
  family_name,
  emailDescription,
  email,
  emailPlaceholder = '',
  phone_number,
  job,
  display_mobile_phone_label = false,
  disabled,
  onChange,
}) => (
  <div className="card">
    <div className="card__content">
      <h3>{heading}</h3>
      {description && <Quote>{description}</Quote>}
      {typeof given_name !== 'undefined' && typeof family_name !== 'undefined' && (
        <div className="form-row">
          <div className="form-col">
            <TextInput
              label="Prénom"
              name={`contacts.${id}.given_name`}
              value={given_name}
              disabled={disabled}
              onChange={onChange}
              ariaLabel={`Prénom du ${heading}`}
            />
          </div>
          <div className="form-col">
            <TextInput
              label="Nom"
              name={`contacts.${id}.family_name`}
              value={family_name}
              disabled={disabled}
              onChange={onChange}
              ariaLabel={`Nom du ${heading}`}
            />
          </div>
        </div>
      )}
      {emailDescription && <Quote>{emailDescription}</Quote>}
      <EmailInput
        label="Email"
        placeholder={emailPlaceholder}
        name={`contacts.${id}.email`}
        value={email}
        disabled={disabled}
        onChange={onChange}
        ariaLabel={`Email du ${heading}`}
      />
      {typeof phone_number !== 'undefined' && (
        <TelInput
          label={
            display_mobile_phone_label
              ? 'Numéro de téléphone mobile'
              : 'Numéro de téléphone'
          }
          name={`contacts.${id}.phone_number`}
          value={phone_number}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Numéro de téléphone ${
            display_mobile_phone_label ? 'mobile ' : ''
          }du ${heading}`}
        />
      )}
      {typeof job !== 'undefined' && (
        <TextInput
          label="Intitulé de poste"
          name={`contacts.${id}.job`}
          value={job}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Intitulé de poste du ${heading}`}
        />
      )}
    </div>
  </div>
);

Contact.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  link: PropTypes.string,
  nom: PropTypes.string,
  email: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  phone_number: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Contact;
