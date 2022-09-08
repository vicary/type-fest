import { expectError, expectType } from 'tsd';
import type { Stringified } from '../index.d.ts';

declare const stringified: Stringified<{a: number; b: string}>;
expectType<{a: string; b: string}>(stringified);

type Car = {
	model: string;
	speed: number;
};
expectError<Stringified<Car>>({model: 'Foo', speed: 101});
expectType<Stringified<Car>>({model: 'Foo', speed: '101'});
