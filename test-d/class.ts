import {expectAssignable, expectError, expectNotAssignable, expectType} from 'tsd';
import type {Class, Constructor, IsAny} from '../index.d.ts';

class Foo {
	constructor(x: number, y: any) {
		console.log(x, y);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	method(): void {}
}

function function_(Cls: Constructor<Foo>): Foo {
	return new Cls(1, '', 123);
}

function function2(Cls: Constructor<Foo, [number, number]>): Foo {
	expectError(new Cls(1, ''));
	return new Cls(1, 2);
}

function_(Foo);
function2(Foo);

// Prototype test
type PositionProperties = {
	top: number;
	left: number;
};

class Position {
	public top: number;

	public left: number;

	constructor(parameterTop: number, parameterLeft: number) {
		this.top = parameterTop;
		this.left = parameterLeft;
	}
}

declare const Bar: Class<PositionProperties>;

expectAssignable<Class<PositionProperties>>(Position);

expectNotAssignable<Class<PositionProperties, [number]>>(Position);

expectAssignable<Class<PositionProperties, [number, number]>>(Position);
expectAssignable<Constructor<PositionProperties, [number, number]>>(Position);

expectType<IsAny<typeof Bar['prototype']>>(false);
expectType<PositionProperties>(Position.prototype);
// /Prototype test

expectError(new Position(17));
expectAssignable<PositionProperties>(new Position(17, 34));

// Prototype test with type parameter
class Building<T = unknown> {
	owners: T;
	constructor(buildingOwners: T) {
		this.owners = buildingOwners;
	}
}

type Census = {
	count: number;
};

class House<OwnerCount extends Census = Census> extends Building<OwnerCount> {}

class CityBlock<BuildingType extends Building> {
	residence: BuildingType;

	constructor(HousingType: Class<BuildingType, [Census]>) {
		this.residence = new HousingType({count: 2});
	}
}

const Family = (new CityBlock(House)).residence.owners;
expectType<IsAny<typeof Family>>(false);
expectAssignable<number>(Family.count);
// /Prototype test with type parameter
