"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
//Imports
const urlObject_1 = require("./urlObject");
const derya_1 = require("derya");
//Constants
const derya = require("derya");
//Declarations
let html = new derya.Coder(derya.getModeHTML());
let uo;
//Functions
function buildBody(src) {
    src.add(html.getTag("body"));
    //TODO: All
    src.add(html.getTagEnd("body"));
    return src;
}
function buildMeta(src) {
    let tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("charset", "UTF-8");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("keywords", "Alessia-Framework");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("description", "Website-Framework, developed with TypeScript on node.js.");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("author", "jdev.ch");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("publisher", "jdev.ch");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("copyright", "2021 by jdev.ch");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("company", "jdev.ch");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("content-language", "en");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("page-topic", "Framework");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("revisit-after", "7 days");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("robots", "index, follow");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("viewport", "width=device-width, initial-scale=1.0");
    src.add(tag.tag);
    tag = new derya_1.HTMLTag(html.getTag("meta"));
    tag.addParameter("google-site-verification", "");
    src.add(tag.tag);
    return src;
}
function buildPage(uo) {
    let src = html.getNewSourceCode();
    src.add(html.getTag("doctype"));
    src.add(html.getTag("html"));
    src.add(html.getTag("head"));
    src = buildTitle(src);
    src = buildMeta(src);
    //TODO: Build CSS-Link
    //TODO: Build Script
    src.add(html.getTagEnd("head"));
    src = buildBody(src);
    src.add(html.getTagEnd("html"));
    return src.src;
}
function buildTitle(src) {
    src.add(html.getTag("title"));
    //TODO: All
    src.add(html.getTagEnd("title"));
    return src;
}
function response(req) {
    uo = new urlObject_1.URLObject(req.url);
    return buildPage(uo);
}
exports.response = response;
//# sourceMappingURL=builder.js.map