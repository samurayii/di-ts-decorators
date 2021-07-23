## Simple dependency injection

install: `npm install di-ts-decorators`

### Example

Singleton:

```js
import { Singleton, Inject } from "di-ts-decorators";

class SingletonClassFN1 {}
class SingletonClassFN2 {}

Singleton("config", {key: "value"});
Singleton(SingletonClassFN1);
Singleton("FN2", SingletonClassFN2);

@Singleton()
class SingletonClassDE1 {}
@Singleton("DE2")
class SingletonClassDE2 {}


class B {
    constructor (
        private readonly _config = Inject("config"),
        private readonly _SingletonClassFN1 = Inject(SingletonClassFN1),
        private readonly _SingletonClassFN2 = Inject("FN2"),
        private readonly _SingletonClassDE1 = Inject(SingletonClassDE1),
        private readonly _SingletonClassDE2 = Inject("DE2")
    ) {}
}

const b = new B();
```

Factory:

```js
import { Factory, Catalog } from "di-ts-decorators";

class FactoryClassFN1 {}
class FactoryClassFN2 {}

Factory(FactoryClassFN1);
Factory("FN2", FactoryClassFN2);

@Factory()
class FactoryClassDE1 {}
@Factory("DE2")
class FactoryClassDE2 {}

class B {
    constructor (
        private readonly _FactoryClassFN1 = Catalog(FactoryClassFN1)
        private readonly _FactoryClassFN2 = Catalog("FN2")
        private readonly _FactoryClassDE1 = Catalog(FactoryClassDE1)
        private readonly _FactoryClassDE2 = Catalog("DE2")
    ) {}
}

const b = new B();
```
