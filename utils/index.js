export const findByClassName = (component, classname) => {
    return component.find(`.${classname}`);
}

export const findByTag = (component, tagName) => {
    return component.find(`${tagName}`);
}