import React, { useMemo } from 'react';

interface FormattedPhoneProps {
  phone: string | null;
}

export const FormattedPhone: React.FC<FormattedPhoneProps> = ({ phone }) => {
  const formattedPhone = useMemo(() => {
    if (!phone) return '';

    // Remove any non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Format as +7 (XXX) XXX-XX-XX
    if (digits.length === 11) {
      return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
    }

    // If not 11 digits, just return the original phone
    return phone;
  }, [phone]);

  return (
    <span className="text-gray-600">
      {formattedPhone}
    </span>
  );
};
