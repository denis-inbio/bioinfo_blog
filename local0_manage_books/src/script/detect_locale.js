// client-side code:
    Intl.DateTimeFormat().resolvedOptions().locale

// client-side code:
    function getEnvLocale(env) {
        env = env || process.env;

        return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
    }

// server-side code
    // get geolocation from IP => I likely need a service for this though, so it's yet another API to be made use of (!); it might not be free though (!)
    // well, I might need to cache the results, and periodically refresh/update them, but prioritizing on-demand

