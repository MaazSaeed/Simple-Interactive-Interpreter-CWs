# Simple Interactive Interpreter

This was a fun little interpreter I made using the Shunt Yard Algorithm for the parsing.


 ### Grammar for the interpreter using EBNF syntax.
 
`expression      ::= factor | expression operator expression`

`factor          ::= number | identifier | assignment | '(' expression ')'`

`assignment      ::= identifier '=' expression`

`operator        ::= '+' | '-' | '*' | '/' | '%'`

`identifier      ::= letter | '_' { identifier-char }`

`identifier-char ::= '_' | letter | digit`

`number          ::= { digit } [ '.' digit { digit } ]`

`letter          ::= 'a' | 'b' | ... | 'y' | 'z' | 'A' | 'B' | ... | 'Y' | 'Z'`

`digit           ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'`


