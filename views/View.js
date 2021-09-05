export class View {
  constructor(params) {
    super(params);
  }
  setTitle(title) {
    document.title = title;
  }

  getHtml() {
    return '';
  }
}
