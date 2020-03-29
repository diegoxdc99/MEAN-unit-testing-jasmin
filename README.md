# MEAN-unit-testing-jasmin

Repositorio de practica para el curso de Unit Testing para MEAN con Jasmine

# Análisis de código estatico

```
npm install eslint --save
eslint --init
```

# Prettier

Para formatear el código

https://prettier.io/

Al instalar el plugin en VS code se debe de activar la opción de formatear al guardar en settings

# Metodos mas usados para los espias

¿Cómo se crea un espía?

```javascript
spyOn(obj, "method"); // obj.method es una función
```

¿Cómo verificar que un método fue llamado?

```javascript
const ref = spyOn(obj, "method");
expect(ref).toHaveBeenCalled();
// O directamente
expect(obj.method).toHaveBeenCalled();
```

¿Cómo verificar que un método fue llamado con un parámetro específico?

```javascript
const ref = spyOn(obj, "method");
expect(ref).toHaveBeenCalledWith("foo", "bar");
// O directamente
expect(obj.method).toHaveBeenCalledWith("foo", "bar");
```

¿Cómo puedo verificar el número exacto de ejecuciones de un método?

```javascript
expect(obj.method.callCount).toBe(2);
```

¿Cómo espiar en un método sin modificar su comportamiento?

```javascript
spyOn(obj, "method").andCallThrough();
```

¿Cómo puedo cambiar el valor retornado por un método?

```javascript
spyOn(obj, "method").andReturn("value");
```

¿Cómo puedo sobreescribir un método?

```javascript
spyOn(obj, "method").andCallFake(() => "this is a function");
```
