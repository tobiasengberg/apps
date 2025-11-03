export const parseExpression = (expression) => {
    if(/^[0-9]*$/.test(expression)) return [expression, "number"];
    if(expression.substring(0,1) === "=") return calculateSum(expression.substring(1,expression.length));
    if(expression.substring(0,4) === "SUM(") {
        let values = expression.substring(4,expression.length -1).split(':');
        let col = /^[A-Z]+/.exec(values[0]);
        return [col, "sum"];
    }
    return [expression, "text"];
}

const calculateSum = (formula) => {
    let result = 0;
    formula.split("+").map((item) => { result += parseInt(item)})
    return [result, "number"]
}