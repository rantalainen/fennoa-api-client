import FormData from 'form-data';

export class Helpers {
  /** Converts JS Object to Form Data. Source: https://stackoverflow.com/a/49376875 */
  public static convertJsToFormData(model: any, form?: FormData, namespace?: string): FormData {
    let formData = form || new FormData();

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || (!model[propertyName] && model[propertyName] !== 0 && model[propertyName] !== '')) {
        continue;
      }

      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

      if (model[propertyName] instanceof Date) {
        formData.append(formKey, model[propertyName].toISOString());
      } else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: any) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.convertJsToFormData(element, formData, tempFormKey);
        });
      } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
        this.convertJsToFormData(model[propertyName], formData, formKey);
      } else {
        formData.append(formKey, model[propertyName].toString());
      }
    }

    return formData;
  }
}
