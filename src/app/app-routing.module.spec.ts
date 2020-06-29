import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

describe('App Routing', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });
  beforeEach(() => {
    console.log('beforeEach');
  });
  afterAll(() => {
    console.log('afterAll');
  });
  afterEach(() => {
    console.log('afterEach');
  });
  it('should have app as path', () => {
    console.log('test 1');
    expect(routes[0].path).toBe('app');
  });

  it('Shloud match the childrens', () => {
    console.log('test 2');
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent
    });
  });
});
