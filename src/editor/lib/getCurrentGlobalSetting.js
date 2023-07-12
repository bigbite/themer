export default function getCurrentGlobalSetting( path, base ) {
	const pathArr = path.split( '.' );
	return pathArr.reduce( ( o, i ) => o[ i ], base );
}
