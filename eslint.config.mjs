// eslint.config.js
export default [
    {
        ignores: [
            "!node_modules/",
            "node_modules/*",
            "!public/",
            "public/*",
        ],
        files: [
            {
              "patterns": "**/*.js",
              "patterns": "**/*.jsx",
              "patterns": "**/*.ts",
              "patterns": "**/*.tsx",
            }
        ]
    }
];
