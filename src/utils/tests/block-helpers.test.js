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

import { isHex, varToDuotone, duotoneToVar } from '../block-helpers';
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
} );
