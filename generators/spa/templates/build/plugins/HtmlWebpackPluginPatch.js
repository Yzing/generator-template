
var _ = require('lodash');

function getExtenals(list, crossOrigin) {
    return list.map(function (scriptPath) {
        var attributes = {
            type: 'text/javascript',
            src: scriptPath
        };
        if (crossOrigin) {
            attributes.crossorigin = crossOrigin;
        }
        return {
            tagName: 'script',
            closeTag: true,
            attributes: attributes
        };
    });
}

function HtmlWebpackPluginPatch(HtmlWebpackPlugin, opt) {
    /**
     * Injects the assets into the given html string
     */
    HtmlWebpackPlugin.prototype.generateAssetTags = function (assets) {
        var crossOrigin = this.options.crossOrigin;
        var crossOriginLoading = this.options.crossOriginLoading;
        var externalsJsHead = this.options.externalsJS.head || [];
        var externalsJsBody = this.options.crossOrigin.body || [];
        // Turn script files into script tags
        var scripts = assets.js.map(function (scriptPath) {
            var attributes = {
                type: 'text/javascript',
                src: scriptPath
            };
            if (crossOriginLoading) {
                attributes.crossorigin = crossOriginLoading;
            }
            return {
                tagName: 'script',
                closeTag: true,
                attributes: attributes
            };
        });
        // Make tags self-closing in case of xhtml
        var selfClosingTag = !!this.options.xhtml;
        // Turn css files into link tags
        var styles = assets.css.map(function (stylePath) {
            return {
                tagName: 'link',
                selfClosingTag: selfClosingTag,
                attributes: {
                    href: stylePath,
                    rel: 'stylesheet'
                }
            };
        });
        // Injection targets
        var head = [];
        var body = [];

        // If there is a favicon present, add it to the head
        if (assets.favicon) {
            head.push({
                tagName: 'link',
                selfClosingTag: selfClosingTag,
                attributes: {
                    rel: 'shortcut icon',
                    href: assets.favicon
                }
            });
        }
        // Add styles to the head
        head = head.concat(styles);
        // Add scripts to body or head
        if (this.options.inject === 'head') {
            head = head.concat(scripts);
        } else {
            body = body.concat(scripts);
        }
        head = head.concat(getExtenals(externalsJsHead, crossOrigin));
        body = body.concat(getExtenals(externalsJsBody, crossOrigin));
        return {
            head: head,
            body: body
        };
    };

    return new HtmlWebpackPlugin(_.extend({
        crossOrigin: false,
        crossOriginLoading: false,
        externalsJS: {
            head: [],
            body: [],
        },
    }, opt));
}

module.exports = HtmlWebpackPluginPatch;
