export const formatInputPlaceholder = ( columnKey: string ): string => {

    return `Cerca ${
        columnKey
            .replace( /([A-Z])/g, ' $1' )
            .toLowerCase()
    }`;

};
