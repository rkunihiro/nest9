# NestJS project tutorial

## Setup environment

```sh
npm init -y
npm install --save-dev @types/node typescript tsconfig-paths ts-node ts-node-dev
npm install @nestjs/core @nestjs/common rxjs reflect-metadata
npm install @nestjs/platform-express express
```

tsconfig.json

```json
{
    "compilerOptions": {
        "incremental": true,
        "tsBuildInfoFile": "./.tsbuildinfo",

        "target": "ES2021",
        "lib": ["ES2021"],
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "module": "commonjs",
        "moduleResolution": "node",
        "rootDir": "./src",
        "baseUrl": "./src",
        "paths": {
            "~/*": ["./*"]
        },
        "resolveJsonModule": true,
        "allowJs": true,
        "checkJs": true,
        "outDir": "./dist",

        "isolatedModules": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,

        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "exactOptionalPropertyTypes": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedIndexedAccess": true,
        "noImplicitOverride": true,
        "noPropertyAccessFromIndexSignature": true,
        "allowUnusedLabels": false,
        "allowUnreachableCode": false,
        "skipLibCheck": true
    },
    "include": ["./src"]
}
```

## Write code

src/app.service.ts

```ts
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
    public async getMessage(): Promise<string> {
        return "Hello,World!";
    }
}
```

src/app.controller.ts

```ts
import { Controller, Get, Inject } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("/")
export class AppController {
    constructor(
        @Inject(AppService)
        private readonly appService: AppService,
    ) {}

    @Get("/")
    public async index() {
        return await this.appService.getMessage();
    }
}
```

src/app.module.ts

```ts
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
```

src/main.ts

```ts
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

export async function main(port: number): Promise<void> {
    const app = await NestFactory.create(AppModule, {});
    app.listen(port);
}
main(3000);
```

## Add linting & unit test tool

```sh
npm install --save-dev \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint eslint-config-prettier prettier \
  eslint-plugin-import eslint-import-resolver-typescript \
  jest @types/jest ts-jest eslint-plugin-jest
```

.prettierrc.js

```js
/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "consistent",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
};
```

.eslintrc.js

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    plugins: [
        //
        "@typescript-eslint",
        "import",
        "jest",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: true,
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:jest/recommended",
        "prettier",
    ],
    rules: {
        // import
        "import/first": "error",
        "import/order": [
            "warn",
            {
                "alphabetize": { order: "asc", caseInsensitive: false },
                "groups": ["builtin", "external", "internal", "parent", "sibling"],
                "newlines-between": "always",
            },
        ],
    },
};
```

jest.config.js

```js
const { pathsToModuleNameMapper } = require("ts-jest");
const { loadConfig } = require("tsconfig-paths");

const tsconfig = loadConfig();

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    // paths
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.paths, { prefix: tsconfig.absoluteBaseUrl }),
};
```

package.json

```diff
  {
    ...
    "scripts": {
        ...
+       "lint": "eslint ./src && prettier -l ./src",
+       "fix": "eslint --fix ./src && prettier -w ./src"
+       "test": "jest --coverage --verbose"
    }
  }
```

## Write unit test

```sh
npm install --save-dev @nestjs/testing
```

src/app.service.spec.ts

```ts
import { Test } from "@nestjs/testing";

import { AppService } from "./app.service";

describe("AppService", () => {
    let appService: AppService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [AppService],
        }).compile();
        appService = moduleRef.get<AppService>(AppService);
    });

    it("getMessage", async () => {
        const message = await appService.getMessage();
        expect(message).toStrictEqual("Hello,World!");
    });
});
```

## setup build & bundle

```sh
npm install --save-dev esbuild
```

build.ts

```ts
import { resolve } from "node:path";

import { analyzeMetafileSync, BuildOptions, buildSync } from "esbuild";

const options: BuildOptions = {
    entryPoints: {
        main: resolve(__dirname, "./src/main.ts"),
    },
    outdir: resolve(__dirname, "./dist"),

    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: true,
    metafile: true,

    format: "cjs",
    platform: "node",
    target: "node16",
    define: {
        "process.env.NODE_ENV": '"production"',
    },
    external: [
        // TODO: 以後dependenciesに追加したものを以下から削除します
        "@nestjs/microservices",
        "@nestjs/websockets",
        "cache-manager",
        "class-transformer",
        "class-validator",
        "fsevents",
    ],
};

try {
    const { metafile } = buildSync(options);
    if (metafile) {
        const detail = analyzeMetafileSync(metafile);
        console.log(detail);
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
```

package.json

```diff
  {
    ...
    "scripts": {
        ...
+       "build": "ts-node build.ts"
    }
  }
```

## Config

```sh
npm install @nestjs/config
```
