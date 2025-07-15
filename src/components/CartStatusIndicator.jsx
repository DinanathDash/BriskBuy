import React from 'react';
import { Cloud, CloudOff, HardDrive } from 'lucide-react';
import { firebaseAvailable } from '../Firebase/config';

const CartStatusIndicator = ({ className = "" }) => {
  if (firebaseAvailable) {
    return (
      <div className={`flex items-center gap-1 text-green-600 text-xs ${className}`}>
        <Cloud className="h-3 w-3" />
        <span>Synced</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 text-orange-600 text-xs ${className}`}>
      <HardDrive className="h-3 w-3" />
      <span>Local</span>
    </div>
  );
};

export default CartStatusIndicator;
