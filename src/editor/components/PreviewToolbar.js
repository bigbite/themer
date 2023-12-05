import PreviewExampleButton from './PreviewExampleButton';
import ResponsiveButton from './ResponsiveButton';

/**
 * Toolbar to display options above the preview
 *
 */
const PreviewToolbar = () => {
	return (
		<div className="themer-preview__toolbar">
			<PreviewExampleButton />
			<ResponsiveButton />
		</div>
	);
};

export default PreviewToolbar;
