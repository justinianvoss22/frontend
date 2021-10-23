export function formatKilos(n): string {
    if(n <= 1000) {
        return (n/1000).toLocaleString("en",  {minimumFractionDigits: 3, maximumFractionDigits: 3})
    } else{
        return (n/1000).toLocaleString("en",  {minimumFractionDigits: 0, maximumFractionDigits: 0})
    }
}

/**
 *
 * @param n
 */
export function formatSize(n): string {
    if(n <= 1024*1024) {
        return (n/(1024*1024)).toLocaleString("en",  {minimumFractionDigits: 3, maximumFractionDigits: 3})
    } else{
        return (n/(1024*1024)).toLocaleString("en",  {minimumFractionDigits: 0, maximumFractionDigits: 0})
    }
}


/**
 * Format dataset download key and adds API link as a parameter
 *
 * @param validApiKey
 * @param key
 * @param link
 */
export function formatDownloadLink(validApiKey, key, link) {
    if(!validApiKey) {
        return "javascript:";
    }

    const url = new URL(link);
    url.searchParams.set("api-key", key);
    return url.toString();
}


/**
 * Format large money amounts in human friendly manner.
 *
 * @param n
 * @param minFrag
 * @param maxFrag
 */
export function formatDollar(n: number, minFrag = 3, maxFrag = 3): string {

    if(n === undefined || n === null) {
        // Plz avoid ending here
        return "---";
    }

    if(n < 0.01) {
        // Format funny tokens
        return "$" + n.toLocaleString( "en",  {
            minimumFractionDigits: 10,
            maximumFractionDigits: 10
        });
    }

    if(n >= 1000*1000*1000) {
        return "$" + (n / (1000 * 1000 * 1000)).toLocaleString("en", {
            minimumFractionDigits: minFrag,
            maximumFractionDigits: maxFrag
        }) + "B"
    } else if(n >= 1000*1000) {
        return "$" + (n / (1000 * 1000)).toLocaleString("en", {
            minimumFractionDigits: minFrag,
            maximumFractionDigits: maxFrag
        }) + "M"
    } else if(n >= 1000) {
        return "$" + (n / (1000)).toLocaleString("en", {
            minimumFractionDigits: minFrag,
            maximumFractionDigits: maxFrag
        }) + "k"
    } else {
        return "$" + n.toLocaleString("en", {
            minimumFractionDigits: minFrag,
            maximumFractionDigits: maxFrag
        });
    }
}


export function formatPriceChange(n: number): string {
    return (n > 0 ? "▲" : "▼") + (n * 100).toLocaleString("en",  {minimumFractionDigits: 3, maximumFractionDigits: 3}) + "%";
}

/**
 * Format number using an English thousand separation
 * @param n
 */
export function formatAmount(n: number): string {

    if(!n) {
        return "---";
    }

    return n.toLocaleString("en");
}

/**
 * Format UNIX timestamp
 * @param ts Timestamp in seconds
 */
export function formatUnixTimestamp(ts: number): string {

    if(!ts) {
        return "---";
    }

    const d = new Date(ts * 1000);
    return d.toUTCString();
}

/**
 * Grabs only the domain part from the URL
 */
export function formatUrlAsDomain(u: string): string {
   const url = new URL(u);
   return url.hostname;
}

/**
 * Format a datetime string to human readable format.
 *
 * Mostly useful for formattiong ISO-8601 datetime strings coming from the backend.
 *
 */
export function formatDatetime(d: Date): string {
    const s = d.toLocaleString('en-GB', { timeZone: 'UTC' })
    return s + " UTC";
}


/**
 * Format a USDC balance as it comes out from the contract.
 *
 *
 */
export function formatUSDCBalance(web3, b: string, decimals: number): string {

    const n = parseFloat(b);
    const val =  n / Math.pow(10, decimals);
    return val.toLocaleString("en",  {minimumFractionDigits: 2, maximumFractionDigits: 2});
}