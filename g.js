import {
    Generator
} from './Generator.js'

const rules = {
    WS: /[ \t]+/,
    number: /\d+/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbrace: '{',
    rbrace: '}',

    keyword: ['fn', 'give', 'yes', 'no'],
    var: /[a-zA-Z]+/,

}
let lexer = moo.compile(rules)

const gCode = `ackermann`

lexer.reset(gCode)

console.log(gCode)

let tokensObjs = Array.from(lexer)

let tokens = tokensObjs.map(el => el.value)
// console.log(tokens)
console.log(tokensObjs)

const mappedKw = {
    'fn': 'function',
    'give': 'return',
    'yes': 'true',
    'no': 'false'

}

const gen = new Generator()

const mappedSpecialIdentifiers = {
    'ackermann': gen.transpileAckermann(),
    'Car': gen.transpileCar(),
    'Suspension': gen.transpileSuspension(),
    'Gearbox': gen.transpileGearbox(),
    'Differential': gen.transpileDifferential()

}

const keys = Object.keys(mappedKw)

function transpileFn(arr) {
    let item
    arr.find(el => {
        if (el === keys[0]) {
            item = mappedKw[el]
        }
    })
    return item
}

function transpileRet(arr) {
    let item

    arr.find(el => {
        if (el === keys[1]) {
            item = mappedKw[el]
        }
    })
    return item

}

function transpileBool(arr) {
    let item
    arr.find(el => {
        if (el === keys[2]) {
            item = mappedKw[el]
        } else if (el === keys[3]) {
            item = mappedKw[el]
        }
    })
    return item

}

function transpileVal(arr) {
    let num
    arr.find(el => {
        if (el.type === 'number') {
            num = parseInt(el.value)
        }
    })
    return num
}

function specialIdentifier(arr) {
    let genCode = ''
    const keys = Object.keys(mappedSpecialIdentifiers)
    arr.find(({
        type,
        value
    }) => {
        const index = keys.indexOf(value)
        if (type === 'var' && value === keys[index]) {

            genCode += mappedSpecialIdentifiers[value] + '\n\n'
        }

    })
    return genCode
}

function fnName() {

}



// console.log(fnName(tokensObjs))

// console.log(transpileFn(tokens))
// console.log(transpileRet(tokens))

const parens = arr => arr.join('').match(/\(\)/)

const lbrace = arr => arr.join('').match('{')
const rbrace = arr => arr.join('').match('}')

const transpilefnDefinition = () => `${transpileFn(tokens)} ${fnName(tokensObjs)} ${parens(tokens)} ${lbrace(tokens)} ${transpileRet(tokens)} ${transpileBool(tokens)} ${rbrace(tokens)}`

const code = transpilefnDefinition()

const transpileRetStmt = () => `${transpileRet(tokens)} ${transpileBool(tokens)}`

const code2 = transpileRetStmt()

console.log(specialIdentifier(tokensObjs))