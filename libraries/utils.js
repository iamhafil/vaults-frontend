export const itemNameTrim = (name) => {
    let itemName = 
        name?.length >= 20 ?
        name?.length > 40 ? <span style={{whiteSpace: 'pre'}}>{name?.substring(0, 20) + "\n" + name?.substring(20, 37).concat("...")}</span> :
        name?.length > 21 ? <span style={{whiteSpace: 'pre'}}>{name?.substring(0, 20) + "\n" + name?.substring(20, 40)}</span> : name : name
    return itemName;
  }