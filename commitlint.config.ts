import {UserConfig} from "@commitlint/types";

const config: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test"
            ]
        ],
        "subject-case": [
            2,
            "never",
            ["sentence-case", "start-case", "pascal-case", "upper-case"]
        ]
    }
};

export default config;
