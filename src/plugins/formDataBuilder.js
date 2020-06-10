
function formDataBuilder(dataObject) {
    let formData = new FormData(); 
    for (const key in dataObject) {
        formData.set(key, dataObject[key]);
    }
    return formData;
}

export default formDataBuilder;