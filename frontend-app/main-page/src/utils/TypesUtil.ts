export type OptionType = { value: string | null; label: string | null };

export const mapToOptionType = (val: number): OptionType => {
    return {
        value: `${val}`,
        label: `${val}`,
    };
};
