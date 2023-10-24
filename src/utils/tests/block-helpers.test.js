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

import { isHex } from '../block-helpers';

describe( 'isHex', () => {
	it( 'should return true when the input is a valid hex color code', () => {
		expect( isHex( '#FFF' ) ).toBe( true );
		expect( isHex( '#FFFFFF' ) ).toBe( true );
		expect( isHex( '#000' ) ).toBe( true );
		expect( isHex( '#000000' ) ).toBe( true );
		expect( isHex( '#f0f0f0' ) ).toBe( true );
		expect( isHex( '#F0F0F0' ) ).toBe( true );
	} );

	it( 'should return false when the input is not a valid hex color code', () => {
		expect( isHex( '#FF' ) ).toBe( false );
		expect( isHex( '#FFFFF' ) ).toBe( false );
		expect( isHex( '#0000' ) ).toBe( false );
		expect( isHex( '#00000' ) ).toBe( false );
		expect( isHex( '#f0f0' ) ).toBe( false );
		expect( isHex( '#F0F0' ) ).toBe( false );
		expect( isHex( '#G0G0G0' ) ).toBe( false );
		expect( isHex( 'FFF' ) ).toBe( false );
		expect( isHex( '#1234567' ) ).toBe( false );
	} );
} );
