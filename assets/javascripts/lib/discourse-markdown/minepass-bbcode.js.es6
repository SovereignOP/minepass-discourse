import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
    opts.features["minepass-bbcode"] = true;
});

function replaceBanner(text) {
    text = text || "";
    while (text !== (text = text.replace(/\[minepass\]([a-z0-9-]+)\[\/minepass\]/ig, function (match, world_suid) {
        return `<iframe src="https://w.minepass.net/embed/${world_suid}" width="100%" style="border: none;"></iframe>`;
    })));
    return text;
}

export function setup(helper) {
    helper.whiteList(['iframe[width]']);
    helper.whiteList(['iframe[style]']);
    helper.whiteList({
        custom(tag, name, value) {
            if (tag === 'iframe' && name === 'src') {
                return /^https:\/\/w\.minepass\.net\/.*$/.exec(value);
            }
        }
    });

    helper.addPreProcessor(text => replaceBanner(text));
}
