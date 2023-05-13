import { FilterProps } from 'react-table';
import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'rc-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export function DefaultColumnFilter<D extends object>({ column: { setFilter } }: FilterProps<D>) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | undefined>(undefined);

    const menu = (
        <form
            className="row filter-card"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
            }}
        >
            <input
                className="form-control"
                value={value || ''}
                type="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value || undefined);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        setFilter(value);
                        setVisible(false);
                    }
                }}
            />
            <Button
                onClick={() => {
                    setVisible(false);
                    setFilter(value);
                }}
            >
                Filter
            </Button>
        </form>
    );

    return (
        <Dropdown
            trigger={['click']}
            onVisibleChange={setVisible}
            visible={visible}
            overlay={menu}
            animation="slide-up"
        >
            <a
                href=""
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
            >
                <FontAwesomeIcon
                    className="link-style-black font-awesome-style"
                    icon={faFilter}
                    onClick={() => {
                        setVisible(!visible);
                    }}
                />
            </a>
        </Dropdown>
    );
}
