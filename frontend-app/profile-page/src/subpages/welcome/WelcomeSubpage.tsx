import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';

export function WelcomeSubpage(): JSX.Element {
    return (
        <SubpageContainer>
            <SubpageHeader title={'Welcome'} />
        </SubpageContainer>
    );
}
