load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@npm//:vitest/package_json.bzl", vitest_bin = "bin")
load("@npm//:vite/package_json.bzl", vite_bin = "bin")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(name = "node_modules")

vite_bin.vite_binary(
    name = "vite",
    chdir = package_name(),
    data = [
        "//src:src",
        "index.html",
        "package.json",
        "vite.config.ts",
        "tsconfig.json",
        ":node_modules",
    ],
)

vitest_bin.vitest_test(
    name = "test",
    args = ["run"],
    data = [
        "//src:src",
        "package.json",
        "vite.config.ts",
        "tsconfig.json",
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
