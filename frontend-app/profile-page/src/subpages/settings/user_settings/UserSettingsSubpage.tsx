import React from 'react';
import { SubpageContainer } from '../../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../../components/subpage/content/SubpageContent';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import './UserSettingsSubpage.scss';
import { UserSettingsForm } from './UserSettingsForm';
import { TranslationService } from '@car-rental/shared/service';

interface UserSettingsSubpageProps {
    authenticatedUser?: AuthenticatedUserDTO;
    setAuthenticatedUser: (authenticatedUserDTO: AuthenticatedUserDTO) => void;
}

export function UserSettingsSubpage({
    authenticatedUser,
    setAuthenticatedUser,
}: UserSettingsSubpageProps): JSX.Element {
    return (
        <SubpageContainer className="settings-container">
            <SubpageHeader title={TranslationService.translate('userSettingsSubpageTitle')} />
            <SubpageContent>
                {authenticatedUser && (
                    <UserSettingsForm
                        authenticatedUser={authenticatedUser}
                        setAuthenticatedUser={setAuthenticatedUser}
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
