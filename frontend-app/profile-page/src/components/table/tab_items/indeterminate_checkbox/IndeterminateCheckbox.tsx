import React, { ForwardedRef, MutableRefObject, PropsWithChildren } from 'react';

interface IndeterminateCheckboxInterface {
    indeterminate?: boolean | undefined;
}

export const IndeterminateCheckbox = React.forwardRef(
    (
        { indeterminate, ...rest }: PropsWithChildren<IndeterminateCheckboxInterface>,
        ref: ForwardedRef<IndeterminateCheckboxInterface>
    ) => {
        const defaultRef = React.useRef<IndeterminateCheckboxInterface>();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            (resolvedRef as MutableRefObject<IndeterminateCheckboxInterface>).current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        /* eslint-disable @typescript-eslint/ban-ts-comment */
        return (
            <>
                {/*// @ts-ignore*/}
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';
