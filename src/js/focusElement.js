const focusElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.focus();
    }
    return element;
}

export default focusElement;