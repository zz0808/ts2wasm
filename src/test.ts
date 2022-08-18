import * as ts from 'typescript'
let program = ts.createProgram({
    rootNames: ["hello.ts"],
    options: {

    }
})
let source = program.getSourceFile("hello.ts");
const checker = program.getTypeChecker();

helper(source as ts.Node);

function helper (node: ts.Node) {
    switch(node.kind) {
        case ts.SyntaxKind.FunctionDeclaration: 
            findScopeSymbol(node);
            console.log("i am done")
            break;
        default:
            break;
    }

    // 递归遍历
    ts.forEachChild(node, node => helper(node))
  }
  
function findScopeSymbol(node: ts.Node) {
    // const symbols = checker.getSymbolsInScope(node, -1)
    // .filter((s) =>
    // s.getDeclarations()?.some((d) => d.getSourceFile() === source)
    // );
    const symbols = checker.getSymbolsInScope(node, ts.SymbolFlags.ModuleMember);

    console.log(symbols);
    
}

// https://github.com/shiwano/typhen/blob/5b5e59a8377cc00aef976359a8a7dad42392786d/src/typescript_parser.ts
// private getSymbolsInScope(node: ts.Node, symbolFlags: ts.SymbolFlags): ts.Symbol[] {
//     return this.typeChecker.getSymbolsInScope(node, symbolFlags)
//       .filter(symbol => {
//         return (symbol.declarations || []).every(d => {
//           const resolvedPath = this.config.env.resolvePath(d.getSourceFile().fileName);
//           return resolvedPath !== this.config.env.defaultLibFileName &&
//             _.includes(resolvedPath, this.config.typingDirectory);
//         });
//       });
//   }

// // @ts-ignore
// const symbols = context.checker
// .getSymbolsInScope(node, TypeScript.SymbolFlags.ModuleMember)
// .filter(
//   (symbol) =>
//     symbol.getDeclarations()?.some((d) => d.parent === node) &&
//     !exportedSymbols.includes(symbol)
// )


// function getSymbolInScope(node: ts.Node, flags: ts.SymbolFlags, name: string): ts.Symbol | undefined {
//     // TODO:PERF `getSymbolsInScope` gets a long list. Is there a better way?
//     const scope = checker.getSymbolsInScope(node, flags);
//     return scope.find((scopeSymbol) => scopeSymbol.name === name);
// }