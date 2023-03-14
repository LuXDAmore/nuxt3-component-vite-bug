
/**
 * Format Date
 *
 * @param {string} value the value to convert
 * @returns {string} the date converted
 */
export function formatDate( value: string ) {

    const date = new Date( value ).toLocaleDateString( 'it' );

    return date;

}

/**
 * Format minutes into hours and mins
 *
 * @param {number} minutes The number to convert
 * @returns {string} the number converted
 */
export function formatTime( minutes: number ) {

    // seconds
    const seconds = minutes * 60;
    let secondsLeft = seconds;

    // hours
    const hours = Math.floor( secondsLeft / 3600 );

    secondsLeft %= 3600;

    // mins
    const mins = Math.floor( secondsLeft / 60 );

    secondsLeft %= 60;

    return `${ hours ? `${ hours }h` : '' } ${ mins }min`;

}

/**
 * Format numbers with comma
 *
 * @param {number | string} value The number to convert
 * @returns {string} the number converted
 */
export function numberWithCommas( value: number | string ) {

    return value.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );

}
