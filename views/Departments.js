import { View } from './View';
export class Departments extends View {
  constructor(params) {
    super(params);
    this.setTitle('Dashboard');
  }
  getHtml() {
    return '<h1>Dashboard</h1>';
  }
}
