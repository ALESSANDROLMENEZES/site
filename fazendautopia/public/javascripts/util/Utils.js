
class Utils {
  static exibirFormulario(element, classe, reset = false) {
    let item = document.querySelector(element);
    item.classList.remove(classe);
    if (reset) {
      item.querySelector('form').reset();
      item.querySelector('img').src = './../images/images/SemImagem-300x300px.png';
    }
  }
  static ocultarFormulario(element, classe, reset = false) {
    let item = document.querySelector(element);
    item.classList.add(classe);
    if (reset) {
      item.querySelector('form').reset();
      item.querySelector('img').src = './../images/images/SemImagem-300x300px.png';
    }
  }
  static alterarBooleanPorStatusString(numero) {
    if (numero == 1 || numero == true) {
      return 'Ativo';
    } else {
      return 'Bloqueado';
    }
  }

  static uploadImg() {
    document.querySelector("input[type='file']").click();
  }
}
