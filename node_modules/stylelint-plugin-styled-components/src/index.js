import stylelint from "stylelint";

const {
    createPlugin,
    utils: { report, ruleMessages },
} = stylelint;

const ruleName = "plugin/styled-components-enforce-ampersand";

const messages = ruleMessages(ruleName, {
    rejected: (pseudo) => `Use '&' for styled-components pseudo-class "${pseudo}".`,
});

const meta = {
    fixable: true,
};

const ruleFunction = (primary, secondaryOptions, context) => {
    return (root, result) => {
        root.walkRules((ruleNode) => {
            const pseudoClasses = [
                ":active",
                ":any-link",
                "::after",
                "::backdrop",
                "::before",
                "::cue",
                "::cue-region",
                "::first-letter",
                "::first-line",
                ":blank",
                ":checked",
                "::cue",
                "::cue-region",
                ":default",
                ":defined",
                ":dir()",
                ":disabled",
                ":empty",
                ":enabled",
                ":first",
                ":first-child",
                "::first-letter",
                "::first-line",
                ":first-of-type",
                ":fullscreen",
                ":focus",
                ":focus-visible",
                ":focus-within",
                ":has()",
                ":host",
                ":host()",
                ":host-context()",
                ":hover",
                ":indeterminate",
                ":in-range",
                ":invalid",
                ":is()",
                ":lang()",
                ":last-child",
                ":last-of-type",
                ":left",
                ":link",
                ":matches()",
                ":not()",
                ":nth-child()",
                ":nth-col()",
                ":nth-last-child()",
                ":nth-last-col()",
                ":nth-last-of-type()",
                ":nth-of-type()",
                ":only-child",
                ":only-of-type",
                ":optional",
                ":out-of-range",
                ":placeholder-shown",
                "::placeholder",
                ":read-only",
                ":read-write",
                ":required",
                ":right",
                ":root",
                ":scope",
                "::selection",
                ":target",
                ":valid",
                ":visited",
            ];
            pseudoClasses.forEach((pseudo) => {
                const selector = pseudo;
                if (ruleNode.selector.includes(selector) && !ruleNode.selector.includes(`&${selector}`)) {
                    if (context.fix) {
                        ruleNode.selector = ruleNode.selector.replace(`${pseudo}`, `&${pseudo}`);
                    } else {
                        report({
                            message: messages.rejected(selector),
                            node: ruleNode,
                            result,
                            ruleName,
                        });
                    }
                }
            });
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
