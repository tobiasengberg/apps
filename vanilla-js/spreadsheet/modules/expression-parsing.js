export const parseExpression = (expression) => {
    if(/^[0-9]*$/.test(expression)) return [expression, "number"];
    if(expression.substring(0,4) == "SUM(") {
        let values = expression.substring(4,expression.length -1).split(':');
        let col = /^[A-Z]+/.exec(values[0]);
        return [col, "sum"];
    }
    return [expression, "text"];
}
