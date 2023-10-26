/**
 * Tests for all the functions in the block-helpers.js file.
 */

jest.mock( '@wordpress/block-editor', () => {
	return {
		getColorObjectByAttributeValues: jest.fn(),
		getColorObjectByColorValue: jest.fn(),
	};
} );

jest.mock( '@wordpress/data', () => {
	return {
		select: jest.fn(),
	};
} );

import {
	isHex,
	varToDuotone,
	duotoneToVar,
	isCssLengthUnit,
} from '../block-helpers';
import { mockDuotoneOptions } from './mocks';

describe( 'isHex', () => {
	const validHexValues = [
		'#FFF',
		'#FFFFFF',
		'#000',
		'#000000',
		'#f0f0f0',
		'#F0F0F0',
	];
	const invalidHexValues = [
		'#FF',
		'#FFFFF',
		'#0000',
		'#00000',
		'#f0f0',
		'#F0F0',
		'#G0G0G0',
		'FFF',
		'#1234567',
	];

	it.each( validHexValues )(
		'%p should return true as it is a valid hex code',
		( value ) => {
			expect( isHex( value ) ).toBe( true );
		}
	);
	it.each( invalidHexValues )(
		'%p should return false as it is an invalid hex code',
		( value ) => {
			expect( isHex( value ) ).toBe( false );
		}
	);
} );

describe( 'varToDuotone', () => {
	it( 'should return the correct duotone option when the input is a valid css variable', () => {
		expect(
			varToDuotone(
				'var(--wp--preset--duotone--midnight)',
				mockDuotoneOptions
			)
		).toStrictEqual( [ '#000000', '#00a5ff' ] );
	} );
	it( 'should return the correct duotone option when the input is a valid css variable with different casing', () => {
		expect(
			varToDuotone(
				'var(--wp--preset--duotone--Midnight)',
				mockDuotoneOptions
			)
		).toStrictEqual( [ '#000000', '#00a5ff' ] );
	} );
	it( "should fall back to the first duotone option when the input is a string that doesn't have a corresponding duotone option", () => {
		expect(
			varToDuotone(
				'var(--wp--preset--duotone--custom-color)',
				mockDuotoneOptions
			)
		).toStrictEqual( [ '#000000', '#7f7f7f' ] );
	} );
	it( 'should fall back to the first duotone option when the input is not a string', () => {
		expect( varToDuotone( {}, mockDuotoneOptions ) ).toStrictEqual( [
			'#000000',
			'#7f7f7f',
		] );
	} );
	it( 'should fall back to the first duotone option when the input is falsy', () => {
		expect( varToDuotone( false, mockDuotoneOptions ) ).toStrictEqual( [
			'#000000',
			'#7f7f7f',
		] );
	} );
} );

describe( 'duotoneToVar', () => {
	it( 'should return the corresponding css variable when the input is a valid duotone color array', () => {
		expect(
			duotoneToVar( [ '#000000', '#7f7f7f' ], mockDuotoneOptions )
		).toBe( 'var(--wp--preset--duotone--dark-grayscale)' );
	} );
	it( 'should return the original input when the input array contains valid colors in the wrong order', () => {
		expect(
			duotoneToVar( [ '#7f7f7f', '#000000' ], mockDuotoneOptions )
		).toStrictEqual( [ '#7f7f7f', '#000000' ] );
	} );
	it( 'should return the original input when the input array only has one value', () => {
		expect(
			duotoneToVar( [ '#000000' ], mockDuotoneOptions )
		).toStrictEqual( [ '#000000' ] );
	} );
	it( 'should return the original input when the input is a valid array but does not have a corresponding duotone option value', () => {
		expect(
			duotoneToVar( [ '#4A6F92', '#D372A9' ], mockDuotoneOptions )
		).toStrictEqual( [ '#4A6F92', '#D372A9' ] );
	} );
	it( 'should return the original input when the input array contains just one of the colors of a valid duotone option', () => {
		expect(
			duotoneToVar( [ '#000000', '#000000' ], mockDuotoneOptions )
		).toStrictEqual( [ '#000000', '#000000' ] );
	} );
} );

describe( 'isCssLengthUnit', () => {
	const validCssLengthValues = [ '0px', '0.5rem', '0', '5%', '-5em' ];
	const invalidCssLengthValues = [ 'hi', '', 'px' ];
	it.each( validCssLengthValues )(
		'%p should return true as it is a valid css length value',
		( value ) => {
			expect( isCssLengthUnit( value ) ).toBe( true );
		}
	);
	it.each( invalidCssLengthValues )(
		'%p should return false as it is an invalid css length value',
		( value ) => {
			expect( isCssLengthUnit( value ) ).toBe( false );
		}
	);
} );
