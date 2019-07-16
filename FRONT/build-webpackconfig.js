webpackconfig ={
    "mode": "production",
    "context": "e:\\myProject\\FRONT",
    "devtool": false,
    "node": {
        "setImmediate": false,
        "process": "mock",
        "dgram": "empty",
        "fs": "empty",
        "net": "empty",
        "tls": "empty",
        "child_process": "empty"
    },
    "output": {
        "path": "e:\\myProject\\FRONT\\dist",
        "filename": "js/[name].[contenthash:8].js",
        "publicPath": "",
        "chunkFilename": "js/[name].[contenthash:8].js"
    },
    "resolve": {
        "alias": {
            "@": "e:\\myProject\\FRONT\\src",
            "vue$": "vue/dist/vue.runtime.esm.js"
        },
        "extensions": [".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
        "modules": ["node_modules", "e:\\myProject\\FRONT\\node_modules", "e:\\myProject\\FRONT\\node_modules\\@vue\\cli-service\\node_modules"]
    },
    "resolveLoader": {
        "modules": ["e:\\myProject\\FRONT\\node_modules\\@vue\\cli-plugin-eslint\\node_modules", "e:\\myProject\\FRONT\\node_modules\\@vue\\cli-plugin-babel\\node_modules", "node_modules", "e:\\myProject\\FRONT\\node_modules", "e:\\myProject\\FRONT\\node_modules\\@vue\\cli-service\\node_modules"]
    },
    "module": {
        "noParse": {},
        "rules": [{
            "test": {},
            "use": [{
                "loader": "cache-loader",
                "options": {
                    "cacheDirectory": "e:\\myProject\\FRONT\\node_modules\\.cache\\vue-loader",
                    "cacheIdentifier": "0b8dbd92"
                }
            }, {
                "loader": "vue-loader",
                "options": {
                    "compilerOptions": {
                        "preserveWhitespace": false
                    },
                    "cacheDirectory": "e:\\myProject\\FRONT\\node_modules\\.cache\\vue-loader",
                    "cacheIdentifier": "0b8dbd92"
                }
            }]
        }, {
            "test": {},
            "use": [{
                "loader": "url-loader",
                "options": {
                    "limit": 4096,
                    "fallback": {
                        "loader": "file-loader",
                        "options": {
                            "name": "img/[name].[hash:8].[ext]"
                        }
                    }
                }
            }]
        }, {
            "test": {},
            "use": [{
                "loader": "file-loader",
                "options": {
                    "name": "img/[name].[hash:8].[ext]"
                }
            }]
        }, {
            "test": {},
            "use": [{
                "loader": "url-loader",
                "options": {
                    "limit": 4096,
                    "fallback": {
                        "loader": "file-loader",
                        "options": {
                            "name": "media/[name].[hash:8].[ext]"
                        }
                    }
                }
            }]
        }, {
            "test": {},
            "use": [{
                "loader": "url-loader",
                "options": {
                    "limit": 4096,
                    "fallback": {
                        "loader": "file-loader",
                        "options": {
                            "name": "fonts/[name].[hash:8].[ext]"
                        }
                    }
                }
            }]
        }, {
            "test": {},
            "use": [{
                "loader": "pug-plain-loader"
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false,
                        "indentedSyntax": true
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false,
                        "indentedSyntax": true
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false,
                        "indentedSyntax": true
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "sass-loader",
                    "options": {
                        "sourceMap": false,
                        "indentedSyntax": true
                    }
                }]
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "less-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "less-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "less-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "less-loader",
                    "options": {
                        "sourceMap": false
                    }
                }]
            }]
        }, {
            "test": {},
            "oneOf": [{
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "stylus-loader",
                    "options": {
                        "sourceMap": false,
                        "preferPathResolver": "webpack"
                    }
                }]
            }, {
                "resourceQuery": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "stylus-loader",
                    "options": {
                        "sourceMap": false,
                        "preferPathResolver": "webpack"
                    }
                }]
            }, {
                "test": {},
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2,
                        "modules": true,
                        "localIdentName": "[name]_[local]_[hash:base64:5]"
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "stylus-loader",
                    "options": {
                        "sourceMap": false,
                        "preferPathResolver": "webpack"
                    }
                }]
            }, {
                "use": [{
                    "loader": "e:\\myProject\\FRONT\\node_modules\\mini-css-extract-plugin\\dist\\loader.js",
                    "options": {
                        "publicPath": "../"
                    }
                }, {
                    "loader": "css-loader",
                    "options": {
                        "sourceMap": false,
                        "importLoaders": 2
                    }
                }, {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": false
                    }
                }, {
                    "loader": "stylus-loader",
                    "options": {
                        "sourceMap": false,
                        "preferPathResolver": "webpack"
                    }
                }]
            }]
        }, {
            "test": {},
            "exclude": [null],
            "use": [{
                "loader": "cache-loader",
                "options": {
                    "cacheDirectory": "e:\\myProject\\FRONT\\node_modules\\.cache\\babel-loader",
                    "cacheIdentifier": "48cb1a8c"
                }
            }, {
                "loader": "thread-loader"
            }, {
                "loader": "babel-loader"
            }]
        }, {
            "enforce": "pre",
            "test": {},
            "exclude": [{}, "e:\\myProject\\FRONT\\node_modules\\@vue\\cli-service\\lib"],
            "use": [{
                "loader": "eslint-loader",
                "options": {
                    "extensions": [".js", ".jsx", ".vue"],
                    "cache": true,
                    "cacheIdentifier": "26c283b3",
                    "emitWarning": true,
                    "emitError": false,
                    "eslintPath": "e:\\myProject\\FRONT\\node_modules\\eslint\\lib\\api.js"
                }
            }]
        }]
    },
    "optimization": {
        "minimizer": [{
            "options": {
                "test": {},
                "extractComments": false,
                "sourceMap": false,
                "cache": true,
                "parallel": true,
                "terserOptions": {
                    "output": {
                        "comments": {}
                    },
                    "compress": {
                        "arrows": false,
                        "collapse_vars": false,
                        "comparisons": false,
                        "computed_props": false,
                        "hoist_funs": false,
                        "hoist_props": false,
                        "hoist_vars": false,
                        "inline": false,
                        "loops": false,
                        "negate_iife": false,
                        "properties": false,
                        "reduce_funcs": false,
                        "reduce_vars": false,
                        "switches": false,
                        "toplevel": false,
                        "typeofs": false,
                        "booleans": true,
                        "if_return": true,
                        "sequences": true,
                        "unused": true,
                        "conditionals": true,
                        "dead_code": true,
                        "evaluate": true
                    },
                    "mangle": {
                        "safari10": true
                    }
                }
            }
        }],
        "splitChunks": {
            "cacheGroups": {
                "vendors": {
                    "name": "chunk-vendors",
                    "test": {},
                    "priority": -10,
                    "chunks": "initial"
                },
                "common": {
                    "name": "chunk-common",
                    "minChunks": 2,
                    "priority": -20,
                    "chunks": "initial",
                    "reuseExistingChunk": true
                }
            }
        }
    },
    "plugins": [{}, {
        "definitions": {
            "process.env": {
                "NODE_ENV": "\"production\"",
                "BASE_URL": "\"\""
            }
        }
    }, {
        "options": {},
        "pathCache": {},
        "fsOperations": 0,
        "primed": false
    }, {
        "compilationSuccessInfo": {},
        "shouldClearConsole": true,
        "formatters": [null, null, null, null],
        "transformers": [null, null, null, null],
        "previousEndTimes": {}
    }, {
        "options": {
            "filename": "css/[name].[contenthash:8].css",
            "chunkFilename": "css/[name].[contenthash:8].css"
        }
    }, {
        "options": {
            "sourceMap": false,
            "cssnanoOptions": {
                "preset": ["default", {
                    "mergeLonghand": false,
                    "cssDeclarationSorter": false
                }]
            }
        }
    }, {
        "options": {
            "context": null,
            "hashFunction": "md4",
            "hashDigest": "hex",
            "hashDigestLength": 4
        }
    }, {}, {
        "options": {
            "template": "public/index.html",
            "filename": "index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true,
                "collapseBooleanAttributes": true,
                "removeScriptTypeAttributes": true
            },
            "cache": true,
            "showErrors": true,
            "chunks": ["chunk-vendors", "chunk-common", "index"],
            "excludeChunks": [],
            "chunksSortMode": "auto",
            "meta": {},
            "title": "首页",
            "xhtml": false
        }
    }, {
        "options": {
            "template": "public/index.html",
            "filename": "demo.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true,
                "collapseBooleanAttributes": true,
                "removeScriptTypeAttributes": true
            },
            "cache": true,
            "showErrors": true,
            "chunks": ["chunk-vendors", "chunk-common", "demo"],
            "excludeChunks": [],
            "chunksSortMode": "auto",
            "meta": {},
            "title": "demo",
            "xhtml": false
        }
    }, {
        "options": {
            "template": "public/index.html",
            "filename": "login.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true,
                "collapseBooleanAttributes": true,
                "removeScriptTypeAttributes": true
            },
            "cache": true,
            "showErrors": true,
            "chunks": ["chunk-vendors", "chunk-common", "login"],
            "excludeChunks": [],
            "chunksSortMode": "auto",
            "meta": {},
            "title": "登录",
            "xhtml": false
        }
    }, {
        "options": {
            "template": "public/index.html",
            "filename": "register.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true,
                "collapseBooleanAttributes": true,
                "removeScriptTypeAttributes": true
            },
            "cache": true,
            "showErrors": true,
            "chunks": ["chunk-vendors", "chunk-common", "register"],
            "excludeChunks": [],
            "chunksSortMode": "auto",
            "meta": {},
            "title": "注册",
            "xhtml": false
        }
    }, {
        "options": {
            "template": "public/index.html",
            "filename": "portal.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeAttributeQuotes": true,
                "collapseBooleanAttributes": true,
                "removeScriptTypeAttributes": true
            },
            "cache": true,
            "showErrors": true,
            "chunks": ["chunk-vendors", "chunk-common", "portal"],
            "excludeChunks": [],
            "chunksSortMode": "auto",
            "meta": {},
            "title": "门户",
            "xhtml": false
        }
    }, {
        "options": {
            "rel": "preload",
            "include": {
                "type": "initial",
                "entries": ["index"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}, {}],
            "includeHtmlNames": ["index.html"]
        }
    }, {
        "options": {
            "rel": "prefetch",
            "include": {
                "type": "asyncChunks",
                "entries": ["index"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}],
            "includeHtmlNames": ["index.html"]
        }
    }, {
        "options": {
            "rel": "preload",
            "include": {
                "type": "initial",
                "entries": ["demo"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}, {}],
            "includeHtmlNames": ["demo.html"]
        }
    }, {
        "options": {
            "rel": "prefetch",
            "include": {
                "type": "asyncChunks",
                "entries": ["demo"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}],
            "includeHtmlNames": ["demo.html"]
        }
    }, {
        "options": {
            "rel": "preload",
            "include": {
                "type": "initial",
                "entries": ["login"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}, {}],
            "includeHtmlNames": ["login.html"]
        }
    }, {
        "options": {
            "rel": "prefetch",
            "include": {
                "type": "asyncChunks",
                "entries": ["login"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}],
            "includeHtmlNames": ["login.html"]
        }
    }, {
        "options": {
            "rel": "preload",
            "include": {
                "type": "initial",
                "entries": ["register"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}, {}],
            "includeHtmlNames": ["register.html"]
        }
    }, {
        "options": {
            "rel": "prefetch",
            "include": {
                "type": "asyncChunks",
                "entries": ["register"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}],
            "includeHtmlNames": ["register.html"]
        }
    }, {
        "options": {
            "rel": "preload",
            "include": {
                "type": "initial",
                "entries": ["portal"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}, {}],
            "includeHtmlNames": ["portal.html"]
        }
    }, {
        "options": {
            "rel": "prefetch",
            "include": {
                "type": "asyncChunks",
                "entries": ["portal"]
            },
            "excludeHtmlNames": [],
            "fileBlacklist": [{}],
            "includeHtmlNames": ["portal.html"]
        }
    }, {}],
    "entry": {
        "index": ["e:\\myProject\\FRONT\\src\\pages\\index\\main.js"],
        "demo": ["e:\\myProject\\FRONT\\src\\pages\\demo\\main.js"],
        "login": ["e:\\myProject\\FRONT\\src\\pages\\login\\main.js"],
        "register": ["e:\\myProject\\FRONT\\src\\pages\\register\\main.js"],
        "portal": ["e:\\myProject\\FRONT\\src\\pages\\portal\\main.js"]
    }
}