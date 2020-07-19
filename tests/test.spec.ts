import { expect } from "chai";
import { Singleton, Catalog, Factory, Value } from "../src/index";

describe("DI", function () {

    describe("Value", function () {

        it("Value default scope", function() {

            const config = "hello";

            Value("config", config);

            const test1 = Catalog("config");
            const test2 = Catalog("config");

            expect(test1).to.equal(config);
            expect(test2).to.equal(config);

        });

        it("Value default/test scope", function() {

            const config2 = "hello";

            Value("config2", config2);
            Value("config2", config2, "test");

            const test1 = Catalog("config2");
            const test2 = Catalog("config2", "test");

            expect(test1).to.equal(config2);
            expect(test2).to.equal(config2);

        });

    });

    describe("Function", function () {

        it("Singleton default scope", function() {

            class SingletonTestClass1 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            Singleton(SingletonTestClass1.name, new SingletonTestClass1);

            const test_class1: SingletonTestClass1 = <SingletonTestClass1>Catalog(SingletonTestClass1.name);
            const test_class2: SingletonTestClass1 = <SingletonTestClass1>Catalog(SingletonTestClass1.name);

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(2);

        });

        it("Singleton default/test scope", function() {

            class SingletonTestClass2 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            Singleton(SingletonTestClass2.name, new SingletonTestClass2());
            Singleton(SingletonTestClass2.name, SingletonTestClass2, "test");

            const test_class1: SingletonTestClass2 = <SingletonTestClass2>Catalog(SingletonTestClass2.name);
            const test_class2: SingletonTestClass2 = <SingletonTestClass2>Catalog(SingletonTestClass2.name, "test");

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);

        });

        it("Factory default scope", function() {

            class FactoryTestClass1 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            Factory(FactoryTestClass1.name, FactoryTestClass1);

            const test_class1: FactoryTestClass1 = <FactoryTestClass1>Catalog(FactoryTestClass1.name);
            const test_class2: FactoryTestClass1 = <FactoryTestClass1>Catalog(FactoryTestClass1.name);

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);

        });

        it("Factory default/test scope", function() {

            class FactoryTestClass2 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            Factory(FactoryTestClass2.name, FactoryTestClass2);
            Factory(FactoryTestClass2.name, FactoryTestClass2, "test");

            const test_class1: FactoryTestClass2 = <FactoryTestClass2>Catalog(FactoryTestClass2.name);
            const test_class2: FactoryTestClass2 = <FactoryTestClass2>Catalog(FactoryTestClass2.name, "test");

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);

        });

    });

    describe("Decorators", function () {

        it("Singleton default scope", function() {

            @Singleton()
            class SingletonTest2Class1 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            const test_class1: SingletonTest2Class1 = <SingletonTest2Class1>Catalog(SingletonTest2Class1.name);
            const test_class2: SingletonTest2Class1 = <SingletonTest2Class1>Catalog(SingletonTest2Class1.name);

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(2);

        });

        it("Singleton default/test scope", function() {

            @Singleton()
            @Singleton("test")
            class SingletonTest2Class2 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            const test_class1: SingletonTest2Class2 = <SingletonTest2Class2>Catalog(SingletonTest2Class2.name);
            const test_class2: SingletonTest2Class2 = <SingletonTest2Class2>Catalog(SingletonTest2Class2.name, "test");

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);

        });

        it("Factory default scope", function() {

            @Factory()
            class FactoryTest2Class1 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            const test_class1: FactoryTest2Class1 = <FactoryTest2Class1>Catalog(FactoryTest2Class1.name);
            const test_class2: FactoryTest2Class1 = <FactoryTest2Class1>Catalog(FactoryTest2Class1.name);

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);

        });

        it("Factory default/test scope", function() {

            @Factory()
            @Factory("test")
            class FactoryTest2Class2 {
                private _num: number
                constructor () {
                    this._num = 0;
                }
                hello (): number {
                    this._num++;
                    return this._num;
                }
            }

            const test_class1: FactoryTest2Class2 = <FactoryTest2Class2>Catalog(FactoryTest2Class2.name);
            const test_class2: FactoryTest2Class2 = <FactoryTest2Class2>Catalog(FactoryTest2Class2.name, "test");
            const test_class3: FactoryTest2Class2 = <FactoryTest2Class2>Catalog(FactoryTest2Class2.name);
            const test_class4: FactoryTest2Class2 = <FactoryTest2Class2>Catalog(FactoryTest2Class2.name, "test");

            expect(test_class1.hello()).to.equal(1);
            expect(test_class2.hello()).to.equal(1);
            expect(test_class3.hello()).to.equal(1);
            expect(test_class4.hello()).to.equal(1);

        });

    });

});