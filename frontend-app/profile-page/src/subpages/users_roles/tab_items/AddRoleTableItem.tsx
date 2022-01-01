import { Button } from 'react-bootstrap';
import React from 'react';
import './AddRoleTableItem.scss';
import { useHistory } from 'react-router-dom';

export function AddRoleTableItem(userId: string): JSX.Element {
    const history = useHistory();

    return (
        <div className="add-role-table-item">
            <Button
                variant="success"
                onClick={() => {
                    history.push(`/user-roles/add/${userId}`);
                }}
            >
                + Add role
            </Button>
        </div>
    );
}
