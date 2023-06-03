import React from 'react';
import Dropdown from 'rc-dropdown';

export interface FilterDropdownInterface {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    menu: JSX.Element;
    children?: React.ReactNode;
}

export function FilterDropdown({ visible, setVisible, menu, children }: FilterDropdownInterface) {
    return (
        <a
            href=""
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
            className="dropdown-filter-content-container"
        >
            <Dropdown
                trigger={['click']}
                onVisibleChange={setVisible}
                visible={visible}
                overlay={menu}
                animation="slide-up"
            >
                {children}
            </Dropdown>
        </a>
    );
}