const aC = document.querySelector('#AC')
const MakeMinus = document.querySelector('#MakeMinus')

const percent = document.querySelector('#percent')
const divide = document.querySelector('#divide')
const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
const num4 = document.querySelector('#num4')
const num5 = document.querySelector('#num5')
const num6 = document.querySelector('#num6')
const num7 = document.querySelector('#num7')
const num8 = document.querySelector('#num8')
const num9 = document.querySelector('#num9')
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const zero = document.querySelector('#zero')
const button = document.querySelectorAll('button');
const screenNum = document.querySelector('#screenNum');
const multiply = document.querySelector('#multiply')
const equal = document.querySelector("#equal")

num1.addEventListener('click', () => { texting(1); })
num2.addEventListener('click', () => { texting(2); })
num3.addEventListener('click', () => { texting(3); })
num4.addEventListener('click', () => { texting(4); })
num5.addEventListener('click', () => { texting(5); })
num6.addEventListener('click', () => { texting(6); })
num7.addEventListener('click', () => { texting(7); })
num8.addEventListener('click', () => { texting(8); })
num9.addEventListener('click', () => { texting(9); })

function numBtnColor() {
    let backgroundColorBtn = document.querySelector('.btnBackgroundColor');
    if (backgroundColorBtn) {
        backgroundColorBtn.classList.remove('btnBackgroundColor');
    }
    this.classList.add('btnBackgroundColor');
    setTimeout(() => {
        this.classList.remove('btnBackgroundColor');
    }, 400)
}

let mathSymbolBeforeNumEnter = false;


function matheSymbolBtnColor() {
    var SymColorChangeWhenClick = document.querySelector('.SymColorChangeWhenClick');  /* querySelector 자체가 dom을 다 뒤져야 되므로 이것도 비효율적이라고 할 수 ㅇ..dom에 의존적 */
    if (SymColorChangeWhenClick) {
        SymColorChangeWhenClick.classList.remove('SymColorChangeWhenClick');
    }
    this.classList.add('SymColorChangeWhenClick');
}

function equalfunc() {
    var SymColorChangeWhenClick = document.querySelector('.SymColorChangeWhenClick');  /* querySelector 자체가 dom을 다 뒤져야 되므로 이것도 비효율적이라고 할 수 ㅇ..dom에 의존적 */
    if (SymColorChangeWhenClick) {
        SymColorChangeWhenClick.classList.remove('SymColorChangeWhenClick');
    }
    this.classList.add('SymColorChangeWhenClick');
    setTimeout(() => {
        this.classList.remove('SymColorChangeWhenClick');
    }, 400)

}

for (var i = 0; i < button.length; i++) {
    if (i === 3 || i === 7 || i === 11 || i === 15) {
        button[i].addEventListener('click', matheSymbolBtnColor);

    } else if (i === 18) {
        button[i].addEventListener('click', equalfunc);
    }
    else {
        button[i].addEventListener('click', numBtnColor);
    }
}
let numFirst = ''; // 연산기호 입력 전 숫자변수
let numSecond = '';  // 연산기호 입력 전 숫자변수
let op_input = null; //연산 기호 구분 변수
let ac = false; //c, Ac 설정 구분 변수 
let isOp = false; //연산 기호 받기 전 변수 설정인지 이후 변수 설정인지 구분해주는 bool
let numEnter = false; //완전 처음에  숫자 입력이 되어있는가? 연산 기호 시 NaN 방지를 위해 

document.querySelector('#zero').addEventListener('click', () => {
    if (!isOp) {
        if (screenNum.innerText === '0') {
            screenNum.innerText = "0"
        } else {
            numFirst += '0'
            screenNum.innerText = numFirst;
            ac = true;
        }
    } else if (isOp === true) {
        if (screenNum.innerText === '0') {
            screenNum.innerText = "0"
        } else {
            numSecond += '0'
            screenNum.innerText = numSecond;
        }
    }
})

// 계산 기호 클래스리스트 삭제 연속을 위한 리스트
const symbolList = [
    divide, minus, plus, multiply
]

function texting(numString) {
    mathSymbolBeforeNumEnter = true;
    if (mathSymbolBeforeNumEnter === true) {
        for (let math of symbolList) {
            math.classList.remove('SymColorChangeWhenClick');
        }
    }

    if (!isOp) {
        numFirst += numString
        screenNum.innerText = numFirst;
        ac = true;
        numEnter = true;
        if (ac === true) {
            aC.innerText = 'C'
        } else if (!ac) {
            aC.innerText = 'AC'
        }
    } else if (isOp === true) {
        numSecond += numString
        screenNum.innerText = numSecond;
        if (numSecond === 0) {
            ac = false;
        }
        ac = true;
    }
    if (screenNum.innerText.length > 6) {
        screenNum.style.fontSize = '20px'
        screenNum.style.margin = '0 10px 10px 0';
    } else {
        screenNum.style.fontSize = '55px;'
        screenNum.style.margin = '0 10px 0 0';
    }
}
function claculation(symbol) {
    if (numEnter) {
        numFirst = parseFloat(numFirst)
        screenNum.innerText = numFirst;
        isOp = true;
        return op_input = symbol
    }
    if (!numEnter) {
        screenNum.innerText = 0;
    }

}



divide.addEventListener('click', () => {
    claculation('divide');
})
multiply.addEventListener('click', () => {
    claculation('multiply');
})
plus.addEventListener('click', () => {
    claculation('plus');
})
minus.addEventListener('click', () => {
    claculation('minus');
})

let decimal = false;

function calcResult(symbol) {
    let result = 0;
    if (symbol === 'multiply') {
        numFirst = parseFloat(numFirst);
        numSecond = parseFloat(numSecond);
        result = numFirst * numSecond
        screenNum.innerText = result
        isOp = true
        // return numFirst = result
    }
    else if (symbol === 'plus') {
        numFirst = parseFloat(numFirst);
        numSecond = parseFloat(numSecond);
        result = numFirst + numSecond;
        isOp = true;
        if (decimal === true) {
            result = Math.round((numFirst + numSecond) * 10) / 10;
            screenNum.innerText = result;
        } else if (decimal === false) {
            result = numFirst + numSecond;
            screenNum.innerText = result;
        }
        // return parseFloat(numFirst) = result
    }
    if (symbol === 'minus') {
        numFirst = parseFloat(numFirst);
        numSecond = parseFloat(numSecond);
        result = numFirst - numSecond
        screenNum.innerText = result
        isOp = true
        // return numFirst = result
    }
    if (symbol === 'divide') {
        numFirst = parseFloat(numFirst);
        numSecond = parseFloat(numSecond);
        result = numFirst / numSecond
        screenNum.innerText = result
        isOp = true
        return numFirst = result
    }
}
equal.addEventListener('click', () => {
    if (isOp) {
        calcResult(op_input)
        if (screenNum.innerText.length > 6) {
            screenNum.style.fontSize = '20px'
            screenNum.style.margin = '0 20px 10px 0';
        }
    }
})

aC.addEventListener('click', (mathSybols) => {
    for (let sym of symbolList) {
        sym.classList.remove('SymColorChangeWhenClick')
    }
    if (ac) {
        numFirst = '';
        screenNum.innerText = 0;
        numSecond = '';
        screenNum.innerText = 0;
        isOp = false;
        ac = false;
        numEnter = false;
    }
    if (!ac) {
        aC.innerText = 'AC'
    }
    if (screenNum.innerText.length < 6) {
        screenNum.style.fontSize = '55px';
        screenNum.style.margin = '0 10px 0 0';
    }
})


// function makingMinus(number) {
//     number = parseFloat(number) * -1
//     number = number.toString()
//     screenNum.innerText = number
// }

MakeMinus.addEventListener('click', () => {
    if (isOp === false) {
        numFirst = parseFloat(numFirst) * -1
        numFirst = numFirst.toString()
        screenNum.innerText = numFirst
        if (!numEnter) {
            numFirst = 0
            screenNum.innerText = 0;
        }
    } else if (isOp === true) {
        numSecond = parseFloat(numSecond) * -1
        numSecond = numSecond.toString()
        screenNum.innerText = numSecond
    }
})

percent.addEventListener('click', () => {
    decimal = true;
    if (isOp === false) {
        numFirst = parseFloat(numFirst) * 1 / 100
        numFirst = numFirst.toString()
        screenNum.innerText = numFirst
        if (!numEnter) {
            numFirst = ''
            screenNum.innerText = 0;
        }
        if (screenNum.innerText.length > 6) {
            screenNum.style.fontSize = '20px'
            screenNum.style.margin = '0 20px 10px 0';
        }
        numEnter = true;
    } else if (isOp === true) {
        numSecond = parseFloat(numSecond) * 1 / 100
        numSecond = numSecond.toString()
        screenNum.innerText = numSecond
    }
})