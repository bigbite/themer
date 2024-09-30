import PreviewModeSelector from './PreviewModeSelector';
import ResponsiveButton from './ResponsiveButton';

/**
 * Toolbar to display options above the preview
 *
 */
const PreviewToolbar = () => {
	return (
		<div className="themer-preview__toolbar">
			<PreviewModeSelector />
			<ResponsiveButton />
		</div>
	);
};

export default PreviewToolbar;
