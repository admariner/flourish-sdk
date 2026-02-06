"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const parse5 = __importStar(require("parse5"));
// @ts-expect-error no type definitions exist for rewrite-links
const rewrite_links_1 = __importDefault(require("rewrite-links"));
const parse5_1 = require("parse5");
function findChild(node, nodeName, ok_if_not_found) {
    for (const child of parse5_1.defaultTreeAdapter.getChildNodes(node)) {
        if (child.nodeName == nodeName) {
            return child;
        }
    }
    if (ok_if_not_found) {
        return null;
    }
    throw new Error("Node not found: " + nodeName);
}
function findHtmlNode(document) {
    return findChild(document, "html");
}
function findHead(document) {
    return findChild(findHtmlNode(document), "head");
}
function findBody(document) {
    return findChild(findHtmlNode(document), "body");
}
function replaceTitle(document, title) {
    const head = findHead(document);
    let title_node = findChild(head, "title", true);
    if (title_node) {
        for (const child of parse5_1.defaultTreeAdapter.getChildNodes(title_node)) {
            parse5_1.defaultTreeAdapter.detachNode(child);
        }
    }
    else {
        title_node = parse5_1.defaultTreeAdapter.createElement("title", head.namespaceURI, []);
        parse5_1.defaultTreeAdapter.appendChild(head, title_node);
    }
    parse5_1.defaultTreeAdapter.insertText(title_node, title);
}
function appendFragmentToBody(document, fragment) {
    const body = findBody(document);
    for (const child of parse5_1.defaultTreeAdapter.getChildNodes(fragment)) {
        parse5_1.defaultTreeAdapter.appendChild(body, child);
    }
}
function insertOembedLink(document, oembed_url) {
    const head = findHead(document);
    const link_node = parse5_1.defaultTreeAdapter.createElement("link", head.namespaceURI, [
        { name: "rel", value: "alternate" },
        { name: "type", value: "application/json+oembed" },
        { name: "href", value: oembed_url },
    ]);
    parse5_1.defaultTreeAdapter.appendChild(head, link_node);
}
function insertCanonicalLink(document, canonical_url) {
    const head = findHead(document);
    const link_node = parse5_1.defaultTreeAdapter.createElement("link", head.namespaceURI, [
        { name: "rel", value: "canonical" },
        { name: "href", value: canonical_url },
    ]);
    parse5_1.defaultTreeAdapter.appendChild(head, link_node);
}
function rewriteLinks(document, static_prefix) {
    if (!static_prefix.endsWith("/")) {
        static_prefix += "/";
    }
    const rewriter = new rewrite_links_1.default(function (url) {
        // We don't want to rewrite URLs that are just fragment identifiers
        if (url.startsWith("#")) {
            return url;
        }
        // ... or relative self-links
        if (url == "" || url == ".") {
            return url;
        }
        return url_1.default.resolve(static_prefix, url); // eslint-disable-line node/no-deprecated-api
    });
    return rewriter.rewriteDocument(document);
}
async function render(template_text, params) {
    const document = parse5.parse(template_text), script_fragment = params.parsed_script || parse5.parseFragment(params.script || "");
    replaceTitle(document, params.title);
    if (params.canonical_url) {
        insertCanonicalLink(document, params.canonical_url);
    }
    if (params.oembed_url) {
        insertOembedLink(document, params.oembed_url);
    }
    appendFragmentToBody(document, script_fragment);
    const rewritten_document = await rewriteLinks(document, params.static);
    return parse5.serialize(rewritten_document);
}
exports.default = {
    render,
};
//# sourceMappingURL=index_html.js.map