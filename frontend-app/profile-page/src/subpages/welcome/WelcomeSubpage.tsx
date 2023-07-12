import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { TranslationService } from '@car-rental/shared/service';

export function WelcomeSubpage(): JSX.Element {
    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('welcomeSubpageTitle')} />
        </SubpageContainer>
    );
}
