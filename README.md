# MEAN-unit-testing-jasmin
Repositorio de practica para el curso de Unit Testing para MEAN con Jasmine

# Instalar jasmin
```
npm install --save-dev jasmine
node node_modules/jasmine/bin/jasmine init
```

# Eslint y jasmin
Para que es lint no genere alertas instalar el plugin

```
https://www.npmjs.com/package/eslint-plugin-jasmine
```
y en el archivo .eslintrc.js poner:
```json
env: {
    jasmine: true
}
```

# Snippet de pruebas

```javascript
expect(false).not.toBe(true); // Prueba negativa
comparación con ===, ejemplo: 1 === 1 1 !== '1'

expect(thing).toBe(realThing);
El valor no es undefined

expect(result).toBeDefined();
El valor actual es falso, ejemplo:0, '', false

expect(result).toBeFalsy();
El valor actual es verdadero, ejemplo: 'sd', 1, true

expect(thing).toBeTruthy();
El valor actual es mayor al esperado

expect(result).toBeGreaterThan(3);
El valor actual es mayor o igual al esperado

expect(result).toBeGreaterThanOrEqual(25);
El valor actual es menor al esperado

expect(result).toBeLessThan(0);
El valor actual es menor o igual al esperado

expect(result).toBeLessThanOrEqual(123);
El valor actual es NaN

expect(thing).toBeNaN();
El valor actual es -Infinity

expect(thing).toBeNegativeInfinity();
El valor actual es Infinity

expect(thing).toBePositiveInfinity();
El valor actual es null

expect(result).toBeNull();
El valor actual continue una cadena. Ejemplo:

 'Hola mundo'.toContain('Hola') // true
['Hola', 'mundo'].toContain('Hola') // true
expect(array).toContain(anElement); expect(string).toContain(substring);
El valor actual es igual utilizando una comparación profunda

expect(bigObject).toEqual({"foo": ['bar', 'baz']});
El espía fue llamado

expect(mySpy).toHaveBeenCalled(); expect(mySpy).not.toHaveBeenCalled();
El espía fue llamado antes que otro

expect(mySpy).toHaveBeenCalledBefore(otherSpy);
El espía fue llamado n veces:

expect(mySpy).toHaveBeenCalledTimes(3);
El espía fue llamado con los siguientes parámetros

expect(mySpy).toHaveBeenCalledWith('foo', 'bar', 2);
Verificar si un elemento tiene una clase

const el = document.createElement('div');
el.className = 'foo bar baz';
expect(el).toHaveClass('bar');
El valor actual comparado con una expresión regular

expect("my string").toMatch(/string$/);
expect("other string").toMatch("her");
Ciclos de vida
describe("Component", () => {
  // Shared variables
  var foo = 0;
beforeAll(() => {})
  beforeEach(() => {})
  afterEach(() => {})
  afterAll(() => {})
});
Deshabilitando pruebas
xdescribe("A spec", () => {
  it("waiting to be enable", function() {
    expect(true).toEqual(true);
  });
});
describe("A spec", () => {
  it("this run", () => {
    expect(true).toEqual(true);
  });
  xit("this is skipped", () => {
    expect(true).toEqual(true);
  });
});
Utilizando spyOn
describe('A spy', () => {
  let foo,
    bar = null;
  beforeEach(() => {
    foo = {
      setBar: value => {
        bar = value;
      },
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });
  it('tracks that the spy was called', () => {
    expect(foo.setBar).toHaveBeenCalled();
  });
  it('tracks that the spy was called x times', () => {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });
  it('tracks all the arguments of its calls', () => {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });
});
Crear espía cuando desconocemos si la función existe
describe("Create a 'bare' spy", () => {
  let notSure;
  beforeEach(function() {
    notSure = jasmine.createSpy('notSure');
    notSure("I", "am", "a", "spy");
  });
  it("tracks that the spy was called", function() {
    expect(notSure).toHaveBeenCalled();
  });
});
Creando multiples espías en un mismo objeto
describe("Multiple spies", () => {
  const tape;
  beforeEach(() => {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop']);
    tape.play();
      tape.pause();
      tape.rewind(0);
    });
  it("creates spies for each requested function", () => {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
  });
});
Verificar una propiedad de un objeto
describe("jasmine.objectContaining", () => {
  let foo;
  beforeEach(() => {
    foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };
  });
  it("matches objects with the expect key/value pairs", () => {
    expect(foo).toEqual(jasmine.objectContaining({
      bar: "baz"
    }));
    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }));
  });
});
Verificar una propiedad dentro de un objeto pasado como parámetro a una función
describe('jasmine.objectContaining', () => {
  it('is useful for comparing arguments', () => {
    const callback = jasmine.createSpy('callback');
    callback({
      bar: 'baz',
    });
    expect(callback).toHaveBeenCalledWith(
      jasmine.objectContaining({
        bar: 'baz',
      })
    );
  });
});
Verificar un valor dentro de un arreglo
describe("jasmine.arrayContaining", () => {
  let foo;
  beforeEach(function() {
    foo = [1, 2, 3, 4];
  });
  it("matches arrays with some of the values", () => {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  });
});
Verificar un valor dentro de un arreglo pasado como parámetro a una función
describe('jasmine.arrayContaining', () => {
  it('is useful when comparing arguments', () => {
    const callback = jasmine.createSpy('callback');
    callback([1, 2, 3, 4]);
   expect(callback)
     .toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
   expect(callback)
     .not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
  });
});
Usando regex para comparar comparar cadenas de texto
describe('jasmine.stringMatching', () => {
  it("matches as a regexp", () => {
    expect({foo: 'bar'})
      .toEqual({foo: jasmine.stringMatching(/^bar$/)});
    expect({foo: 'foobarbaz'})
      .toEqual({foo: jasmine.stringMatching('bar')});
  });
   describe("when used with a spy", () => {
    it("comparing arguments", () => {
      const callback = jasmine.createSpy('callback');
      callback('foobarbaz');
      expect(callback)
        .toHaveBeenCalledWith(jasmine.stringMatching('bar'));
      expect(callback)
        .not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
    });
  });
});
```