import { View } from './View';
export class Department extends View {
  constructor(params) {
    super(params);
    this.setTitle('Department');
  }
  getHtml() {
    return '<h1>Department</h1>';
  }
}
