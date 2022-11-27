import React from 'react';
import './NotAuthorizedPage.scss';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';

export function NotAuthorizedPage(): JSX.Element {
    return (
        <SubpageContainer>
            <SubpageHeader title={'Not authorized'} />
            <SubpageContent>
                <div className="alert alert-danger custom-alert not-authorized-message">
                    You are not authorized to see this page
                </div>
            </SubpageContent>
        </SubpageContainer>
    );
}
