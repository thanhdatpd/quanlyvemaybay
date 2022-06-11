import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";
const config: DenonConfig = {
    scripts: {
        start: {
            cmd: "deno run --allow-env --allow-net --allow-read --allow-write  index.ts",
            desc: "run main script",
            env: env(),
        },
    },
    watcher: {
        skip: ["database.db"],
        legacy: false,
    },
};

export default config;
