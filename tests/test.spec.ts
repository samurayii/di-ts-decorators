import { expect } from "chai";
import { Singleton, Factory, Inject } from "../src/index";

describe("DI", function () {

    describe("Singleton", function () {

        it("text", function() {

            const config = "hello";

            Singleton("config", config);

            const test1 = Inject("config");
            const test2 = Inject("config");

            expect(test1).to.equal(config);
            expect(test2).to.equal(config);

        });

        it("class", function() {

            class SingletonClass1 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            Singleton(SingletonClass1);

            const test1 = <SingletonClass1>Inject(SingletonClass1);
            const test2 = <SingletonClass1>Inject(SingletonClass1);

            expect(test1 instanceof SingletonClass1).to.equal(true);
            expect(test2 instanceof SingletonClass1).to.equal(true);
            expect(test1.id).to.equal(test2.id);

        });

        it("class (Decorator)", function() {

            @Singleton()
            class SingletonClass2 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            const test1 = <SingletonClass2>Inject(SingletonClass2);
            const test2 = <SingletonClass2>Inject(SingletonClass2);

            expect(test1 instanceof SingletonClass2).to.equal(true);
            expect(test2 instanceof SingletonClass2).to.equal(true);
            expect(test1.id).to.equal(test2.id);

        });

        it("class (Decorator with name)", function() {

            @Singleton("singleton3")
            class SingletonClass3 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            const test1 = <SingletonClass3>Inject("singleton3");
            const test2 = <SingletonClass3>Inject("singleton3");

            expect(test1 instanceof SingletonClass3).to.equal(true);
            expect(test2 instanceof SingletonClass3).to.equal(true);
            expect(test1.id).to.equal(test2.id);

        });

        it("class named", function() {

            class SingletonClass4 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            Singleton("singleton4", SingletonClass4);

            const test1 = <SingletonClass4>Inject("singleton4");
            const test2 = <SingletonClass4>Inject("singleton4");

            expect(test1 instanceof SingletonClass4).to.equal(true);
            expect(test2 instanceof SingletonClass4).to.equal(true);
            expect(test1.id).to.equal(test2.id);

        });

    });

    describe("Factory", function () {

        it("class", function() {

            class FactoryClass1 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            Factory(FactoryClass1);

            const test1 = <FactoryClass1>Inject(FactoryClass1);
            const test2 = <FactoryClass1>Inject(FactoryClass1);

            expect(test1 instanceof FactoryClass1).to.equal(true);
            expect(test2 instanceof FactoryClass1).to.equal(true);
            expect(test1.id).to.not.equal(test2.id);

        });

        it("class (Decorator)", function() {

            @Factory()
            class FactoryClass2 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            const test1 = <FactoryClass2>Inject(FactoryClass2);
            const test2 = <FactoryClass2>Inject(FactoryClass2);

            expect(test1 instanceof FactoryClass2).to.equal(true);
            expect(test2 instanceof FactoryClass2).to.equal(true);
            expect(test1.id).to.not.equal(test2.id);

        });

        it("class (Decorator with name)", function() {

            @Factory("factory3")
            class FactoryClass3 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            const test1 = <FactoryClass3>Inject("factory3");
            const test2 = <FactoryClass3>Inject("factory3");

            expect(test1 instanceof FactoryClass3).to.equal(true);
            expect(test2 instanceof FactoryClass3).to.equal(true);
            expect(test1.id).to.not.equal(test2.id);

        });

        it("class named", function() {

            class FactoryClass4 {
                private readonly _id: number
                constructor () {
                    this._id = Math.random();
                }
                get id () {
                    return this._id;
                }
            }

            Factory("factory4", FactoryClass4);

            const test1 = <FactoryClass4>Inject("factory4");
            const test2 = <FactoryClass4>Inject("factory4");

            expect(test1 instanceof FactoryClass4).to.equal(true);
            expect(test2 instanceof FactoryClass4).to.equal(true);
            expect(test1.id).to.not.equal(test2.id);

        });

    });

});