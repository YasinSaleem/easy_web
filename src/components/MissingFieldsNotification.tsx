import React from 'react';
import { InternalSchemaType } from '../schema/internalSchema';

interface Props {
  schema: InternalSchemaType | null;
}

interface MissingField {
  field: string;
  label: string;
  description: string;
  type?: 'missing' | 'inconsistent';
}

/**
 * Analyzes the schema and identifies missing critical fields and inconsistencies
 */
function identifyMissingFields(schema: InternalSchemaType | null): MissingField[] {
  if (!schema) return [];

  const missingFields: MissingField[] = [];

  // Check for missing contact information
  const contact = schema.contact;

  if (!contact.email || contact.email.trim() === '') {
    missingFields.push({
      field: 'contact.email',
      label: 'Email Address',
      description: 'Business email address for customer inquiries and communication',
      type: 'missing',
    });
  }

  if (!contact.phone && !contact.mobile) {
    missingFields.push({
      field: 'contact.phone',
      label: 'Phone Number',
      description: 'Contact phone number for direct customer communication',
      type: 'missing',
    });
  }

  if (!contact.address || contact.address.trim() === '') {
    missingFields.push({
      field: 'contact.address',
      label: 'Business Address',
      description: 'Physical business address for location and contact purposes',
      type: 'missing',
    });
  }

  // Check for inconsistencies between contact sections
  // This ensures contact information is consistent across different parts of the schema
  if (schema.registerInterest?.contactInfo) {
    const registerContact = schema.registerInterest.contactInfo;

    // Check email consistency between main contact and register interest form
    if (
      contact.email &&
      registerContact.email &&
      contact.email.trim() !== '' &&
      registerContact.email.trim() !== ''
    ) {
      if (contact.email.trim() !== registerContact.email.trim()) {
        missingFields.push({
          field: 'contact.email ↔ registerInterest.contactInfo.email',
          label: 'Email Mismatch',
          description: `Email differs between main contact (${contact.email}) and register interest form (${registerContact.email}). They should match for consistency.`,
          type: 'inconsistent',
        });
      }
    }

    // Check phone consistency between main contact and register interest form
    const mainPhone = contact.phone || contact.mobile || '';
    const registerPhone = registerContact.phone || '';

    if (mainPhone.trim() !== '' && registerPhone.trim() !== '') {
      if (mainPhone.trim() !== registerPhone.trim()) {
        missingFields.push({
          field: 'contact.phone ↔ registerInterest.contactInfo.phone',
          label: 'Phone Mismatch',
          description: `Phone differs between main contact (${mainPhone}) and register interest form (${registerPhone}). They should match for consistency.`,
          type: 'inconsistent',
        });
      }
    }
  }

  // Check address consistency between contact and location sections
  if (schema.location?.address && contact.address) {
    if (contact.address.trim() !== '' && schema.location.address.trim() !== '') {
      if (contact.address.trim() !== schema.location.address.trim()) {
        missingFields.push({
          field: 'contact.address ↔ location.address',
          label: 'Address Mismatch',
          description: `Address differs between main contact (${contact.address}) and location section (${schema.location.address}). They should match for consistency.`,
          type: 'inconsistent',
        });
      }
    }
  }

  // Check for missing business logo
  if (!schema.business.logo || schema.business.logo.trim() === '') {
    missingFields.push({
      field: 'business.logo',
      label: 'Business Logo',
      description: 'Company logo to enhance brand recognition and professionalism',
      type: 'missing',
    });
  }

  // Check for missing hero background image
  if (!schema.hero?.backgroundImage || schema.hero.backgroundImage.trim() === '') {
    missingFields.push({
      field: 'hero.backgroundImage',
      label: 'Hero Background Image',
      description: 'Main background image for the hero section to create visual impact',
      type: 'missing',
    });
  }

  // Check for missing gallery images
  if (!schema.gallery?.images || schema.gallery.images.length === 0) {
    missingFields.push({
      field: 'gallery.images',
      label: 'Gallery Images',
      description: 'Product or service images to showcase your offerings',
      type: 'missing',
    });
  }

  // Check for missing legal documents (privacy policy, terms of service)
  if (!schema.legal?.privacyPolicy || schema.legal.privacyPolicy.trim() === '') {
    missingFields.push({
      field: 'legal.privacyPolicy',
      label: 'Privacy Policy URL',
      description: 'Link to your privacy policy document for legal compliance',
      type: 'missing',
    });
  }

  if (!schema.legal?.termsOfService || schema.legal.termsOfService.trim() === '') {
    missingFields.push({
      field: 'legal.termsOfService',
      label: 'Terms of Service URL',
      description: 'Link to your terms of service document for legal compliance',
      type: 'missing',
    });
  }

  return missingFields;
}

const MissingFieldsNotification: React.FC<Props> = ({ schema }) => {
  const missingFields = identifyMissingFields(schema);
  const missingCount = missingFields.filter((field) => field.type !== 'inconsistent').length;
  const inconsistentCount = missingFields.filter((field) => field.type === 'inconsistent').length;

  // Don't render if no fields are missing or inconsistent
  if (missingFields.length === 0) {
    return null;
  }

  return (
    <div className='poc-info-card poc-missing-fields'>
      <div className='poc-missing-fields-header'>
        <div className='poc-missing-fields-icon'>{inconsistentCount > 0 ? '⚠️' : '📝'}</div>
        <div>
          <h3 className='poc-info-title poc-missing-fields-title'>
            {inconsistentCount > 0 ? 'Schema Issues Detected' : 'Missing Fields Detected'}
          </h3>
          <p className='poc-missing-fields-subtitle'>
            {inconsistentCount > 0 && missingCount > 0
              ? `Found ${missingCount} missing field${missingCount !== 1 ? 's' : ''} and ${inconsistentCount} inconsistenc${inconsistentCount !== 1 ? 'ies' : 'y'}. `
              : inconsistentCount > 0
                ? `Found ${inconsistentCount} inconsistenc${inconsistentCount !== 1 ? 'ies' : 'y'} in contact information. `
                : `Found ${missingCount} missing field${missingCount !== 1 ? 's' : ''}. `}
            You can fix these by editing the Internal Schema.
          </p>
        </div>
      </div>

      <div className='poc-missing-fields-list'>
        {missingFields.map((field, index) => (
          <div
            key={index}
            className={`poc-missing-field-item ${field.type === 'inconsistent' ? 'poc-inconsistent-field' : 'poc-missing-field'}`}
          >
            <div className='poc-missing-field-header'>
              <span className='poc-missing-field-label'>
                {field.type === 'inconsistent' ? '⚠️ ' : '📝 '}
                {field.label}
              </span>
              <code className='poc-missing-field-path'>{field.field}</code>
            </div>
            <p className='poc-missing-field-description'>{field.description}</p>
          </div>
        ))}
      </div>

      <div className='poc-missing-fields-footer'>
        <p className='poc-missing-fields-tip'>
          <strong>💡 Tip:</strong> Switch to the "Internal Schema" tab and{' '}
          {inconsistentCount > 0 ? 'fix these inconsistencies and add' : 'add'} these fields to
          enhance your website's completeness and professionalism.
        </p>
      </div>
    </div>
  );
};

export default MissingFieldsNotification;
