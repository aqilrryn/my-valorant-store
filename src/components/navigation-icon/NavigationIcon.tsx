import React from 'react';
import 'twin.macro';
import { HiLogout, HiOutlineInformationCircle } from 'react-icons/hi';

const NavigationIcon: React.FC<{
  icon?: 'info' | 'logout';
  size?: number;
  onClick?: () => void;
}> = ({ icon, size = 16, onClick }) => {
  return (
    <div tw="absolute top-8 right-8 cursor-pointer" onClick={onClick}>
      {icon === 'info' && (
        <HiOutlineInformationCircle size={size} tw="text-white" />
      )}
      {icon === 'logout' && <HiLogout size={size} tw="text-white" />}
    </div>
  );
};

export default NavigationIcon;
