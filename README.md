## Simple dependency injection

install: `npm install di-ts-decorators`

### Example

Singleton:
```js
import { Singleton, Catalog } from "di-ts-decorators";

class SingletonClassFN1 {}
class SingletonClassFN2 {}

Singleton(SingletonClassFN1.name, new SingletonClassFN1());
Singleton(SingletonClassFN1.name, new SingletonClassFN1(), "scope1");
Singleton(SingletonClassFN2.name, SingletonClassFN2);

@Singleton()
@Singleton("scope1")
class SingletonClassDE1 {}
@Singleton()
class SingletonClassDE2 {}

class B {
    constructor (
        private readonly _singleton1 = Catalog(SingletonClassFN1.name)
        private readonly _singleton2 = Catalog(SingletonClassFN2.name)
        private readonly _singleton3 = Catalog(SingletonClassDE1.name)
        private readonly _singleton4 = Catalog(SingletonClassDE2.name)
        private readonly _singleton5 = Catalog(SingletonClassFN1.name, "scope1")
        private readonly _singleton6 = Catalog(SingletonClassDE1.name, "scope1")
    ) {}
}

const b = new B();
```

Factory:
```js
import { Factory, Catalog } from "di-ts-decorators";

class FactoryClassFN1 {}
class FactoryClassFN2 {}

Factory(FactoryClassFN1.name, new FactoryClassFN1());
Factory(FactoryClassFN1.name, new FactoryClassFN1(), "scope1");
Factory(FactoryClassFN2.name, FactoryClassFN2);

@Factory()
@Factory("scope1")Factory
class FactoryClassDE1 {}
@Factory()
class FactoryClassDE2 {}

class B {
    constructor (
        private readonly _factory1 = Catalog(FactoryClassFN1.name)
        private readonly _factory2 = Catalog(FactoryClassFN2.name)
        private readonly _factory3 = Catalog(FactoryClassDE1.name)
        private readonly _factory4 = Catalog(FactoryClassDE2.name)
        private readonly _factory5 = Catalog(FactoryClassFN1.name, "scope1")
        private readonly _factory6 = Catalog(FactoryClassDE1.name, "scope1")
    ) {}
}

const b = new B();
```

Value:
```js
import { Value, Catalog } from "di-ts-decorators";

Value("message", "hello");
Value("message", "hello", "scope1");

class B {
    constructor (
        private readonly _value1 = Catalog("message")
        private readonly _value5 = Catalog("message", "scope1")
    ) {}
}

const b = new B();
```