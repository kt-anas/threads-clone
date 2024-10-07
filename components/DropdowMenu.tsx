// components/DropdownMenu.tsx

import React from 'react';
import styles from './DropDowMenu.module.scss'; 

interface DropdownMenuProps {
    children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
    return (
        <div className={styles['dropdown-menu']}>
            {children}
        </div>
    );
};

export default DropdownMenu;
