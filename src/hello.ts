import * as evn from "./envri"

function hello() {
console.log(evn.exp);
    
    let m = 100;
    function foo() {
        let k = 10;
        return m + 1;
    }
    return foo;
}