npm run lint
rm -rf ./dist
./node_modules/typescript/bin/tsc
ENVIRONMENT=production ts-node ./esbuild/build.ts
# rm -rf ./dist/esbuild
# rm -rf ./dist/src/__tests__
# find ./dist/src -name "*.js" -type f -delete
# mv ./dist/src/* ./dist
# rm -rf ./dist/src