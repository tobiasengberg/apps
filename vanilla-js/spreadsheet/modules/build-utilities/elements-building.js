export const getElement = (element) => {
    let newElement = document.createElement(element.type);
    if(element.id) newElement.setAttribute("id", element.id);
    if(element.class) newElement.classList.add(element.class);
    if(element.text) newElement.innerText = element.text;
    return newElement;
}