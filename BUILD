load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@npm//:vitest/package_json.bzl", vitest_bin = "bin")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(name = "node_modules")

vitest_bin.vitest_test(
    name = "test",
    args = ["run"],
    data = [
        "//src:src",
        "package.json",
        "vite.config.ts",
        "tsconfig.json",
        "tsconfig.node.json",
        ":node_modules",
    ],
)

js_library(
    name = "package_json",
    srcs = ["package.json"],
    visibility = ["//visibility:public"],
)

exports_files([
    "tsconfig.json",
    "vite.config.ts",
    "index.html",
])
